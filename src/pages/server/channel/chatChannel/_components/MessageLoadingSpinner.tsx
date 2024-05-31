import styled, { keyframes } from 'styled-components';
import { MessageLoadingSpinnerProps } from '../../_types/props';

export default function MessageLoadingSpinner({ infiniteScrollTriggerRef, lastKey }: MessageLoadingSpinnerProps) {
  return (
    <>
      {lastKey ? (
        <ChatLoadingSpinner ref={infiniteScrollTriggerRef}>
          <Spinner delay='0s' />
          <Spinner delay='0.2s' />
          <Spinner delay='0.4s' />
        </ChatLoadingSpinner>
      ) : null}
    </>
  );
}

const ChatLoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const Spinner = styled.div<{ delay: string }>`
  margin: 8px;
  width: 12px;
  height: 12px;
  background-color: var(--black_000000);
  border-radius: 50%;
  animation: ${bounce} 1s infinite;
  animation-delay: ${(props) => props.delay};
`;
