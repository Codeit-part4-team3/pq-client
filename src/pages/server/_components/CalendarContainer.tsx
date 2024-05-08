import { ButtonIcon } from 'src/GlobalStyles';
import styled from 'styled-components';

export default function CalendarContainer() {
  return (
    <Area>
      <Button />
      <span>일정</span>
    </Area>
  );
}

const Area = styled.section`
  width: 100%;

  padding-left: 10px;
  padding-right: 10px;
  color: var(--text_gray);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  gap: 8px;
`;

const Button = styled(ButtonIcon)`
  background-image: url('/images/calendar.svg');
`;
