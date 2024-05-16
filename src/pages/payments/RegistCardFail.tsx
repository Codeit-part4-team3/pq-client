import { useNavigate, useSearchParams } from 'react-router-dom';
import { CtaButton } from 'src/GlobalStyles';
import styled from 'styled-components';

export function RegistCardFail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  return (
    <Area className='result wrapper'>
      <Container className='box_section'>
        <h2>카드 등록 실패</h2>
        <Box>
          <p>{`에러 코드: ${searchParams.get('code')}`}</p>
          <p>{`실패 사유: ${searchParams.get('message')}`}</p>
        </Box>
        <Button onClick={() => navigate('/server')}>처음으로 돌아가기</Button>
      </Container>
    </Area>
  );
}

const Area = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Button = styled(CtaButton)`
  width: 30%;
  margin-top: 20px;
`;
