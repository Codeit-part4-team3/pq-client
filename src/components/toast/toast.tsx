import useToastStore from 'src/store/toastStore';
import styled, { keyframes } from 'styled-components';

export default function Toasts() {
  const { toasts, removeToast } = useToastStore();

  return (
    <ToastsContainer>
      {toasts.map((toast) => (
        <Toast key={toast.id} onClick={() => removeToast(toast.id)}>
          {toast.message}
        </Toast>
      ))}
    </ToastsContainer>
  );
}

const fadeIn = keyframes`
  from { transform: translateX(-50%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const ToastsContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
`;

const Toast = styled.div`
  background: linear-gradient(135deg, #6a82fb, #fc5c7d);
  color: white;
  padding: 10px 20px;
  margin-bottom: 10px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation:
    ${fadeIn} 0.3s,
    ${fadeOut} 0.3s 2.7s forwards;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;
