import styled from 'styled-components';

import MyMediaControlPanel from './_components/MyMediaControlPanel';
import Video from './_components/Video';
import ChannelHeader from 'src/components/channel/ChannelHeader';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useParams } from 'react-router-dom';

const SOCKET_SERVER_URL = 'https://pqsoft.net:3000';

const pc_Config = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

/**@ToDo 매일 시간내서 RTC 고치기 */
export default function VoiceChannel() {
  const { channelId: roomName } = useParams();
  console.log('roomName:', roomName);
  const socketRef = useRef<Socket | null>(null);
  const senderPCRef = useRef<RTCPeerConnection | null>(null);
  const receiverPCsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
  const localStreamRef = useRef<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);

  const getLocalMediaStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      localStreamRef.current = stream;
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;

      // peer connection 생성
      senderPCRef.current = new RTCPeerConnection(pc_Config);

      // localStream 추가
      stream.getTracks().forEach((track) => senderPCRef.current?.addTrack(track, stream));

      // ice candidate 전송
      senderPCRef.current.onicecandidate = (e) => {
        if (e.candidate) {
          socketRef.current?.emit('newParticipant_ice_candidate', {
            candidate: e.candidate,
            newParticipantSocketId: socketRef.current?.id,
            roomName,
          });
        }
      };

      // ice connection state 변경
      senderPCRef.current.oniceconnectionstatechange = () => {};

      // Create and send offer
      const offer = await senderPCRef.current.createOffer();
      await senderPCRef.current.setLocalDescription(offer);
      socketRef.current?.emit('newParticipant_offer', { offer, senderPCId: socketRef.current?.id, roomName });
    } catch (error) {
      console.error('getUserMedia Error:', error);
    }
  };

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);

    socketRef.current.on('connect', async () => {
      socketRef.current?.emit('join_voice_channel', { roomName });

      socketRef.current?.on('newParticipant_answer', async ({ answer }) => {
        if (senderPCRef.current) {
          await senderPCRef.current.setRemoteDescription(new RTCSessionDescription(answer));
        }
      });

      socketRef.current?.on('existingParticipant_offer', async ({ offer, senderPCId, roomName }) => {
        if (!receiverPCsRef.current[senderPCId]) {
          receiverPCsRef.current[senderPCId] = new RTCPeerConnection(pc_Config);
        }

        // ontrack 이벤트 핸들러
        receiverPCsRef.current[senderPCId].ontrack = (e) => {
          setRemoteStreams((prev) => [...prev, e.streams[0]]);
        };

        await receiverPCsRef.current[senderPCId].setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await receiverPCsRef.current[senderPCId].createAnswer();
        await receiverPCsRef.current[senderPCId].setLocalDescription(answer);
        socketRef.current?.emit('existingParticipant_answer', {
          answer,
          receiverPCId: socketRef.current?.id,
          senderPCId,
          roomName,
        });
      });

      socketRef.current?.on('existingParticipant_ice_candidate', async ({ candidate, senderPCId }) => {
        await receiverPCsRef.current[senderPCId].addIceCandidate(new RTCIceCandidate(candidate));
      });

      // 새로운 참가자가 들어왔을 때 미디어 스트림을 받음
      socketRef.current?.on('newParticipant_offer', async ({ offer, senderPCId }) => {
        if (!receiverPCsRef.current[senderPCId]) {
          receiverPCsRef.current[senderPCId] = new RTCPeerConnection(pc_Config);
        }

        console.log('receiverPCsRef.current[senderPCId]:', receiverPCsRef.current[senderPCId]);

        // ontrack 이벤트 핸들러
        receiverPCsRef.current[senderPCId].ontrack = (e) => {
          setRemoteStreams((prev) => [...prev, e.streams[0]]);
        };

        await receiverPCsRef.current[senderPCId].setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await receiverPCsRef.current[senderPCId].createAnswer();
        await receiverPCsRef.current[senderPCId].setLocalDescription(answer);
        socketRef.current?.emit('newParticipant_answer', {
          answer,
          receiverPCId: socketRef.current?.id,
          senderPCId,
          roomName,
        });
      });

      // 새로운 참가자의 미디어 스트림을 받기 위한 ice candidate 설정
      socketRef.current?.on('newParticipant_ice_candidate', async ({ candidate, senderPCId }) => {
        console.log('newParticipant_ice_candidate:', candidate, senderPCId);
        if (receiverPCsRef.current[senderPCId]) {
          await receiverPCsRef.current[senderPCId].addIceCandidate(new RTCIceCandidate(candidate));
        }
        console.log(receiverPCsRef.current[senderPCId].iceConnectionState);
      });

      // ice connection state 변경
      socketRef.current?.on('iceConnectionStateChange', (iceConnectionState) => {
        console.log('iceConnectionStateChange :', iceConnectionState);
      });

      // 로컬 미디어 스트림 가져오기
      getLocalMediaStream();
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log('remoteStreams:', remoteStreams);
    return () => {
      remoteStreams.forEach((stream) => {
        stream.getTracks().forEach((track) => track.stop());
      });
    };
  }, [remoteStreams]);

  return (
    <Wrapper>
      <ChannelHeader />
      <button
        type='button'
        onClick={() => {
          console.log('remoteStreams:', remoteStreams);
        }}
      >
        remoteStreams
      </button>
      <VideoContainer>
        <Video onVoice={true} />
        <video ref={localVideoRef} autoPlay playsInline width={600} height={338}></video>
        {remoteStreams.map((stream, index) => (
          <video
            key={index}
            ref={(videoEl) => {
              if (videoEl) videoEl.srcObject = stream;
            }}
            autoPlay
            playsInline
          />
        ))}
      </VideoContainer>

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
