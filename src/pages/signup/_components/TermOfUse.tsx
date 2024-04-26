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
  font-size: 10px;
  color: #666;

  display: flex;
  align-items: center;
  gap: 4px;

  margin-top: 18px;
  margin-bottom: 16px;
`;

const TermsOfUseInput = styled.input`
  width: 16px;
  height: 16px;
`;

const TermsOfUseLabel = styled.label`
  display: flex;
  align-items: center;
  height: 16px;
`;
