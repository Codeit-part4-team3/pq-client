import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSocketConnect } from 'src/hooks/useSocketConnect';
import useUserStore from 'src/store/userStore';

const pc_config = {
  iceServers: [
    // {
    //   urls: ['stun:stun.l.google.com:19302'],
    // },
    { urls: 'turn:43.200.40.206', username: 'codeit', credential: 'sprint101!' }, // TURN 서버 설정
  ],
};

export default function useVoiceChannel() {
  const { channelId } = useParams();
  const roomName = channelId;

  // myUserData
  const { userInfo } = useUserStore();
  const { id: userId, nickname: userNickname } = userInfo;

  // socket
  const { socketRef } = useSocketConnect();
  const pcsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const [users, setUsers] = useState<
    {
      socketId: string;
      userId: string;
      userNickname: string;
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
    userNickname,
    stream: localStreamRef.current,
    isMutedLocalStream,
    showLocalVideo,
  };

  // 회의록
  const [showMeetingNote] = useState(false);

  // 나의 소리를 다른 사람들에게 들리지 않게 하기
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

  // 로컬 미디어 스트림 가져오기
  const getLocalStream = useCallback(async () => {
    console.log('getLocalStream');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      localStreamRef.current = stream;

      if (socketRef.current) {
        socketRef.current.emit('join_voice_channel', { roomName, userId, userNickname });
      }
    } catch (error) {
      console.error('failed to get user media :', error);
    }
  }, [roomName, userId, userNickname, socketRef]);

  useEffect(() => {
    if (!socketRef.current) return;

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
            {
              socketId: participant.socketId,
              userId: participant.userId,
              userNickname: participant.userNickname,
              stream: e.streams[0],
              showVideo: true,
            },
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
              offerSenderNickname: userNickname,
              offerReceiverSocketId: participant.socketId,
            });
          }
        } catch (error) {
          console.error('failed to create offer :', error);
        }
      }
    });

    socketRef.current.on('get_offer', async ({ sdp, offerSenderSocketId, offerSenderNickname, offerSenderId }) => {
      console.log('get_offer : ', sdp, offerSenderSocketId, offerSenderNickname, offerSenderId);
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
          {
            socketId: offerSenderSocketId,
            userId: offerSenderId,
            userNickname: offerSenderNickname,
            stream: e.streams[0],
            showVideo: true,
          },
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
  }, [roomName, userId, userNickname, getLocalStream, socketRef]);

  return {
    users,
    localMediaData,
    isMutedLocalStream,
    showLocalVideo,
    isMutedAllRemoteStreams,
    showMeetingNote,
    handleMuteLocalStream,
    handleOffLocalCamera,
    handleMuteAllRemoteStreams,
  };
}
