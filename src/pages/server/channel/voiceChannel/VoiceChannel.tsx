import styled from 'styled-components';

import MediaControlPanel from './_components/MediaControlPanel';
import { useCallback, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import LocalMedia from './_components/LocalMedia';
import RemoteMedia from './_components/RemoteMedia';
import MeetingNote from './_components/MeetingNote';
import { useParams } from 'react-router-dom';

const SOCKET_SERVER_URL = 'https://api.pqsoft.net:3000';

const pc_config = {
  iceServers: [
    // {
    //   urls: ['stun:stun.l.google.com:19302'],
    // },
    { urls: 'turn:43.200.40.206', username: 'codeit', credential: 'sprint101!' }, // TURN 서버 설정
  ],
};

/**@ToDo
 * 1. 유저 데이터들 처리하는 로직 짜야함
 * 2. Channel 컴포넌트로 부터 channel date를 prop로 받고 데이터 바인딩 예정 */

export default function VoiceChannel() {
  const { serverId, channelId } = useParams();
  console.log('serverId', serverId, 'channelId', channelId);
  const roomName = channelId || 'test';
  const userId = 'userId';

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
      showVideo: boolean;
    }[]
  >([]);

  // remoteMediaControl
  const [isMutedAllRemoteStreams, setIsMutedAllRemoteStreams] = useState<boolean>(false);

  // localMediaControl
  const [isMutedLocalStream, setIsMutedLocalStream] = useState<boolean>(false);
  const [showLocalVideo, setShowLocalVideo] = useState<boolean>(true);

  const localMediaData = {
    userId,
    stream: localStreamRef.current,
    isMutedLocalStream,
    showLocalVideo,
  };

  // 회의록
  const showMeetingNote = true;

  /**
   * audioTrack.enabled의 경우 소리 생산 자체를 관여해서 들리지 않게 한다.
   * audio, video태그의 muted 경우 audio또는 video 태그의 소리를 끄는 것이다.
   * 따라서 다른 사람에게 나의 소리를 들리게 하지 않으려면 audioTrack.enabled를 false로 해야한다.
   * 그리고 다른 사람의 소리를 듣지 않으려면 audio, video태그의 muted를 true로 해야한다.
   */
  const handleMuteLocalStream = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      console.log(audioTrack);
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
      }
    }
    setIsMutedLocalStream((prev) => !prev);
  };

  // 나의 카메라 끄기
  const handleOffLocalCamera = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      console.log(videoTrack);
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        socketRef.current?.emit('video_track_enabled_changed', {
          enabled: videoTrack.enabled,
          userSocketId: socketRef.current.id,
          roomName,
        });
      }
    }
    setShowLocalVideo((prev) => !prev);
  };

  // 다른 사람들의 소리 끄기
  const handleMuteAllRemoteStreams = () => {
    setIsMutedAllRemoteStreams((prev) => !prev);
  };

  const getLocalStream = useCallback(async () => {
    console.log('getLocalStream');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
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
  }, [roomName]);

  useEffect(() => {
    console.log('useEffect');
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
            { socketId: participant.socketId, userId: participant.userId, stream: e.streams[0], showVideo: true },
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
          { socketId: offerSenderSocketId, userId: offerSenderId, stream: e.streams[0], showVideo: true },
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

    // 다른 유저가 자신의 비디오를 껐을 때
    socketRef.current.on('video_track_enabled_changed', ({ enabled, userSocketId }) => {
      setUsers((prevUsers) => {
        const user = prevUsers.find((user) => user.socketId === userSocketId);
        if (user) {
          user.showVideo = enabled;
        }
        return [...prevUsers];
      });
    });

    // 다른 유저가 나갔을 때
    socketRef.current.on('user_exit', ({ exitSocketId }) => {
      console.log('user_exit', exitSocketId);
      // 해당 유저의 RTCPeerConnection을 종료하고 users에서 제거
      pcsRef.current[exitSocketId].close();
      delete pcsRef.current[exitSocketId];
      setUsers((prevUsers) => prevUsers.filter((user) => user.socketId !== exitSocketId));
    });

    getLocalStream();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [roomName, userId, getLocalStream]);

  return (
    <Wrapper>
      <button
        onClick={() => {
          console.log('localStreamRef.current', localStreamRef.current?.getTracks());
        }}
      ></button>
      <ContentBox>
        <MediaBox>
          <VideoContainer>
            {/* myVideo */}
            <LocalMedia {...localMediaData} />
            {/* otherVideos */}
            {users.map((user) => (
              <RemoteMedia key={user.socketId} {...user} isMutedAllRemoteStreams={isMutedAllRemoteStreams} />
            ))}
          </VideoContainer>
          <MediaControlPanel
            onMuteLocalStreamButtonClick={handleMuteLocalStream}
            isMutedLocalStream={isMutedLocalStream}
            onOffLocalCameraButtonClick={handleOffLocalCamera}
            showLocalVideo={showLocalVideo}
            onHandleMuteAllRemoteStreamsButtonClick={handleMuteAllRemoteStreams}
            isMutedAllRemoteStreams={isMutedAllRemoteStreams}
          />
        </MediaBox>
        {showMeetingNote ? <MeetingNote /> : null}
      </ContentBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--landing_background_color);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const VideoContainer = styled.div`
  width: 100%;

  padding: 20px;
  display: grid;
  grid-template-columns: repeat(2, minmax(200px, 1fr));
  grid-template-rows: repeat(2, minmax(120px, 1fr));
  justify-items: center;
  align-items: center;
  gap: 10px;
`;

const ContentBox = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
`;

const MediaBox = styled.div`
  width: 65%;
  height: 100%;
  min-width: 450px;

  display: flex;
  flex-direction: column;
`;
