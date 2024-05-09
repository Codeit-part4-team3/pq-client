import { Dispatch, FormEventHandler, SetStateAction, useContext, useEffect, useState } from 'react';
import EssentialInput from '../../input/EssentialInput';
import styled from 'styled-components';
import ModalButtons from '../../button/ModalButtons';
import { ModalContainer, ModalForm, ModalTitle } from '../../CommonStyles';
import axiosInstance from 'src/apis/instance/axiosInstance';
import { Event } from './type/type';
import { useQueryGet } from 'src/apis/service/service';
import { ServerIdContext } from 'src/pages/server/Server';
import { getTimes } from 'src/utils/dateFuntion';

interface Props {
  setIsDay: Dispatch<SetStateAction<boolean>>;
  currentYear: number;
  currentMonth: number;
  currentDay: number;
  refetch: () => void;
}

export default function DayContainer({ currentDay, currentMonth, currentYear, setIsDay, refetch }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [eId, setEId] = useState<number>(0);
  const newStartDate = new Date(currentYear, currentMonth, currentDay, 0, 0, 0, 0).toISOString();
  const newEndDate = new Date(currentYear, currentMonth, currentDay + 1, 0, 0, 0, 0).toISOString();
  const { data, refetch: eventRefetch } = useQueryGet<Event[]>(
    'oneDayEvents',
    `/chat/v1/server/events?serverId=${1}&startDate=${newStartDate}&endDate=${newEndDate}`,
  );

  const serverId = useContext<number>(ServerIdContext);

  const reset = () => {
    setIsUpdate(false);
    setIsEdit(false);
    setTitle('');
    setTime('');
  };

  const onBackButtonClick = () => {
    setEvents([]);
    setIsDay(false);
  };

  const updateButtonClick = (title: string, start: Date, id: number) => {
    setTitle(title);
    setTime(getTimes(start));
    setIsEdit(true);
    setIsUpdate(true);
    setEId(id);
  };

  const deleteButtonClick = async (id: number) => {
    await axiosInstance.delete(`/chat/v1/server/event/delete?eId=${id}`);
    eventRefetch();
    refetch();
  };

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    const startDate = new Date(
      currentYear,
      currentMonth,
      currentDay,
      Number(time.split(':')[0]),
      Number(time.split(':')[1]),
    );
    if (!isUpdate) {
      await axiosInstance.post('/chat/v1/server/event', {
        title,
        start: startDate,
        serverId,
      });
    }

    if (isUpdate) {
      await axiosInstance.put(`/chat/v1/server/event/update?eId=${eId}`, {
        title,
        start: startDate,
        serverId,
      });
    }

    reset();
    eventRefetch();
    refetch();
  };

  useEffect(() => {
    const newData = data?.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
    setEvents(newData || []);
    console.log(newData);
  }, [data]);

  return (
    <>
      {isEdit ? (
        <ModalContainer>
          <ModalTitle>
            {currentYear}.{currentMonth + 1}.{currentDay}
          </ModalTitle>
          <ModalForm onSubmit={onSubmit}>
            <EssentialInput errorMessage='' labelName='일정 이름' state={title} setState={setTitle} />
            <TimeInput type='time' value={time} onChange={(e) => setTime(e.target.value)} />
            <ModalButtons ctaText={isUpdate ? '수정' : '생성'} closeClick={reset} />
          </ModalForm>
        </ModalContainer>
      ) : (
        <ModalContainer>
          <ModalTitle>
            {currentYear}.{currentMonth + 1}.{currentDay}
          </ModalTitle>

          <ScheduleList>
            {events.map((event) => (
              <Schedule key={event.id}>
                <ScheduleTitle>
                  {event.title} <span>{getTimes(event.start)}</span>
                </ScheduleTitle>

                <div>
                  <button type='button' onClick={() => updateButtonClick(event.title, event.start, event.id)}>
                    수정
                  </button>
                  <button type='button' onClick={() => deleteButtonClick(event.id)}>
                    삭제
                  </button>
                </div>
              </Schedule>
            ))}
          </ScheduleList>
          <ModalButtons
            type='button'
            onClick={() => setIsEdit(true)}
            ctaText='일정 생성'
            closeClick={onBackButtonClick}
            closeText='뒤로 가기'
          />
        </ModalContainer>
      )}
    </>
  );
}

const TimeInput = styled.input`
  width: 100%;
  height: 45px;
  font-size: 1rem;
  border: none;
  text-align: center;
`;

const ScheduleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 480px;
  max-height: 400px;
  overflow-y: auto;
  align-items: center;
  justify-content: center;
`;

const Schedule = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background-color: #f0f0f0;
`;

const ScheduleTitle = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  width: 60%;
`;
