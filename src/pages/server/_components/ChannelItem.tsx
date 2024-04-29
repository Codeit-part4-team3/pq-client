import styled from 'styled-components';
import { ChannelItemProps } from '../_types/props';

export default function ChannelItem({ data }: ChannelItemProps) {
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
