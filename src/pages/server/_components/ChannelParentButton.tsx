import styled from 'styled-components';
import { ChannelParentItem } from '../_types/type';

interface ChannelParentButtonProps {
  data: ChannelParentItem;
  children: React.ReactNode;
}

export default function ChannelParentButton({ data, children }: ChannelParentButtonProps) {
  return (
    <Button>
      <strong>{data.name}</strong>
      {children}
    </Button>
  );
}

const Button = styled.button`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  border: none;
  background-color: transparent;

  &:hover {
    cursor: pointer;
    background-color: #d7eaff;
  }
`;
