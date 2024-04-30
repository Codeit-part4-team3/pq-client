import styled from 'styled-components';
import { ModalInputBox, ModalInputLabel, NameInput } from '../CommonStyles';

interface Props {
  labelName: string;
  state: string;
  setState: (value: string) => void;
  errorMessage: string;
}

export default function EssentialInput({ labelName, state, setState, errorMessage }: Props) {
  return (
    <ModalInputBox>
      <ModalInputLabel>
        {labelName}
        <EssentialSpan>*</EssentialSpan>
      </ModalInputLabel>
      <NameInput value={state} onChange={(e) => setState(e.target.value)} />
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </ModalInputBox>
  );
}

const EssentialSpan = styled.span`
  color: #258dff;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
`;
