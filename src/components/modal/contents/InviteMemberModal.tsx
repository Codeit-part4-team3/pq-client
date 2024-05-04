import { ModalProps } from 'src/types/modalType';
import Modal from '../modal';
import { ModalContainer, ModalForm, ModalTitle } from '../CommonStyles';
import EssentialInput from '../input/EssentialInput';
import { FormEventHandler, useState } from 'react';
import ModalButtons from '../button/ModalButtons';
import { useMutationPost } from 'src/apis/service/service';
import { InviteMemberRequest, InviteMemberResponse } from 'src/pages/server/_types/type';
import { useLocation } from 'react-router-dom';

export default function InviteMemberModal({ closeModal, isOpen }: ModalProps) {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [memberEmail, setMemberEmail] = useState<string>('');
  const location = useLocation();
  const serverId = location.pathname.split('/')[2];

  const mutation = useMutationPost<InviteMemberResponse, InviteMemberRequest>(
    `/chat/v1/server/${serverId}/inviteMember`,
  );

  const onInviteMember: FormEventHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (memberEmail === '') {
      setErrorMsg('초대할 유저의 이메일을 입력해주세요');
      return;
    }
    setMemberEmail('');

    // 생성로직
    mutation.mutate({ inviterId: 2, inviteeEmail: memberEmail });
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalContainer>
        <ModalForm onSubmit={onInviteMember}>
          <ModalTitle>멤버 초대하기</ModalTitle>
          <EssentialInput
            errorMessage={errorMsg}
            labelName='초대할 멤버 이메일 입력'
            state={memberEmail}
            setState={setMemberEmail}
          />
          <ModalButtons closeClick={closeModal} ctaText={'초대'} type='submit' closeText='취소' />
        </ModalForm>
      </ModalContainer>
    </Modal>
  );
}
