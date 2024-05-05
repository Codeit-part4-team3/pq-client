import styled from 'styled-components';
import profileImage from '../../../../../../public/images/minji-profile-image.png';
import micOffSvg from '../../../../../../public/images/mic_off_FILL0_wght200_GRAD0_opsz24.svg';
import micOnSvg from '../../../../../../public/images/mic_on_FILL0_wght200_GRAD0_opsz24.svg';
import { useEffect, useRef } from 'react';

interface VideoProps {
  // stream: MediaStream;
  userId: string;
  stream: MediaStream | null;
  isMutedLocalStream: boolean;
  showLocalVideo: boolean;
}

export default function LocalMedia({ userId, stream, isMutedLocalStream, showLocalVideo }: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <>
      <MediaBox>
        {!showLocalVideo ? (
          <NotShowVideoWrapper>
            <ProfileImage src={profileImage} alt='프로필 이미지' />
          </NotShowVideoWrapper>
        ) : null}
        <Media ref={videoRef} autoPlay playsInline muted={isMutedLocalStream} />
        <NameTag>{userId}</NameTag>
        {isMutedLocalStream ? (
          <MicOff>
            <img src={micOffSvg} alt='마이크 off 이미지' width={24} height={24} />
          </MicOff>
        ) : (
          <>
            <MicOff>
              <img src={micOnSvg} alt='마이크 off 이미지' width={24} height={24} />
            </MicOff>
          </>
        )}
      </MediaBox>
    </>
  );
}

const MediaBox = styled.div`
  border-radius: 10px;
  width: 600px;
  height: 338px;

  display: flex;
  justify-content: center;
  align-items: center;
  background: #d9d9d9;
  overflow: hidden;

  position: relative;
`;

const NotShowVideoWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #f1f8ff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);

  position: absolute;
`;

const Media = styled.video`
  object-fit: contain;
`;

const ProfileImage = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
`;

const NameTag = styled.div`
  border-radius: 4px;
  border: 0.1px solid #ccc;

  display: inline-flex;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: #fff;
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 19.2px */

  position: absolute;
  left: 10px;
  bottom: 12px;
`;

const MicOff = styled.div`
  border-radius: 4px;
  width: 32px;
  height: 32px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background: #fff;

  position: absolute;
  right: 10px;
  bottom: 10px;
`;