import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FormInput from './_components/FormInput';
import Button from '../../components/Button/Button';
import SocialButtons from './_components/SocialContainer';

export default function Login() {
  return (
    <Area>
      <Container>
        <Header>
          <Logo src='src/assets/images/logo.svg' />
          로그인
        </Header>

        <Form>
          <InputContainer>
            <FormInput type='text' placeholder='이메일을 입력해주세요.' id='email' label='이메일' />
            <FormInput type='password' placeholder='비밀번호를 입력해주세요.' id='password' label='비밀번호' />
          </InputContainer>

          <Button type='submit' variant='primary' size='L'>
            로그인
          </Button>
        </Form>

        <Prompt>
          비밀번호를 잊으셨나요? <Link to='/login'>PW 찾기</Link>
        </Prompt>

        <Line>
          <img src='src/assets/images/line.svg' />
          <span>or</span>
          <img src='src/assets/images/line.svg' />
        </Line>

        <SocialButtons />

        <Prompt>
          아직 계정이 없으신가요? <Link to='/signup'>회원가입 하러가기</Link>
        </Prompt>
      </Container>
    </Area>
  );
}

const Area = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;

  font-weight: 400;
  font-family: Inter;
  line-height: 160%;

  background-color: #fff;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
`;

const Form = styled.form``;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

const Prompt = styled.p`
  font-size: 14px;
  margin: 20px 0 0 0;
`;

const Line = styled.div`
  font-size: 12px;

  display: flex;
  gap: 16px;
  margin: 50px 0px;
`;

const Logo = styled.img`
  padding: 8px 12px;

  border-radius: 10px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);

  font-style: normal;
`;

const Header = styled.h1`
  font-size: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 60px;
`;
