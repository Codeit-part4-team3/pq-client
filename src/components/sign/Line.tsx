import styled from 'styled-components';

export default function Line() {
  return (
    <HorizontalLine>
      <img src='/images/line.svg' />
      <span>or</span>
      <img src='/images/line.svg' />
    </HorizontalLine>
  );
}

const HorizontalLine = styled.div`
  font-size: 12px;

  display: flex;
  gap: 16px;
  margin: 50px 0px;
`;
