import styled from 'styled-components';

export default function Line() {
  return (
    <HorizontalLine>
      <HLine />
      <span>or</span>
      <HLine />
    </HorizontalLine>
  );
}

const HorizontalLine = styled.div`
  font-size: 12px;

  display: flex;
  align-items: center;
  gap: 16px;
  margin: 50px 0px;
`;

const HLine = styled.hr`
  width: 200px;
  height: 1px;
  background-color: #d9d9d9;
`;
