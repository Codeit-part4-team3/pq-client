import CreateCategoryModal from 'src/components/modal/contents/CreateCategoryModal';
import { useOpenModal } from 'src/hooks/useOpenModal';
import styled from 'styled-components';

interface Prorps {
  toggleDropDown: () => void;
}

export default function ServerDropDown({ toggleDropDown }: Prorps) {
  const { isOpen: isCategory, openModal: openCategory, closeModal: closeCategory } = useOpenModal();
  const closeCtegoryModal = async () => {
    await closeCategory();
    toggleDropDown();
  };

  return (
    <Area>
      <Button type='button' onClick={openCategory}>
        카테고리 생성
      </Button>

      <CreateCategoryModal closeModal={closeCtegoryModal} isOpen={isCategory} />
    </Area>
  );
}

const Area = styled.section`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
  top: 48px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px 22px 12px 22px;
  color: #000;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 51.2px */
  background: #fff;
  border: none;
  border-bottom: 1px solid #000;
  text-align: left;
`;
