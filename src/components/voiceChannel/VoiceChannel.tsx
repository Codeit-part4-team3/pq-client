import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import OtherVideo from './OtherVideo';
import { useParams } from 'react-router-dom';

// 나의 RTCPeerConnection 생성 시의 세팅
const pc_config = {
  iceServers: [
    {
      urls: ['stun:stun.l.google.com:19302'],
    },
  ],
};

const SOCKET_SERVER_URL = 'https://api.pqsoft.net:8080';

export default function VoiceChannel() {
  const { id: roomName } = useParams();
  console.log(roomName);

  const myStreamRef = useRef<MediaStream | null>(null);
  const myVideoRef = useRef<HTMLVideoElement | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[] | null>(null);
  const senderPC = useRef<RTCPeerConnection | null>(null);
  const receiverPCs = useRef<{ [id: string]: RTCPeerConnection }>({});
  const socketRef = useRef<Socket | null>(null);

  const getMyMediaStream = async () => {
    try {
      myStreamRef.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      if (myStreamRef.current && myVideoRef.current) {
        myVideoRef.current.srcObject = myStreamRef.current;
      }

      // create RTCPeerConnection
      senderPC.current = new RTCPeerConnection(pc_config);

      // 나의 미디어 스트림을 RTCPeerConnection에 추가
      if (myStreamRef.current && senderPC.current) {
        myStreamRef.current.getTracks().forEach((track) => {
          if (myStreamRef.current) senderPC.current?.addTrack(track, myStreamRef.current);
        });
      }

      // onicecandidate 이벤트 핸들러 등록
      senderPC.current.onicecandidate = (e) => {
        if (e.candidate) {
          socketRef.current?.emit('ice_candidate_sender', e.candidate);
        }
      };

      // offer 생성
      const offer = await senderPC.current.createOffer();
      console.log('create offer : ', offer);
      await senderPC.current.setLocalDescription(offer);
      socketRef.current?.emit('offer', offer, roomName);
      console.log('send offer', offer);
    } catch (error) {
      console.error('my media : ', error);
    }
  };

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);

    socketRef.current.on('connect', () => {
      socketRef.current?.emit('join_voice_channel', roomName);
      console.log(socketRef.current);
    });

    socketRef.current.on('answer', async (answer) => {
      console.log('receive answer : ', answer);
      if (senderPC.current) {
        await senderPC.current.setRemoteDescription(new RTCSessionDescription(answer));
      }
    });

    socketRef.current.on('ice_candidate_sender', async (candidate) => {
      if (senderPC.current) {
        await senderPC.current.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    socketRef.current.on('ice_candidate_receiver', async (candidate, senderId) => {
      const receiverPC = receiverPCs.current[senderId];
      if (receiverPC) {
        await receiverPC.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    socketRef.current.on('receiver_offer', async (offer, senderId, roomName) => {
      try {
        const receiverPC = new RTCPeerConnection(pc_config);
        receiverPC.onicecandidate = (e) => {
          if (e.candidate) {
            socketRef.current?.emit('ice_candidate_receiver', e.candidate, senderId);
          }
        };

        receiverPC.oniceconnectionstatechange = () => {
          console.log('ICE connection state change:', receiverPC.iceConnectionState);
        };

        receiverPC.ontrack = (e) => {
          console.log('ontrack : ', e.streams[0]);
          setRemoteStreams((prevStreams) => {
            if (prevStreams) {
              return [...prevStreams, e.streams[0]];
            } else {
              return [e.streams[0]];
            }
          });
        };

        await receiverPC.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await receiverPC.createAnswer();
        await receiverPC.setLocalDescription(new RTCSessionDescription(answer));
        socketRef.current?.emit('receiver_answer', answer, senderId, roomName);

        receiverPCs.current[senderId] = receiverPC;
      } catch (error) {
        console.error('Error handling receiver offer:', error);
      }
    });

    getMyMediaStream();
  }, []);

  useEffect(() => {
    console.log('remoteStreams : ', remoteStreams);
  }, [remoteStreams]);

  return (
    <>
      <video ref={myVideoRef} autoPlay playsInline muted width={200} height={200}></video>
      {remoteStreams?.map((stream, index) => <OtherVideo key={index} stream={stream} />)}
      <button onClick={() => console.log(myStreamRef)}>remoteStreams</button>
      <button onClick={() => console.log(myVideoRef)}>myVideoRef</button>
    </>
  );
}
