import styled from 'styled-components';

interface ChatDayDividerProps {
  ChatDayDividerDay: string;
}

export default function ChatDayDivider({ ChatDayDividerDay }: ChatDayDividerProps) {
  return (
    <>
      <Wrapper>
        <ChatDayDividerText>{ChatDayDividerDay}</ChatDayDividerText>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 30px;
`;

const ChatDayDividerText = styled.div`
  border-radius: 12px;
  border: 1px solid var(--gray_CCCCCC);

  display: flex;
  padding: 4px 13px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
