import styled from 'styled-components';

import MyMediaControlPanel from './_components/MyMediaControlPanel';
import Video from './_components/Video';
import ChannelHeader from 'src/components/channel/ChannelHeader';
import { useCallback, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
// import { useParams } from 'react-router-dom';

const SOCKET_SERVER_URL = 'http://localhost:3000';

const pc_config = {
  iceServers: [
    {
      urls: ['stun:stun.l.google.com:19302'],
    },
    // {
    //   urls: ['turn:54.180.127.213:3478'],
    //   username: 'codeit', // 사용자 이름(username) 설정
    //   credential: 'sprint101!', // 비밀번호(password) 설정
    // },
  ],
};

/**@ToDo 매일 시간내서 RTC 고치기 */
export default function VoiceChannel() {
  // const { channelId: roomName } = useParams();
  const roomName = 'voiceTestRoom';
  const userId = '1';

  // socket
  const socketRef = useRef<Socket | null>(null);
  const pcsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const [users, setUsers] = useState<
    {
      socketId: string;
      userId: string;
      stream: MediaStream;
    }[]
  >([]);

  const getLocalStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      localStreamRef.current = stream;

      if (socketRef.current) {
        socketRef.current.emit('join_voice_channel', { roomName, userId });
      }
    } catch (error) {
      console.error('failed to get user media :', error);
    }
  }, []);

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);

    socketRef.current.on('participants_list', async ({ participants }) => {
      console.log('participants_list', participants);
      // participant를 순회하면서 RTCPeerConnection을 생성하고 offer를 보낸다.
      for (const participant of participants) {
        // pc 설정
        const pc = new RTCPeerConnection(pc_config);
        pcsRef.current[participant.socketId] = pc;
        console.log('pcsRef.current', pcsRef.current);

        // onicecandidate
        pc.onicecandidate = (e) => {
          if (e.candidate) {
            socketRef.current?.emit('candidate', {
              candidate: e.candidate,
              candidateSenderId: socketRef.current?.id,
              candidateReceiverId: participant.socketId,
            });
          }
        };

        pc.oniceconnectionstatechange = (e) => {
          console.log(e);
        };

        // 미디어 스트림 수신
        pc.ontrack = (e) => {
          console.log('ontrack', e.streams[0]);
          setUsers((prevUsers) => prevUsers.filter((user) => user.socketId !== participant.socketId));
          setUsers((prevUsers) => [
            ...prevUsers,
            { socketId: participant.socketId, userId: participant.userId, stream: e.streams[0] },
          ]);
        };

        // 로컬 미디어 스트림 송신
        if (localStreamRef.current) {
          localStreamRef.current.getTracks().forEach((track) => {
            pc.addTrack(track, localStreamRef.current!);
          });
        }

        // offer 보내기
        try {
          const sdp = await pc.createOffer();
          await pc.setLocalDescription(new RTCSessionDescription(sdp));
          if (socketRef.current) {
            socketRef.current.emit('offer', {
              sdp,
              offerSenderSocketId: socketRef.current.id,
              offerSenderId: userId,
              offerReceiverSocketId: participant.socketId,
            });
          }
        } catch (error) {
          console.error('failed to create offer :', error);
        }
      }
    });

    socketRef.current.on('get_offer', async ({ sdp, offerSenderSocketId, offerSenderId }) => {
      console.log('get_offer : ', sdp, offerSenderSocketId, offerSenderId);
      // pc 설정
      const pc = new RTCPeerConnection(pc_config);
      pcsRef.current[offerSenderSocketId] = pc;

      // onicecandidate
      pc.onicecandidate = (e) => {
        if (e.candidate) {
          socketRef.current?.emit('candidate', {
            candidate: e.candidate,
            candidateSenderId: socketRef.current?.id,
            candidateReceiverId: offerSenderSocketId,
          });
        }
      };

      pc.oniceconnectionstatechange = (e) => {
        console.log(e);
      };

      // 미디어 스트림 수신
      pc.ontrack = (e) => {
        console.log('ontrack', e.streams[0]);
        setUsers((prevUsers) => prevUsers.filter((user) => user.socketId !== offerSenderSocketId));
        setUsers((prevUsers) => [
          ...prevUsers,
          { socketId: offerSenderSocketId, userId: offerSenderId, stream: e.streams[0] },
        ]);
      };

      // 로컬 미디어 스트림 송신
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => {
          pc.addTrack(track, localStreamRef.current!);
        });
      }

      // setRemoteDescription
      try {
        await pc.setRemoteDescription(new RTCSessionDescription(sdp));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(new RTCSessionDescription(answer));
        if (socketRef.current) {
          socketRef.current.emit('answer', {
            sdp: answer,
            answerSenderSocketId: socketRef.current.id,
            answerReceiverSocketId: offerSenderSocketId,
          });
        }
      } catch (error) {
        console.error('failed to set remote description :', error);
      }
    });

    socketRef.current.on('get_answer', async ({ sdp, answerSenderSocketId }) => {
      console.log('get_answer : ', sdp, answerSenderSocketId);
      try {
        const pc: RTCPeerConnection = pcsRef.current[answerSenderSocketId];
        if (pc) {
          pc.setRemoteDescription(new RTCSessionDescription(sdp));
        }
        console.log('set remote description success :', sdp);
      } catch (error) {
        console.error('failed to set remote description :', error);
      }
    });

    socketRef.current.on('get_candidate', async ({ candidate, candidateSenderId }) => {
      console.log('get_candidate : ', candidate);
      const pc: RTCPeerConnection = pcsRef.current[candidateSenderId];
      if (pc) {
        try {
          await pc.addIceCandidate(new RTCIceCandidate(candidate));
          console.log('add ice candidate success :', candidate);
        } catch (error) {
          console.error('failed to add ice candidate :', error);
        }
      }
    });

    socketRef.current.on('user_exit', ({ socketId }) => {
      pcsRef.current[socketId].close();
      delete pcsRef.current[socketId];
      setUsers((prevUsers) => prevUsers.filter((user) => user.socketId !== socketId));
    });

    getLocalStream();
  }, [getLocalStream]);

  return (
    <Wrapper>
      <ChannelHeader />
      <VideoContainer>
        <video ref={localVideoRef} autoPlay playsInline muted width={200} height={200}></video>
      </VideoContainer>
      {users.map((user) => (
        <Video key={user.socketId} onVoice userId={user.userId} stream={user.stream} />
      ))}
      <MyMediaControlPanel />
    </Wrapper>
  );
}
//
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VideoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding-top: 80px;
  padding-bottom: 125px;
`;
