import { ReactNode, createContext, useContext, useState } from 'react';
import styled from 'styled-components';

// Context에서 사용할 타입 정의
type ToastContextType = {
  addToast: (message: string) => void;
  removeToast: (id: number) => void;
};

type ToastMessage = {
  id: number;
  text: string;
};

// 기본값 정의
const defaultToastContext: ToastContextType = {
  addToast: () => {},
  removeToast: () => {},
};

const ToastContext = createContext<ToastContextType>(defaultToastContext);

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = (message: string) => {
    setMessages((prev) => [...prev, { id: Date.now(), text: message }]);
  };

  const removeToast = (id: number) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer>
        {messages.map((msg) => (
          <ToastMessage key={msg.id} onClick={() => removeToast(msg.id)}>
            {msg.text}
          </ToastMessage>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
`;

const ToastMessage = styled.div`
  background-color: black;
  color: white;
  padding: 10px 20px;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: opacity 0.5s;

  &:hover {
    opacity: 0.9;
  }
`;
