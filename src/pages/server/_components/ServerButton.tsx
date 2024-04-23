import styled from 'styled-components';

export default function ServerButton() {
  return (
    <Button>
      <strong>+</strong>
    </Button>
  );
}

const Button = styled.button`
  width: 48px;
  height: 48px;

  border: 1px solid #cccccc;
  border-radius: 25%;
  background-color: #f1f8ff;

  transition: 0.2s;

  &:hover {
    scale: 1.1;
    cursor: pointer;
  }
`;
