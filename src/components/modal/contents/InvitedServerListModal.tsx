import { ModalProps } from 'src/types/modalType';
import Modal from '../modal';
import { ModalContainer, ModalForm, ModalTitle } from '../CommonStyles';
import { useMutationPost, useQueryGet } from 'src/apis/service/service';
import { InvitedServerRequest, InvitedServerResponse } from 'src/pages/server/_types/type';
import useUserStore from 'src/store/userStore';
import { useEffect } from 'react';
import styled from 'styled-components';

export default function InvitedServerListModal({ closeModal, isOpen }: ModalProps) {
  const { userInfo } = useUserStore();
  const userId = userInfo.id;

  const { data, refetch } = useQueryGet<InvitedServerResponse[]>(
    `getInvitedServerList`,
    `/chat/v1/server/invitedServer?userId=${userId}`,
  );

  const mutation = useMutationPost<InvitedServerResponse, InvitedServerRequest>(
    `/chat/v1/server/invitedServer?userId=${userId}`,
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const onInvite = async (inviteId: number, isAccept: boolean) => {
    mutation.mutate({ inviteId, isAccept });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalContainer>
        <ModalForm onSubmit={onSubmit}>
          <ModalTitle>초대받은 서버목록</ModalTitle>
          <InviteList>
            <InviteItem>
              <TextContainer>
                <div>서버 이름</div>
                <div>초대한 사람</div>
              </TextContainer>
            </InviteItem>
            {data?.map((server) => {
              if (!server) return null;
              return (
                <InviteItem>
                  <TextContainer>
                    <div>{`▪️ ${server.serverName}`}</div>
                    <div>{`✉️ ${server.inviterName}`}</div>
                  </TextContainer>
                  <ButtonContainer>
                    <Button onClick={() => onInvite(server.inviteId, true)}>수락</Button>
                    <Button onClick={() => onInvite(server.inviteId, false)}>거절</Button>
                  </ButtonContainer>
                </InviteItem>
              );
            })}
          </InviteList>
        </ModalForm>
      </ModalContainer>
    </Modal>
  );
}

const InviteItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const InviteList = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  color: black;
  gap: 5px;

  & > div {
    width: 160px;
    flex: 1;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  & > * {
    color: white;
    background-color: #007aff;

    &:hover {
      background-color: #0056b3;
    }
  }

  :last-child {
    color: black;
    background-color: #d9d9d9;

    &:hover {
      background-color: #b3b3b3;
    }
  }
`;

const Button = styled.button`
  border-radius: 5px;
  cursor: pointer;
  border: none;
  font-size: 14px;
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;
