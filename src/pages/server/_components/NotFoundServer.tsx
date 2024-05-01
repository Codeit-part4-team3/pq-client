import styled from 'styled-components';
import { ButtonEmphasis, ButtonNormal } from 'src/GlobalStyles';
import { useOpenModal } from 'src/hooks/useOpenModal';
import CreateServerModal from 'src/components/modal/contents/CreateServerModal';
import JoinServerModal from 'src/components/modal/contents/JoinServerModal';

interface Props {
  isCreateServer: boolean;
  openCreateServer: () => void;
  CloseCreateServer: () => void;
}

export default function NotFoundServer({ isCreateServer, openCreateServer, CloseCreateServer }: Props) {
  const { isOpen: isJoinServer, openModal: openJoinServer, closeModal: closeJoinServer } = useOpenModal();
  return (
    <Area>
      <Body>
        <Thumbnail />
        <Desc>
          <p>아직 서버가 없어요.</p>
          <p>초대 받은 서버에 참가하거나 직접 생성해보세요.</p>
        </Desc>
        <ButtonContainer>
          <TopButton onClick={openJoinServer}>서버 찾아보기</TopButton>
          <BottomButton onClick={openCreateServer}>서버 생성하기</BottomButton>
        </ButtonContainer>
      </Body>
      <CreateServerModal isOpen={isCreateServer} closeModal={CloseCreateServer} />
      <JoinServerModal isOpen={isJoinServer} closeModal={closeJoinServer} />
    </Area>
  );
}

const Area = styled.section`
  width: 100%;
  height: 100vh;

  border: 1px solid #cccccc;
  background-color: #ffffff;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Body = styled.div`
  width: 360px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Thumbnail = styled.div`
  width: 360px;
  height: 240px;

  background-color: #d9d9d9;

  margin-bottom: 60px;
`;

const Desc = styled.div`
  font-size: 16px;
  text-align: center;
  margin-bottom: 40px;
`;

const ButtonContainer = styled.div`
  width: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 8px;
`;

const TopButton = styled(ButtonNormal)`
  width: 100%;
  height: 48px;
`;

const BottomButton = styled(ButtonEmphasis)`
  width: 100%;
  height: 48px;
`;
