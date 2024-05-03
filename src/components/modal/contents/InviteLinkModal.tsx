import { ModalProps } from 'src/types/modalType';
import Modal from '../modal';
import { ModalContainer } from '../CommonStyles';
import { InviteLinkResponse } from '../../../pages/server/_types/type';
import { useQueryGet } from 'src/apis/service/service';
import { useEffect } from 'react';
import styled from 'styled-components';

interface Props extends ModalProps {
  serverId: number;
}

export default function InviteLinkModal({ closeModal, isOpen, serverId }: Props) {
  const { refetch, data } = useQueryGet<InviteLinkResponse>('inviteLink', `/chat/v1/server/${serverId}/inviteLink`, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  console.log(data);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalContainer>
        <Body>
          <Top>
            <strong>초대 링크</strong>
          </Top>
          <LinkContainer>
            <span>{data?.inviteLink}</span>
            <button>복사</button>
          </LinkContainer>
        </Body>
      </ModalContainer>
    </Modal>
  );
}

const Body = styled.div`
  width: 416px;

  display: flex;
  flex-direction: column;

  gap: 20px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`;

const LinkContainer = styled.span`
  display: flex;
  justify-content: space-between;
  border: 1px solid #cccccc;
  border-radius: 5px;
  padding: 7px;
  gap: 12px;

  & > span {
    width: 328px;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    padding-left: 5px;
  }

  & > button {
    width: 57px;
    height: 30px;

    color: #fff;
    background-color: #007aff;
    border: 0;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;

    &:hover {
      background: #0056b3;
    }
  }
`;
