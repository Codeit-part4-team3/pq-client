import styled from 'styled-components';
import { ButtonEmphasis, ButtonNormal } from 'src/GlobalStyles';
import { useOpenModal } from 'src/hooks/useOpenModal';
import CreateServerModal from 'src/components/modal/contents/CreateServerModal';
import JoinServerModal from 'src/components/modal/contents/JoinServerModal';

interface Props {
  isCreateServer: boolean;
  openCreateServer: () => void;
  closeCreateServer: () => void;
}

export default function NotFoundServer({ isCreateServer, openCreateServer, closeCreateServer }: Props) {
  const { isOpen: isJoinServer, openModal: openJoinServer, closeModal: closeJoinServer } = useOpenModal();
  return (
    <Area>
      <Body>
        <Thumbnail>
          <TextThumb>X</TextThumb>
        </Thumbnail>
        <Desc>
          <p>아직 서버가 없어요.</p>
          <p>초대 받은 서버에 참가하거나 직접 생성해보세요.</p>
        </Desc>
        <ButtonContainer>
          <TopButton onClick={openJoinServer}>서버 찾아보기</TopButton>
          <BottomButton onClick={openCreateServer}>서버 생성하기</BottomButton>
        </ButtonContainer>
      </Body>
      <CreateServerModal isOpen={isCreateServer} closeModal={closeCreateServer} />
      <JoinServerModal isOpen={isJoinServer} closeModal={closeJoinServer} />
    </Area>
  );
}

const Area = styled.section`
  width: 100%;
  height: 100vh;

  background-color: var(--landing_background_color);

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

  background-image: url('/images/landing.webp');
  background-size: cover;
  background-position: center;

  margin-bottom: 60px;
  position: relative;
`;

const TextThumb = styled.div`
  color: #ff0000;
  font-size: 10rem;
  font-family: 'Jua', sans-serif;
  transform: translate(-50%, -50%);

  position: absolute;
  top: 50%;
  left: 50%;
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
