import { FormEventHandler, useContext, useState } from 'react';
import { ModalProps } from '../../../types/modalType';
import { ModalForm } from '../CommonStyles';
import ModalButtons from '../button/ModalButtons';
import EssentialInput from '../input/EssentialInput';
import Modal from '../modal';
import { ModalTitle, ModalContainer } from './../CommonStyles';
import ToggleButton from '../button/ToggleButton';
import InviteLinkInput from '../input/InviteLinkInput';
import MemberInviteSearchForm from '../form/MemberInviteSearchForm';
import { useMutationPost } from 'src/apis/service/service';
import { ChannelRequest, ChannelResponse } from 'src/pages/server/_types/type';
import { ServerIdContext } from 'src/pages/server/Server';

export default function CreateCategoryModal({ closeModal, isOpen }: ModalProps) {
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

  const serverId = useContext<number>(ServerIdContext);

  const createMutation = useMutationPost<ChannelResponse, ChannelRequest>(`/chat/v1/server/${serverId}/channel`);

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

  const createCategory: FormEventHandler = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (categoryName === '') {
      setErrorMessage('이름은 필수입니다.');
      return;
    }

    setCategoryName('');
    // 생성로직
    createMutation.mutate({ name: categoryName, isPrivate: isPrivate, isVoice: false });
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalContainer>
        {isNextModal ? (
          <>
            <ModalTitle>비공개 카테고리 초대</ModalTitle>
            <MemberInviteSearchForm buttonClick={handleInvite} invitedUsers={invitedUsers} initialValue={mockData} />
            <InviteLinkInput link='링크 ' />
            <form onSubmit={createCategory}>
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
            <ModalTitle>카테고리 만들기</ModalTitle>
            <ModalForm onSubmit={createCategory}>
              <EssentialInput
                errorMessage={errorMessage}
                labelName='카테고리 이름'
                state={categoryName}
                setState={setCategoryName}
              />
              <ToggleButton
                isEnabled={false}
                title='비공개 카테고리'
                desc='초대를 받은 일부 사람만 참여할 수 있음'
                state={isPrivate}
                toggleClick={handleToggle}
              />
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
