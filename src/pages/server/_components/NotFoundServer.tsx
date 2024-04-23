import styled from 'styled-components';

export default function NotFoundServer() {
  return (
    <NotFoundArea>
      <h1>Server Not Found</h1>
    </NotFoundArea>
  );
}

const NotFoundArea = styled.section`
  width: 100%;
  height: 100vh;

  border: 1px solid #cccccc;

  background-color: #f1f8ff;
`;
