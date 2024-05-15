import styled from 'styled-components';
import { ChatDayDividerProps } from '../../_types/props';

export default function ChatDayDivider({ ChatDayDividerDay }: ChatDayDividerProps) {
  return (
    <>
      <Wrapper>
        <HLine />
        <ChatDayDividerText>{ChatDayDividerDay}</ChatDayDividerText>
        <HLine />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;

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

const HLine = styled.div`
  border-top: 1px solid var(--gray_CCCCCC);
  width: 40%;
`;
