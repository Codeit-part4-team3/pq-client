import styled from 'styled-components';
import useChatChannelIntro from '../_hooks/useChatChannelIntro';

interface ChatChannelIntroProps {
  isNoMoreMessages: boolean;
}

export default function ChatChannelIntro({ isNoMoreMessages }: ChatChannelIntroProps) {
  const { channelData } = useChatChannelIntro();

  return (
    <>
      {isNoMoreMessages ? (
        <Wrapper>
          <ChannelName>{channelData?.name}의 첫 시작 부분이에요</ChannelName>
          <CreationDate>생성일 : {'2024년 04월 11일'}</CreationDate>
        </Wrapper>
      ) : null}
    </>
  );
}

const Wrapper = styled.div`
  margin-top: 495px;
  padding-left: 20px;
`;

const ChannelName = styled.h1`
  color: var(--black_000000);
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
  line-height: 160%; /* 32px */
  margin: 0;
`;

const CreationDate = styled.p`
  color: var(--gray_666666);
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
  margin: 0;
`;
