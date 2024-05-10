import { ButtonIcon } from 'src/GlobalStyles';
import CalenderModal from 'src/components/modal/contents/CalenderModal';
import { useOpenModal } from 'src/hooks/useOpenModal';
import styled from 'styled-components';

export default function CalendarContainer() {
  const { isOpen, openModal, closeModal } = useOpenModal();
  return (
    <Area>
      <Button type='button' onClick={openModal} />
      <span>일정</span>
      <CalenderModal isOpen={isOpen} closeModal={closeModal} />
    </Area>
  );
}

const Area = styled.section`
  width: 100%;
  position: relative;
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
