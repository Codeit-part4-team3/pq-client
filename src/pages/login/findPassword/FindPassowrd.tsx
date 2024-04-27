import { Link } from 'react-router-dom';
import FindPasswordForm from '../_components/FindPasswordForm';
import Header from 'src/components/sign/Header';
import { Area, Container, Prompt } from 'src/components/sign/CommonStyles';

export default function FindPassword() {
  return (
    <Area>
      <Container>
        <Header>비밀번호 찾기</Header>
        <FindPasswordForm />
        <Prompt>
          <Link to='/login'>로그인 하러가기</Link>
        </Prompt>
      </Container>
    </Area>
  );
}
