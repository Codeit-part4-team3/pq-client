import { Link } from 'react-router-dom';
import SocialButtons from './_components/SocialButtons';
import SignupForm from './_components/SignupForm';
import Line from '/components/sign/Line';
import Header from '/components/sign/Header';
import { Area, Container, Prompt } from '/components/sign/CommonStyles';

export default function EmailSignup() {
  return (
    <Area>
      <Container>
        <Header>회원가입</Header>
        <SignupForm />
        <Line />
        <SocialButtons />
        <Prompt>
          이미 계정이 있으신가요? <Link to='/login'>로그인 하러가기</Link>
        </Prompt>
      </Container>
    </Area>
  );
}
