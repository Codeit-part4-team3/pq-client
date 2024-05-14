import styled from 'styled-components';
import { useRef, useState } from 'react';
import { ButtonIcon } from '../../../GlobalStyles';
import { ChannelGroupProps } from '../_types/props';
import CreateChannelModal from 'src/components/modal/contents/CreateChannelModal';
import { useOpenModal } from 'src/hooks/useOpenModal';
import { useLocation } from 'react-router-dom';
import { useMutationDelete, useMutationPatch } from 'src/apis/service/service';
import { ChannelRequest, ChannelResponse } from '../_types/type';
import DeleteCategoryModal from 'src/components/modal/contents/DeleteCategoryModal';

export default function ChannelGroup({ data, children }: ChannelGroupProps) {
  const path = useLocation();
  const bodyRef = useRef<HTMLDivElement>(null);
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [updateName, setUpdateName] = useState<string>('');
  const { isOpen, openModal, closeModal } = useOpenModal();
  const serverId = path.pathname.split('/')[2];

  const deleteMutation = useMutationDelete(`/chat/v1/server/${serverId}/channel/${data.id}`);
  const patchMutation = useMutationPatch<ChannelResponse, ChannelRequest>(
    `/chat/v1/server/${serverId}/channel/${data.id}`,
  );

  const handleDeleteModal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setIsToggle(true);
    setIsToggle(true);
  };

  const handleDelete = async () => {
    await deleteMutation.mutate();
    setIsToggle(false);
  };

  const onClickDropDown = () => {
    const style = bodyRef.current?.style;
    if (style) style.display = style.display === 'none' ? 'block' : 'none';
  };

  const handleUpdate = async () => {
    setIsToggle(false);
    setIsUpdate(!isUpdate);
    setIsToggle(false);
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsUpdate(false);
      patchMutation.mutate({ name: updateName });
    }
    if (e.key === 'Escape') {
      setIsUpdate(false);
      setUpdateName('');
    }
    if (e.key === 'Escape') {
      setIsUpdate(false);
      setUpdateName('');
    }
  };

  return (
    <Area>
      <Wrapper>
        <Title>
          <DropDownButton data-testid='channel-dropdown' onClick={onClickDropDown} />
          <span>{data?.name}</span>
          <InputChannel
            value={updateName}
            isUpdate={isUpdate}
            onKeyDown={handleKeydown}
            onChange={(e) => setUpdateName(e.target.value)}
            placeholder='취소는 ESC / 저장은 Enter'
          />
        </Title>
        <ButtonGroup>
          <CloseButton onClick={handleDeleteModal} />
          <UpdateButton onClick={handleUpdate} />
          <PlusButton type='button' onClick={openModal} />
        </ButtonGroup>
        <CreateChannelModal isOpen={isOpen} closeModal={closeModal} groupId={data.id} />
        <DeleteCategoryModal
          closeModal={() => setIsToggle(false)}
          isOpen={isToggle}
          categoryName={`${data.name} 카테고리` || '카테고리'}
          onDelete={handleDelete}
        />
      </Wrapper>
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

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Body = styled.div`
  width: 100%;
  padding-left: 8px;

  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Title = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  gap: 4px;

  position: relative;

  & > button {
    display: block;
  }
`;

const DropDownButton = styled(ButtonIcon)`
  background-image: url('/images/arrow-down.svg');
`;

const Button = styled(ButtonIcon)`
  width: 20px;
  height: 20px;

  border: none;
  background-color: transparent;
  background-size: cover;
  background-position: center;
  transition: 0.2s;
  display: none;

  &:hover {
    cursor: pointer;
  }
`;

const PlusButton = styled(ButtonIcon)`
  background-image: url('/images/plus_white.svg');
`;

const CloseButton = styled(Button)`
  background-image: url('/images/close.png');
`;

const UpdateButton = styled(Button)`
  background-image: url('/images/edit.png');
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;

  &:hover {
    & > * {
      display: block;
    }
  }
`;

const InputChannel = styled.input<{ isUpdate: boolean }>`
  width: 160px;
  height: 100%;

  background-color: var(--primary_light_color);
  color: #d9d9d9;
  font-size: 12px;
  display: ${(props) => (props.isUpdate ? 'block' : 'none')};

  position: absolute;
  top: 0;
  left: 24px;
`;
