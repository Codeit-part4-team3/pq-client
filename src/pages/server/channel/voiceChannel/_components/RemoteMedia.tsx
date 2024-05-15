import styled from 'styled-components';
import profileImage from '../../../../../../public/images/minji-profile-image.png';
import micOffSvg from '../../../../../../public/images/mic_off_FILL0_wght200_GRAD0_opsz24.svg';
import micOnSvg from '../../../../../../public/images/mic_on_FILL0_wght200_GRAD0_opsz24.svg';
import { useEffect, useRef } from 'react';
import { RemoteMediaProps } from '../_types/props';

export default function RemoteMedia({ stream, userNickname, isMutedAllRemoteStreams, showVideo }: RemoteMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMutedRemoteStream = false;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <>
      <MediaBox>
        {!showVideo ? (
          <NotShowVideoWrapper>
            <ProfileImage src={profileImage} alt='프로필 이미지' />
          </NotShowVideoWrapper>
        ) : null}
        <Media ref={videoRef} autoPlay playsInline muted={isMutedAllRemoteStreams} />
        <NameTag>{userNickname}</NameTag>
        {isMutedRemoteStream ? (
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
  width: 100%;
  height: 100%;

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

  width: 100%;
  height: 100%;
`;

const ProfileImage = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
`;

const NameTag = styled.div`
  border-radius: 4px;
  border: 0.1px solid var(--gray_CCCCCC);

  display: inline-flex;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: var(--white_FFFFFF);
  color: var(--black_000000);
  font-family: Pretendard;
  font-size: 12px;
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
  background: var(--white_FFFFFF);

  position: absolute;
  right: 10px;
  bottom: 10px;
`;
