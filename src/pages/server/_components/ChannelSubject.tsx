import styled from 'styled-components';
import { ChannelSubjectItem } from '../_types/type';
import { useRef } from 'react';
import { ButtonIcon } from '../../../GlobalStyles';

interface ChannelSubjectProps {
  data: ChannelSubjectItem;
  children: React.ReactNode;
}

export default function ChannelSubject({ data, children }: ChannelSubjectProps) {
  const bodyRef = useRef<HTMLDivElement>(null);

  const onClickDropDown = () => {
    const style = bodyRef.current?.style;
    if (style) style.display = style.display === 'none' ? 'block' : 'none';
  };

  return (
    <Area>
      <Header>
        <div>
          <DropDownButton data-testid='channel-dropdown' onClick={onClickDropDown} />
          <span>{data.name}</span>
        </div>
        <PlusButton />
      </Header>
      <Body ref={bodyRef}>{children}</Body>
    </Area>
  );
}

const Area = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  border: none;
  background-color: transparent;

  padding: 0;
  margin-bottom: 20px;
`;

const Header = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 5px;

  > * {
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 14px;
    gap: 8px;
  }
`;

const Body = styled.div`
  width: 100%;
  padding-left: 8px;
`;

const DropDownButton = styled(ButtonIcon)`
  background-image: url('/images/arrow-down.svg');
`;

const PlusButton = styled(ButtonIcon)`
  background-image: url('/images/plus.svg');
`;
