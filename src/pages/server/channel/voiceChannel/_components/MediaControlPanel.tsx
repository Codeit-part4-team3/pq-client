import styled from 'styled-components';
import volumeOnSvg from '../../../../../../public/images/volume_on_FILL0_wght200_GRAD0_opsz24.svg';
import volumeOffSvg from '../../../../../../public/images/volume_off_FILL0_wght200_GRAD0_opsz24.svg';
import cameraOnSvg from '../../../../../../public/images/videocam_on_FILL0_wght200_GRAD0_opsz24.svg';
import cameraOffSvg from '../../../../../../public/images/videocam_off_FILL0_wght200_GRAD0_opsz24.svg';
import micOnSvg from '../../../../../../public/images/mic_on_FILL0_wght200_GRAD0_opsz24.svg';
import micOffSvg from '../../../../../../public/images/mic_off_FILL0_wght200_GRAD0_opsz24.svg';
import meetingNote from '../../../../../../public/images/meeting_note.png';
import meetingNoteList from '../../../../../../public/images/meeting_note_list.png';

interface MyMediaControlPanelProps {
  onMuteLocalStreamButtonClick: () => void;
  isMutedLocalStream: boolean;
  onOffLocalCameraButtonClick: () => void;
  showLocalVideo: boolean;
  onHandleMuteAllRemoteStreamsButtonClick: () => void;
  isMutedAllRemoteStreams: boolean;
  showMeetingNote: boolean;
  onMeetingNoteModalOpen: () => void;
  onMeetingNoteEndClick: () => void;
  onMeetingNoteListOpen: () => void;
  isOpenMeetingNoteList: boolean;
}

export default function MediaControlPanel({
  onMuteLocalStreamButtonClick,
  isMutedLocalStream,
  onOffLocalCameraButtonClick,
  showLocalVideo,
  onHandleMuteAllRemoteStreamsButtonClick,
  isMutedAllRemoteStreams,
  showMeetingNote,
  onMeetingNoteModalOpen,
  onMeetingNoteEndClick,
  onMeetingNoteListOpen,
  isOpenMeetingNoteList,
}: MyMediaControlPanelProps) {
  return (
    <Wrapper>
      <Button type='button' onClick={onHandleMuteAllRemoteStreamsButtonClick} isOn={isMutedAllRemoteStreams}>
        {isMutedAllRemoteStreams ? (
          <img src={volumeOffSvg} alt='스피커 볼륨 끄기 버튼 이미지' width={36} height={36} />
        ) : (
          <img src={volumeOnSvg} alt='스피커 볼륨 켜기 버튼 이미지' width={36} height={36} />
        )}
      </Button>
      <Button type='button' onClick={onOffLocalCameraButtonClick} isOn={!showLocalVideo}>
        {showLocalVideo ? (
          <img src={cameraOnSvg} alt='카메라 켜짐 켜기 이미지' width={36} height={36} />
        ) : (
          <img src={cameraOffSvg} alt='카메라 꺼짐 끄기 이미지' width={36} height={36} />
        )}
      </Button>
      <Button type='button' onClick={onMuteLocalStreamButtonClick} isOn={isMutedLocalStream}>
        {isMutedLocalStream ? (
          <img src={micOffSvg} alt='마이크 볼륨 꺼짐 끄기 이미지' width={36} height={36} />
        ) : (
          <img src={micOnSvg} alt='마이크 볼륨 켜짐 켜기 이미지' width={36} height={36} />
        )}
      </Button>
      <Button
        type='button'
        onClick={showMeetingNote ? onMeetingNoteEndClick : onMeetingNoteModalOpen}
        isOn={showMeetingNote}
      >
        <img src={meetingNote} alt='미팅 노트 이미지' width={26} height={26} />
      </Button>
      <Button type='button' onClick={onMeetingNoteListOpen} isOn={isOpenMeetingNoteList}>
        <img src={meetingNoteList} alt='미팅 노트 찾기 이미지' width={26} height={26} />
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

const Button = styled.button<{ isOn: boolean }>`
  border-radius: 10px;
  border: 1px solid var(--gray_CCCCCC);
  width: 60px;
  height: 60px;

  background: ${({ isOn }) => (isOn ? 'var(--gray_999999)' : 'var(--white_FFFFFF)')};
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  &:hover {
    background: var(--gray_CCCCCC);
  }
`;
