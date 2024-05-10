import { ModalContainer, ModalForm, ModalTitle } from '../CommonStyles';
import Modal from '../modal';
import MemberInviteSearchForm from '../form/MemberInviteSearchForm';
import InviteLinkInput from '../input/InviteLinkInput';
import EssentialInput from '../input/EssentialInput';
import ToggleButton from '../button/ToggleButton';
import ModalButtons from '../button/ModalButtons';
import { ModalProps } from 'src/types/modalType';
import { FormEventHandler, useContext, useState } from 'react';
import { useMutationPost } from 'src/apis/service/service';
import { ChannelRequest, ChannelResponse } from 'src/pages/server/_types/type';
import { ServerIdContext } from 'src/pages/server/Server';

interface Props extends ModalProps {
  groupId: number;
}

export default function CreateChannelModal({ closeModal, isOpen, groupId }: Props) {
  const mockData = [
    { id: 1, name: '노진석', email: 'shwlstjr08@naver.com' },
    { id: 2, name: '고기호', email: 'sprint@codeit.kr', imageUrl: '/images/plus.svg' },
    { id: 3, name: '오영곤', email: 'test22@codeit.kr', imageUrl: '/images/plus.svg' },
    { id: 4, name: '박준수', email: 'test@codeit.kr', imageUrl: '/images/plus.svg' },
    { id: 5, name: '김희연', email: 'heeyeon8702@naver.com', imageUrl: '/images/plus.svg' },
  ];

  const [channelName, setChannelName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [isVoice, setIsVoice] = useState(false);
  const [isNextModal, setIsNextModal] = useState(false);
  const [invitedUsers, setInvitedUsers] = useState<string[]>([]);
  const handleInvite = (email: string) => {
    setInvitedUsers([...invitedUsers, email]);
  };

  const serverId = useContext<number>(ServerIdContext);

  const createMutation = useMutationPost<ChannelResponse, ChannelRequest>(`/chat/v1/server/${serverId}/channel`);

  const handleNextModalClick = () => {
    setErrorMessage('');
    if (channelName === '') {
      setErrorMessage('이름은 필수입니다.');
      return;
    }
    setIsNextModal(!isNextModal);
  };
  const createChannel: FormEventHandler = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (channelName === '') {
      setErrorMessage('이름은 필수입니다.');
      return;
    }
    // 생성로직

    // createMutation.mutate({ name: channelName, isPrivate: isPrivate, isVoice: channelMode, groupId });

    createMutation.mutate({ name: channelName, isPrivate: isPrivate, isVoice: isVoice, groupId });

    setChannelName('');

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
                state={channelName}
                setState={setChannelName}
              />
              <ToggleButton
                isEnabled={false}
                title='비공개 채널'
                desc='초대를 받은 일부 사람만 참여할 수 있음'
                state={isPrivate}
                toggleClick={() => setIsPrivate(!isPrivate)}
              />
              <ToggleButton
                isEnabled={true}
                title='Voice 체널'
                desc='음성 채팅을 할 수 있음'
                state={isVoice}
                toggleClick={() => setIsVoice(!isVoice)}
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
