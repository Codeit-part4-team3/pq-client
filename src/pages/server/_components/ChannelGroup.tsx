import styled from 'styled-components';
import { useRef } from 'react';
import { ButtonIcon } from '../../../GlobalStyles';
import { ChannelGroupProps } from '../_types/props';
import CreateChannelModal from 'src/components/modal/contents/CreateChannelModal';
import { useOpenModal } from 'src/hooks/useOpenModal';

export default function ChannelGroup({ data, children }: ChannelGroupProps) {
  const bodyRef = useRef<HTMLDivElement>(null);

  const { isOpen, openModal, closeModal } = useOpenModal();

  const onClickDropDown = () => {
    const style = bodyRef.current?.style;
    if (style) style.display = style.display === 'none' ? 'block' : 'none';
  };

  return (
    <Area>
      <Header>
        <div>
          <DropDownButton data-testid='channel-dropdown' onClick={onClickDropDown} />
          <span>{data?.name}</span>
        </div>
        <PlusButton type='button' onClick={openModal} />
        <CreateChannelModal isOpen={isOpen} closeModal={closeModal} groupId={data.id} />
      </Header>
      <Body ref={bodyRef}>{children}</Body>
    </Area>
  );
}

const Area = styled.div`
  width: 100%;

  border-radius: 5px;
  border: none;
  padding-left: 10px;
  padding-right: 10px;
  background-color: transparent;
  color: var(--text_gray);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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

  display: flex;
  flex-direction: column;
`;

const DropDownButton = styled(ButtonIcon)`
  background-image: url('/images/arrow-down.svg');
`;

const PlusButton = styled(ButtonIcon)`
  background-image: url('/images/plus_white.svg');
`;
