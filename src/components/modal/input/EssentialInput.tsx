import styled from 'styled-components';
import { EssentialSpan, ModalInputBox, ModalInputLabel, NameInput } from '../CommonStyles';

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

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
`;
