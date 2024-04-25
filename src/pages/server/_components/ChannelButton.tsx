import styled from 'styled-components';
import { ChannelItem } from '../_types/type';

interface ChannelButtonProps {
  data: ChannelItem;
}

export default function ChannelButton({ data }: ChannelButtonProps) {
  return (
    <Button>
      <span>{`# ${data.name}`}</span>
    </Button>
  );
}

const Button = styled.button`
  width: 100%;
  height: 36px;

  border-radius: 5px;
  border: none;
  background-color: transparent;

  text-align: left;

  &:hover {
    cursor: pointer;
    background-color: #d7eaff;
  }
`;
