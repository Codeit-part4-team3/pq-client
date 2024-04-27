import styled from 'styled-components';
import volumeSvg from '../../../public/images/volume_up_FILL0_wght200_GRAD0_opsz24.svg';
import cameraSvg from '../../../public/images/videocam_off_FILL0_wght200_GRAD0_opsz24.svg';
import micOnSvg from '../../../public/images/mic_on_FILL0_wght200_GRAD0_opsz24.svg';

export default function MyMediaControlPanel() {
  const handleSpeakerVolumeButtonClick = () => {
    console.log('handleSpeakerVolumeButtonClick');
  };

  const handleCameraButtonClick = () => {
    console.log('handleCameraButtonClick');
  };

  const handleMicVolumeButtonClick = () => {
    console.log('handleMicVolumeButtonClick');
  };

  return (
    <Wrapper>
      <Button type='button' onClick={handleSpeakerVolumeButtonClick}>
        <img src={volumeSvg} alt='스피커 볼륨 조절 버튼 이미지' width={36} height={36} />
      </Button>
      <Button type='button' onClick={handleCameraButtonClick}>
        <img src={cameraSvg} alt='카메라 on/off 버튼 이미지' width={36} height={36} />
      </Button>
      <Button type='button' onClick={handleMicVolumeButtonClick}>
        <img src={micOnSvg} alt='마이크 볼륨 조절 버튼 이미지' width={36} height={36} />
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Button = styled.button`
  border-radius: 10px;
  border: 1px solid #ccc;
  width: 60px;
  height: 60px;

  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  cursor: pointer;

  &:hover {
    background: #ccc;
  }
`;
