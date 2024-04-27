import ChangePasswordForm from '../_components/ChangePasswordForm';
import Header from '/components/sign/Header';
import { Area, Container } from '/components/sign/CommonStyles';

export default function ChangePassword() {
  return (
    <Area>
      <Container>
        <Header>비밀번호 변경</Header>
        <ChangePasswordForm />
      </Container>
    </Area>
  );
}
