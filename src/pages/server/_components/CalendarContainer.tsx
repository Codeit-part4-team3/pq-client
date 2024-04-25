import styled from 'styled-components';
import { ButtonIcon } from '../../../GlobalStyles';

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

  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  gap: 8px;
`;

const Button = styled(ButtonIcon)`
  background-image: url('/images/calendar.svg');
`;
