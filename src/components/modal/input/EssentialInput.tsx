import styled from 'styled-components';

interface Props {
  labelName: string;
  state: string;
  setState: (value: string) => void;
}

export default function EssentialInput({ labelName, state, setState }: Props) {
  return (
    <>
      <Label>
        {labelName}
        <EssentialSpan>*</EssentialSpan>
      </Label>
      <NameInput value={state} onChange={(e) => setState(e.target.value)} />
    </>
  );
}

const Label = styled.label`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const EssentialSpan = styled.span`
  color: #258dff;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const NameInput = styled.input`
  width: 100%;
  padding: 16px;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid #b3b3b3;
  background: #fff;
  &:focus {
    outline: none;
    border: 1px solid #258dff;
  }
`;
