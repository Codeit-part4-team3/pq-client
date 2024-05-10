import styled from 'styled-components';
import { EssentialSpan, ModalInputLabel } from '../CommonStyles';

interface Props {
  onChange: () => void;
  checked: boolean;
}

export default function ChannelModeInput({ onChange, checked }: Props) {
  return (
    <Wapper>
      <ModalInputLabel>
        채널 유형 <EssentialSpan>*</EssentialSpan>
      </ModalInputLabel>
      <RadioInputBox>
        <RadioInput type='radio' checked={!checked} onChange={onChange} />
        텍스트
      </RadioInputBox>
      <RadioInputBox>
        <RadioInput type='radio' checked={checked} onChange={onChange} />
        음성
      </RadioInputBox>
    </Wapper>
  );
}

const Wapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const RadioInputBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--black-1a1a1a, #1a1a1a);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const RadioInput = styled.input`
  appearance: none; /* 기본 브라우저 스타일 제거 */
  -webkit-appearance: none; /* Safari 및 Chrome 용 */
  -moz-appearance: none; /* Firefox 용 */

  border: 2px solid #b3b3b3; /* 체크박스 테두리 */

  width: 20px;
  height: 20px;
  border-radius: 50%;
  &:checked {
    background-color: white; /* 선택된 경우의 배경색 */
    border: 2px solid #007aff;
  }
  &:checked::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #007aff;
  }
`;
