import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import styled from 'styled-components';

import handleCameraButtonClick from '../../../utils/handleCameraButtonClick';
// import handleMuteButtonClick from '../../../utils/handleMuteButtonClick';

export default function VoiceChannel() {
  // roomName은 나중에 params로 받아오도록 수정
  const roomName = 'test';
  // 임시 백엔드 host
  const host = 'http://localhost:3002';

  // 나의 여러가지 미디어 정보를 담을 변수
  // 비디오, 오디오, 화면 공유 등 여러가지 미디어가 들어간다
  const myStream = useRef<MediaStream | null>();
  // myPeerConnection은 나와 상대방의 연결을 담당하는 객체
  const myPeerConnection = useRef<RTCPeerConnection>();
  // 나의 비디오, 오디오 화면을 보여주기 위한 ref
  const myVideoDom = useRef<HTMLVideoElement>();
  // const myAudioDom = useRef<HTMLAudioElement>();
  // 상대방의 비디오 화면을 보여주기 위한 ref
  const otherVideoDom = useRef<HTMLVideoElement>();
  // socket 객체
  const socketRef = useRef<Socket>();

  // 미디어 정보를 가져오는 함수
  const getMedia = async () => {
    if (!myPeerConnection.current) return;
    try {
      // navigator.mediaDevices.getUserMedia를 통해 나의 비디오, 오디오 정보를 가져옴
      myStream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        // audio가 컴퓨터에 하나 뿐이라서 테스트용으로 false로 설정
        audio: false,
      });

      // 나의 비디오 화면을 보여주기 위한 코드
      if (myVideoDom.current && myStream.current) {
        myVideoDom.current.srcObject = myStream.current;
      } else {
        console.error('myVideoDom is null');
      }

      // 나의 비디오 화면을 peerConnection에 추가해서 상대방에게 보낼 수 있도록 함
      // 다시 말하지만 myPeerConnection은 나와 상대방의 연결을 담당하는 객체이다
      if (myStream.current) {
        // myStream.current.getTracks()은 비디오, 오디오 등 여러가지 미디어 트랙을 가져온다
        myStream.current.getTracks().forEach((track) => {
          if (myPeerConnection.current && myStream.current) {
            // addTrack을 통해 상대방에게 나의 비디오, 오디오 정보를 보낼 수 있도록 함
            myPeerConnection.current.addTrack(track, myStream.current);
          }
        });
      }

      // icecandidate 이벤트 발생 시 candidate를 상대방에게 보냄
      myPeerConnection.current.onicecandidate = (event) => {
        if (event.candidate && socketRef.current) {
          socketRef.current.emit('candidate', event.candidate, roomName);
        }
      };

      // 상대방의 비디오 화면을 받아서 화면에 출력
      // event 객체의 경우 상대방이 보낸 미디어 스트림 정보가 들어있다
      myPeerConnection.current.ontrack = (event) => {
        if (otherVideoDom.current) {
          otherVideoDom.current.srcObject = event.streams[0];
        }
      };
    } catch (e) {
      console.error('getMedia error', e);
    }
  };

  // 상대방에게 offer를 보내는 함수
  const createOffer = async () => {
    if (!myPeerConnection.current || !socketRef.current) return;
    try {
      // createOffer를 통해 offer를 생성
      const offer = await myPeerConnection.current.createOffer();
      // setLocalDescription을 통해 offer를 myPeerConnection에 저장
      await myPeerConnection.current.setLocalDescription(offer);
      // 소켓을 통해 offer를 보냄
      socketRef.current.emit('offer', offer, roomName);
    } catch (e) {
      console.error('createOffer error', e);
    }
  };

  // 상대방에게 보낸 offer에 대한 응답을 생성하는 함수
  const createAnswer = async (offer: RTCSessionDescriptionInit) => {
    if (!myPeerConnection.current || !socketRef.current) return;
    try {
      // setRemoteDescription을 통해 상대방의 offer를 myPeerConnection에 저장
      await myPeerConnection.current.setRemoteDescription(offer);
      // createAnswer를 통해 상대방에게 보낼 answer를 생성
      const answer = await myPeerConnection.current.createAnswer();
      // setLocalDescription을 통해 answer를 myPeerConnection에 저장
      await myPeerConnection.current.setLocalDescription(answer);
      // 소켓을 통해 answer를 보냄
      socketRef.current.emit('answer', answer, roomName);
    } catch (e) {
      console.error('createAnswer error', e);
    }
  };

  // 컴포넌트가 처음 마운트 될 때 소켓 연결과 소켓 이벤트 리스너를 등록한다
  useEffect(() => {
    // 소켓 연결
    socketRef.current = io(host);

    // RTCPeerConnection 객체 생성
    // RTCPeerConnection은 나와 상대방의 연결을 담당하는 객체이다 == myPeerConnection
    myPeerConnection.current = new RTCPeerConnection({
      // stun 서버 설정
      iceServers: [
        {
          urls: [
            'stun:stun.l.google.com:19302',
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302',
            'stun:stun3.l.google.com:19302',
          ],
        },
      ],
    });

    // offer 이벤트 발생 시 createAnswer 함수 실행
    socketRef.current.on('offer', async (offer: RTCSessionDescription) => {
      await createAnswer(offer);
    });

    // answer 이벤트 발생 시 받은 answer를 myPeerConnection에 저장
    socketRef.current.on('answer', async (answer: RTCSessionDescription) => {
      if (!myPeerConnection.current) return;
      await myPeerConnection.current.setRemoteDescription(answer);
    });

    // candidate 이벤트 발생 시 받은 candidate를 myPeerConnection에 저장
    socketRef.current.on('candidate', async (candidate: RTCIceCandidate) => {
      if (!myPeerConnection.current) return;
      await myPeerConnection.current.addIceCandidate(candidate);
    });

    // join_room 이벤트 발생 시 createOffer 함수 실행
    socketRef.current.on('join_room', (roomName: string) => {
      console.log('join_room', roomName);
      createOffer();
    });

    // 소켓에 join_room 이벤트를 보내고 접속할 roomName을 보낸다
    socketRef.current.emit('join_room', roomName);

    // getMedia 함수를 실행해 나의 미디어 정보를 가져온다
    getMedia();

    // 언마운트시 미디어 정보를 정리한다
    return () => {
      if (myStream.current) {
        myStream.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <>
      <div>
        <video
          playsInline={true}
          autoPlay={true}
          width={400}
          height={400}
          ref={myVideoDom as React.RefObject<HTMLVideoElement>}
        ></video>
        <video
          playsInline={true}
          autoPlay={true}
          width={400}
          height={400}
          ref={otherVideoDom as React.RefObject<HTMLVideoElement>}
        ></video>
      </div>
      <Toolbar>
        <button
          onClick={() => {
            handleCameraButtonClick(myStream.current, myVideoDom);
          }}
        >
          myVideo
        </button>
      </Toolbar>
    </>
  );
}

const Toolbar = styled.div`
  display: flex;
`;

{
  /*         <button
          onClick={() => {
            handleMuteButtonClick(myStream.current, myAudioDom);
          }}
        >
          myAudio
        </button> */
}
