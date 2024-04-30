import styled from 'styled-components';
import profileImage from '../../../../../../public/images/videoProfile.jfif';
import micOffSvg from '../../../../../../public/images/mic_off_FILL0_wght200_GRAD0_opsz24.svg';

interface OtherVideoProps {
  // stream: MediaStream;
  onVoice: boolean;
}

export default function Video({ onVoice }: OtherVideoProps) {
  return (
    <>
      {/* <video ref={videoRef} autoPlay playsInline width={200} height={200} />; */}
      <Media onVoice={onVoice}>
        <ProfileImage src={profileImage} alt='프로필 이미지' />
        <NameTag>{'참여자 이름'}</NameTag>
        {onVoice ? null : (
          <MicOff>
            <img src={micOffSvg} alt='마이크 off 이미지' width={24} height={24} />
          </MicOff>
        )}
      </Media>
    </>
  );
}

const Media = styled.div<{ onVoice: boolean }>`
  border-radius: 10px;
  border: ${({ onVoice }) => (onVoice ? '2px solid #00BB83' : '1px solid #ccc')};
  width: 600px;
  height: 338px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);

  background: ${({ onVoice }) => (onVoice ? '#F1F8FF' : '#d9d9d9')};
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
