import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import profileImage from '../../../public/images/videoProfile.jfif';

interface OtherVideoProps {
  stream: MediaStream;
}

const OtherVideo: React.FC<OtherVideoProps> = ({ stream }) => {
  console.log(stream);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  console.log(videoRef);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <>
      {/* <video ref={videoRef} autoPlay playsInline width={200} height={200} />; */}
      <Media>
        <ProfileImage src={profileImage} alt='프로필 이미지' />
        <NameTag>{'참여자 이름'}</NameTag>
      </Media>
    </>
  );
};

export default OtherVideo;

const Media = styled.div`
  border-radius: 10px;
  border: 0.5px solid #eaeaea;
  width: 600px;
  height: 338px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);

  background: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  position: relative;
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
