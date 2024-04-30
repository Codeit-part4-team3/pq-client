import { ModalContainer, ModalForm, ModalTitle } from '../CommonStyles';
import Modal from '../modal';
import MemberInviteSearchForm from '../form/MemberInviteSearchForm';
import InviteLinkInput from '../input/InviteLinkInput';
import EssentialInput from '../input/EssentialInput';
import PrivateToggleButton from '../button/PrivateToggleButton';
import ModalButtons from '../button/ModalButtons';
import { ModalProps } from 'src/types/modalType';
import { FormEventHandler, useState } from 'react';

export default function CreateChannelModal({ closeModal, isOpen }: ModalProps) {
  const mockData = [
    { id: 1, name: '노진석', email: 'shwlstjr08@naver.com' },
    { id: 2, name: '고기호', email: 'sprint@codeit.kr', imageUrl: '/images/plus.svg' },
    { id: 3, name: '오영곤', email: 'test22@codeit.kr', imageUrl: '/images/plus.svg' },
    { id: 4, name: '박준수', email: 'test@codeit.kr', imageUrl: '/images/plus.svg' },
    { id: 5, name: '김희연', email: 'heeyeon8702@naver.com', imageUrl: '/images/plus.svg' },
  ];

  const [categoryName, setCategoryName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [isNextModal, setIsNextModal] = useState(false);

  const [invitedUsers, setInvitedUsers] = useState<string[]>([]);
  const handleInvite = (email: string) => {
    setInvitedUsers([...invitedUsers, email]);
  };

  const handleToggle = () => {
    setIsPrivate(!isPrivate);
  };
  const handleNextModalClick = () => {
    setErrorMessage('');
    if (categoryName === '') {
      setErrorMessage('이름은 필수입니다.');
      return;
    }
    setIsNextModal(!isNextModal);
  };
  const createChannel: FormEventHandler = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (categoryName === '') {
      setErrorMessage('이름은 필수입니다.');
      return;
    }
    // 생성로직
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalContainer>
        {isNextModal ? (
          <>
            <ModalTitle>비공개 채널 초대</ModalTitle>
            <MemberInviteSearchForm buttonClick={handleInvite} invitedUsers={invitedUsers} initialValue={mockData} />
            <InviteLinkInput link='링크 ' />
            <form onSubmit={createChannel}>
              <ModalButtons
                closeClick={handleNextModalClick}
                ctaText={invitedUsers.length > 0 ? '다음' : '건너뛰기'}
                type='submit'
                closeText='뒤로가기'
              />
            </form>
          </>
        ) : (
          <>
            <ModalTitle>채널 만들기</ModalTitle>
            <ModalForm onSubmit={createChannel}>
              <EssentialInput
                errorMessage={errorMessage}
                labelName='채널 이름'
                state={categoryName}
                setState={setCategoryName}
              />
              <PrivateToggleButton title='비공개 채널' state={isPrivate} toggleClick={handleToggle} />
              <ModalButtons
                closeClick={closeModal}
                ctaText={isPrivate ? '다음' : '생성'}
                type={isPrivate ? 'button' : 'submit'}
                onClick={isPrivate ? handleNextModalClick : undefined}
              />
            </ModalForm>
          </>
        )}
      </ModalContainer>
    </Modal>
  );
}
