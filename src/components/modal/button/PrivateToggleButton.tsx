import styled from 'styled-components';

interface Props {
  title: string;
  state: boolean;
  toggleClick: () => void;
}

export default function PrivateToggleButton({ title, state, toggleClick }: Props) {
  return (
    <Area>
      <PrivateBox>
        {title}
        <ToggleButton onClick={toggleClick} type='button'>
          {state ? (
            <img src='/images/toggle-on.svg' alt='비공개 토글 활성화' />
          ) : (
            <img src='/images/toggle-off.svg' alt='공개 토글 활성화' />
          )}
        </ToggleButton>
      </PrivateBox>
      <Paragraph>초대를 받은 일부 사람만 참여할 수 있음</Paragraph>
    </Area>
  );
}

const Area = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PrivateBox = styled.div`
  display: flex;
  justify-content: space-between;
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Paragraph = styled.p`
  margin: 0;
  color: #666;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ToggleButton = styled.button`
  background-color: #fff;
  border: none;
`;
