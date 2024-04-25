import styled from 'styled-components';
import { ButtonIcon } from '../../../GlobalStyles';

export default function CalendarContainer() {
  return (
    <CalendarArea>
      <CalenderButton />
      <span>일정</span>
    </CalendarArea>
  );
}

const CalendarArea = styled.section`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  gap: 8px;
`;

const CalenderButton = styled(ButtonIcon)`
  background-image: url('/images/calendar.svg');
`;
