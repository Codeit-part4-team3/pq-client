import styled from 'styled-components';

export default function NotFound() {
  return (
    <Wrapper>
      <h1>Not Found Page</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  padding: 0px;
  background-color: var(--landing_background_color);
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 3rem;
  color: var(--primary_text_color);

  & > * {
    font-family: 'Jua', sans-serif;
  }
`;
