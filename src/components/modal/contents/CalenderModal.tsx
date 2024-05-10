import { useState, useEffect, useContext } from 'react';
import { ModalProps } from 'src/types/modalType';
import styled from 'styled-components';
import Modal from '../modal';
import { useQueryGet } from 'src/apis/service/service';
import axiosInstance from 'src/apis/instance/axiosInstance';
import DayContainer from './CalenderModal/DayContainer';
import { Event } from './CalenderModal/type/type';
import { ServerIdContext } from 'src/pages/server/Server';
import { daysInMonth, getFirstDayOfMonth } from 'src/utils/dateFuntion';
import { WEEKS } from 'src/constants/calender';

export default function CalenderModal({ isOpen, closeModal }: ModalProps) {
  const currentDate = new Date();
  const [currentYear, SetCurrentYear] = useState<number>(currentDate.getFullYear());
  const [currentMonth, SetCurrentMonth] = useState<number>(currentDate.getMonth());
  const [currentDay, SetCurrentDay] = useState<number>(currentDate.getDate());
  const [events, setEvents] = useState<Event[]>([]);
  const [daysCount, setDaysCount] = useState<number>(daysInMonth(currentYear, currentMonth));
  const [firstDay, setFirstDay] = useState<number>(getFirstDayOfMonth(currentYear, currentMonth));
  const [isDay, setIsDay] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date(currentYear, currentMonth, 1));
  const [endDate, setEndDate] = useState<Date>(new Date(currentYear, currentMonth + 1, 1));

  const serverId = useContext<number>(ServerIdContext);

  const { data, refetch } = useQueryGet<Event[]>(
    'events',
    `/chat/v1/server/events?serverId=${serverId}&startDate=${startDate}&endDate=${endDate}`,
  );

  const onDayClick = async (day: number) => {
    SetCurrentDay(day);
    setIsDay(true);
    const startDate = new Date(currentYear, currentMonth, day);
    const endDate = new Date(currentYear, currentMonth, day);

    axiosInstance.get(`/chat/v1/server/events?serverId=${serverId}&startDate=${startDate}&endDate=${endDate}`);
  };

  const onMonthChange = async (month: number) => {
    SetCurrentMonth((pre) => pre + month);
    if (currentMonth + month < 0) {
      SetCurrentYear(currentYear - 1);
      SetCurrentMonth(11);
    }
    if (currentMonth + month > 11) {
      SetCurrentYear(currentYear + 1);
      SetCurrentMonth(0);
    }

    await setStartDate(new Date(currentYear, currentMonth + month, 1));
    await setEndDate(new Date(currentYear, currentMonth + month + 1, 1));

    setDaysCount(daysInMonth(currentYear, currentMonth + month));
    setFirstDay(getFirstDayOfMonth(currentYear, currentMonth + month));

    refetch();
  };

  useEffect(() => {
    setEvents(data as Event[]);
  }, [data]);

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      {isDay ? (
        <DayContainer
          refetch={refetch}
          setIsDay={setIsDay}
          currentDay={currentDay}
          currentMonth={currentMonth}
          currentYear={currentYear}
        />
      ) : (
        <>
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
              <Day type='button' onClick={() => onDayClick(i + 1)} key={i + '일'}>
                {i + 1}
                {events && events.find((it) => new Date(it.start).getDate() === i + 1) ? <Circle /> : null}
              </Day>
            ))}
          </Calender>
        </>
      )}
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