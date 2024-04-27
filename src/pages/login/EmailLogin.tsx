import { Link } from 'react-router-dom';
import SocialButtons from './_components/SocialButtons';
import LoginForm from './_components/LoginForm';
import Line from '/components/sign/Line';
import Header from '/components/sign/Header';
import { Area, Container, Prompt } from '/components/sign/CommonStyles';

export default function EmailLogin() {
  return (
    <Area>
      <Container>
        <Header>로그인</Header>
        <LoginForm />
        <Prompt>
          비밀번호를 잊으셨나요? <Link to='/findPassword'>PW 찾기</Link>
        </Prompt>
        <Line />
        <SocialButtons />
        <Prompt>
          아직 계정이 없으신가요? <Link to='/signup'>회원가입 하러가기</Link>
        </Prompt>
      </Container>
    </Area>
  );
}
