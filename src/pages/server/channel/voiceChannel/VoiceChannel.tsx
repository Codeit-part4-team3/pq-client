import styled from 'styled-components';

import MyMediaControlPanel from './_components/MyMediaControlPanel';
import Video from './_components/Video';
import ChannelHeader from 'src/components/channel/ChannelHeader';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useParams } from 'react-router-dom';

const SOCKET_SERVER_URL = 'http://localhost:3001';

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
      senderPCRef.current.oniceconnectionstatechange = (e) => {
        console.log('oniceconnectionstatechange :', e);
      };

      // Create and send offer
      const offer = await senderPCRef.current.createOffer();
      await senderPCRef.current.setLocalDescription(offer);
      console.log('newParticipant_offer :', offer);
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
        console.log('newParticipant_answer :', answer);
        if (senderPCRef.current) {
          await senderPCRef.current.setRemoteDescription(new RTCSessionDescription(answer));
        }
      });

      // 로컬 미디어 스트림 가져오기
      getLocalMediaStream();
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return (
    <Wrapper>
      <ChannelHeader />

      <VideoContainer>
        <Video onVoice={true} />
        <video ref={localVideoRef} autoPlay playsInline width={600} height={338}></video>
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
