import styled from 'styled-components';

export default function ChatDayDivider({ ChatDayDividerDay }: { ChatDayDividerDay: string }) {
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
  width: 135px;
  height: 25px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 19.2px */

  border-radius: 12px;
  border: 1px solid #ccc;
`;
