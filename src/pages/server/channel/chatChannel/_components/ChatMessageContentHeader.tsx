import styled from 'styled-components';

interface ChatMessageContentHeaderProps {
  nickname: string | undefined;
  messageCreatedAt: string;
}

export default function ChatMessageContentHeader({ nickname, messageCreatedAt }: ChatMessageContentHeaderProps) {
  return (
    <Wrapper>
      <Sender>{nickname}</Sender>
      <CreatedAt>{messageCreatedAt}</CreatedAt>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const Sender = styled.div`
  color: var(--black_000000);
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  line-height: 160%; /* 25.6px */
`;

const CreatedAt = styled.div`
  color: var(--gray_666666);
  font-family: Pretendard;
  font-size: 10px;
  line-height: 160%; /* 16px */

  display: flex;
  align-items: center;
`;
