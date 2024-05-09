import { useState } from 'react';
import { ModalProps } from 'src/types/modalType';
import styled from 'styled-components';
import Modal from '../modal';

const daysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

const WEEKS = ['일', '월', '화', '수', '목', '금', '토'];

export default function CalenderModal({ isOpen, closeModal }: ModalProps) {
  const currentDate = new Date();
  const [currentYear, SetCurrentYear] = useState<number>(currentDate.getFullYear());
  const [currentMonth, SetCurrentMonth] = useState<number>(currentDate.getMonth());
  //   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [daysCount, setDaysCount] = useState<number>(daysInMonth(currentYear, currentMonth));
  const [firstDay, setFirstDay] = useState<number>(getFirstDayOfMonth(currentYear, currentMonth));

  const onClick = (day: number) => {
    console.log(day);
  };

  const onMonthChange = (month: number) => {
    console.log('눌림');
    SetCurrentMonth((pre) => pre + month);
    if (currentMonth + month < 0) {
      SetCurrentYear(currentYear - 1);
      SetCurrentMonth(11);
    }
    if (currentMonth + month > 11) {
      SetCurrentYear(currentYear + 1);
      SetCurrentMonth(0);
    }

    setDaysCount(daysInMonth(currentYear, currentMonth + month));
    setFirstDay(getFirstDayOfMonth(currentYear, currentMonth + month));
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <YearMonth>
        {currentYear}.{currentMonth + 1}
      </YearMonth>
      <ButtonBox>
        <Button onClick={() => onMonthChange(-1)}>pre</Button>
        <Button onClick={() => onMonthChange(1)}>next</Button>
      </ButtonBox>

      <Calender>
        {WEEKS.map((week) => (
          <Week key={week}>{week}</Week>
        ))}
        {Array.from({ length: firstDay }).map((_, i) => (
          <Week key={'빈공간' + i}></Week>
        ))}
        {Array.from({ length: daysCount }).map((_, i) => (
          <Day type='button' onClick={() => onClick(i + 1)} key={i + '일'}>
            {i + 1}
            {/* <Circle /> */}
          </Day>
        ))}
      </Calender>
    </Modal>
  );
}
const Calender = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
`;

const Week = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  color: #333;
`;

const Day = styled.button`
  outline: none;
  border: none;
  background-color: #f1f1f1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex-direction: column;
  height: 40px;

  cursor: pointer;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button``;

const YearMonth = styled.h2`
  text-align: center;
  color: #333;
`;

const Circle = styled.div`
  width: 7px;
  height: 7px;
  background-color: #fff;
  content: '';
  border-radius: 50%;
`;
