import styled from 'styled-components';
import { ChannelItem } from '../_types/type';

interface ChannelButtonProps {
  data: ChannelItem;
}

export default function ChannelButton({ data }: ChannelButtonProps) {
  return (
    <Button>
      <strong>{data.name}</strong>
    </Button>
  );
}

const Button = styled.button`
  width: 100%;
  height: 100%;

  border-radius: 5px;
  border: none;
  background-color: transparent;

  &:hover {
    cursor: pointer;
    background-color: #d7eaff;
  }
`;
