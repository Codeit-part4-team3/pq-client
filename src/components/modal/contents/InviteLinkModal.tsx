import { ModalProps } from 'src/types/modalType';
import Modal from '../modal';
import { ModalContainer } from '../CommonStyles';
import { InviteLinkResponse } from '../../../pages/server/_types/type';
import { useQueryGet } from 'src/apis/service/service';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { APP_ORIGIN } from 'src/constants/apiUrl';

interface Props extends ModalProps {
  serverId: number;
}

export default function InviteLinkModal({ closeModal, isOpen, serverId }: Props) {
  const [msg, setMsg] = useState<string>('');
  const { refetch, data } = useQueryGet<InviteLinkResponse>('inviteLink', `/chat/v1/server/${serverId}/inviteLink`, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const onClipBoard = () => {
    navigator.clipboard.writeText(`${APP_ORIGIN}/invite/${data?.inviteLink}`).then(() => {
      setMsg('링크 복사 완료');
    });
  };

  useEffect(() => {
    refetch();
    setMsg('');
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalContainer>
        <Body>
          <Top>
            <strong>초대 링크</strong>
            <span>{msg}</span>
          </Top>
          <LinkContainer>
            <span>{`${APP_ORIGIN}/invite/${data?.inviteLink}`}</span>
            <button onClick={onClipBoard}>복사</button>
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

  & > span {
    font-size: 14px;
    color: #007aff;
  }
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
