import styled from 'styled-components';
import { DeleteParagraph, ModalContainer, ModalTitle } from '../CommonStyles';
import ModalButtons from '../button/ModalButtons';
import Modal from '../modal';
import { ModalProps } from 'src/types/modalType';
import useUserStore from 'src/store/userStore';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { USER_URL } from 'src/constants/apiUrl';
import { useMutationPut } from 'src/apis/service/service';
import { RequestUserState, UserInfo } from 'src/types/userType';

export default function LogoutModal({ closeModal, isOpen }: ModalProps) {
  const { setAccessToken, setUserInfo } = useUserStore();
  const navigete = useNavigate();

  const LogoutMutation = useMutationPut<UserInfo, RequestUserState>(`${USER_URL.USER}/me/state/update`);

  const onLogout = async () => {
    LogoutMutation.mutate(
      { state: '오프라인' },
      {
        onSuccess: async () => {
          await Cookies.remove('refreshToken');
          await setAccessToken('');
          await setUserInfo({ id: 0, email: '', nickname: '', state: '' });
          navigete('/');
        },
      },
    );
    closeModal();
  };
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalContainer>
        <ModalTitle>로그아웃</ModalTitle>
        <Paragraph>로그아웃 하시겠습니까?</Paragraph>
        <ModalButtons
          closeClick={closeModal}
          onClick={onLogout}
          ctaText='로그아웃'
          $bgColor='red'
          $hoverColor='#BA1A1A'
        />
      </ModalContainer>
    </Modal>
  );
}

const Paragraph = styled(DeleteParagraph)`
  width: 400px;
`;
