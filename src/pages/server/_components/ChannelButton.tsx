import styled from 'styled-components';

export default function ChannelButton() {
  return (
    <Button>
      <strong># 채팅방 이름</strong>
    </Button>
  );
}

const Button = styled.button`
  width: 232px;
  height: 32px;

  border-radius: 5px;
  border: none;
  background-color: transparent;

  &:hover {
    cursor: pointer;
    background-color: #d7eaff;
  }
`;
