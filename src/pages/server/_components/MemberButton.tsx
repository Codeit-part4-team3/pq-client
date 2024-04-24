import styled from 'styled-components';

export default function MemberButton() {
  return (
    <Button>
      <strong>구성원 ooo</strong>
    </Button>
  );
}

const Button = styled.button`
  width: 120px;
  height: 20px;

  border-radius: 5px;
  border: none;
  background-color: transparent;

  &:hover {
    cursor: pointer;
    background-color: #d7eaff;
  }
`;
