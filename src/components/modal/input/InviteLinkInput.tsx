import styled from 'styled-components';
import { ModalInputLabel } from '../CommonStyles';

interface Props {
  link: string;
}

export default function InviteLinkInput({ link }: Props) {
  return (
    <Container>
      <ModalInputLabel>또는 링크로 초대</ModalInputLabel>
      <InputBox>
        <Input readOnly value={link} />
        <Button>복사</Button>
      </InputBox>
    </Container>
  );
}

const Container = styled.section`
  width: 480px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid #b3b3b3;
  background: #fff;
  justify-content: space-between;
  padding: 8px 8px 8px 16px;
`;

const Input = styled.input`
  align-items: flex-start;
  border: none;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  display: flex;
  padding: 9px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  border: none;
  outline: none;
  background: #258dff;
  color: #fff;
`;
