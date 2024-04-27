import styled from 'styled-components';

export default function TermOfUse() {
  return (
    <TermsOfUse>
      <TermsOfUseInput type='checkbox' />
      <TermsOfUseLabel>이용약관에 동의합니다.</TermsOfUseLabel>
    </TermsOfUse>
  );
}

const TermsOfUse = styled.label`
  display: flex;
  gap: 4px;

  margin-top: 18px;
  margin-bottom: 16px;
`;

const TermsOfUseInput = styled.input`
  width: 18px;
  height: 18px;
`;

const TermsOfUseLabel = styled.label`
  font-size: 10px;
  color: #666;

  display: flex;
  align-items: center;
`;
