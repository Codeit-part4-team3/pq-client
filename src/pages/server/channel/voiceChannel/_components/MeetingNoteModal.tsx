import { FormEventHandler, useState } from 'react';
import { ModalContainer, ModalForm, ModalTitle } from 'src/components/modal/CommonStyles';
import ModalButtons from 'src/components/modal/button/ModalButtons';
import EssentialInput from 'src/components/modal/input/EssentialInput';
import Modal from 'src/components/modal/modal';
import { MeetingNoteModalProps } from '../_types/props';

export default function MeetingNoteModal({
  startMeetingNote,
  meetingNoteModalOpen,
  onModalClose,
}: MeetingNoteModalProps) {
  // 소켓 연결

  const [meetingNoteName, setMeetingNoteName] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  // 회의록 작성 시작
  const handleMeetingNoteStartSubmit: FormEventHandler = (e) => {
    console.log('meetingNoteName:', meetingNoteName);
    e.preventDefault();
    setErrorMsg('');

    if (meetingNoteName === '') {
      setErrorMsg('회의 주제를 입력해주세요');
      return;
    }

    startMeetingNote(meetingNoteName);
    setMeetingNoteName('');
    onModalClose();
  };

  return (
    <Modal isOpen={meetingNoteModalOpen} onClose={onModalClose}>
      <ModalContainer>
        <ModalForm onSubmit={handleMeetingNoteStartSubmit}>
          <ModalTitle>회의록 작성</ModalTitle>
          <EssentialInput
            labelName='회의 주제'
            state={meetingNoteName}
            setState={setMeetingNoteName}
            errorMessage={errorMsg}
          />
          <ModalButtons closeClick={onModalClose} ctaText={'생성'} type='submit' />
        </ModalForm>
      </ModalContainer>
    </Modal>
  );
}
