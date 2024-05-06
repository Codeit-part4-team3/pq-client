import styled from 'styled-components';
import volumeSvg from '../../../../../../public/images/volume_up_FILL0_wght200_GRAD0_opsz24.svg';
import cameraSvg from '../../../../../../public/images/videocam_off_FILL0_wght200_GRAD0_opsz24.svg';
import micOnSvg from '../../../../../../public/images/mic_on_FILL0_wght200_GRAD0_opsz24.svg';

interface MyMediaControlPanelProps {
  onMuteLocalStreamButtonClick: () => void;
  onOffLocalCameraButtonClick: () => void;
  onHandleMuteAllRemoteStreamsButtonClick: () => void;
}

export default function MediaControlPanel({
  onMuteLocalStreamButtonClick,
  onOffLocalCameraButtonClick,
  onHandleMuteAllRemoteStreamsButtonClick,
}: MyMediaControlPanelProps) {
  return (
    <Wrapper>
      <Button type='button' onClick={onHandleMuteAllRemoteStreamsButtonClick}>
        <img src={volumeSvg} alt='스피커 볼륨 조절 버튼 이미지' width={36} height={36} />
      </Button>
      <Button type='button' onClick={onOffLocalCameraButtonClick}>
        <img src={cameraSvg} alt='카메라 on/off 버튼 이미지' width={36} height={36} />
      </Button>
      <Button type='button' onClick={onMuteLocalStreamButtonClick}>
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
  border: 1px solid var(--gray_CCCCCC);
  width: 60px;
  height: 60px;

  background: var(--white_FFFFFF);
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  &:hover {
    background: var(--gray_CCCCCC);
  }
`;
