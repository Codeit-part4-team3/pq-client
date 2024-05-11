import { ModalProps } from 'src/types/modalType';
import Modal from '../modal';
import { ModalContainer } from '../CommonStyles';
import { GetInviteLinkResponse } from '../../../pages/server/_types/type';
import { useQueryGet } from 'src/apis/service/service';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { APP_ORIGIN } from 'src/constants/apiUrl';

interface Props extends ModalProps {
  serverId: number;
}

export default function InviteLinkModal({ closeModal, isOpen, serverId }: Props) {
  const [msg, setMsg] = useState<string>('');
  const { refetch, data } = useQueryGet<GetInviteLinkResponse>('inviteLink', `/chat/v1/server/${serverId}/inviteLink`);

  const linkUrl = `${APP_ORIGIN}/login/invite/${data?.inviteLink}`;

  const onClipBoard = () => {
    navigator.clipboard.writeText(`${linkUrl}`).then(() => {
      setMsg('링크 복사 완료');
    });
  };

  useEffect(() => {
    refetch();
    setMsg('');
  }, [serverId]);

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalContainer>
        <Body>
          <Top>
            <strong>초대 링크</strong>
            <span>{msg}</span>
          </Top>
          <LinkContainer>
            <span>{`${linkUrl}`}</span>
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
    overflow: scroll;
    padding-left: 5px;

    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  & > button {
    width: 57px;
    height: 30px;

    color: white;
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
