import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import styled from 'styled-components';

const SOCKET_SERVER_URL = 'http://localhost:3003';

// @ToDo: 데이터 베이스에 채팅 메시지를 어떤 구조로 저장할지 정해야함
// interface ChatMessage {
//   id: string;
//   message: string;
//   createdAt: Date;
// }
export default function ChatChannel() {
  const { id: roomName } = useParams();
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const socketRef = useRef<Socket | null>(null);

  // 채팅 메시지 전송
  const sendMessage = (message: string) => {
    socketRef.current?.emit('send_message', message, roomName);
    // 내 채팅창 업데이트
    setMessages((prevMessage) => [...prevMessage, message]);
  };

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);

    // 채팅 채널 입장
    socketRef.current.emit('join_chat_channel', roomName);

    socketRef.current.on('user_joined', (socketId) => {
      console.log(socketId + 'is joined');
    });

    // 채팅 메시지 수신
    socketRef.current.on('receive_message', (message) => {
      setMessages((prevMessage) => [...prevMessage, message]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [roomName]);

  return (
    <>
      <ChannelName>채널명</ChannelName>
      <ChatContainer>
        {messages.length === 0 ? (
          <div>환영합니다!</div>
        ) : (
          messages.map((message, index) => <ChatMessage key={index}>{message}</ChatMessage>)
        )}
      </ChatContainer>
      <ChatForm>
        <ChatInput type='text' value={inputValue} onChange={inputChange} />
        <ChatSubmit
          type='button'
          onClick={() => {
            sendMessage(inputValue);
          }}
        >
          submit
        </ChatSubmit>
      </ChatForm>
    </>
  );
}

const ChannelName = styled.div`
  font-size: 24px;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatMessage = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatForm = styled.form`
  display: flex;
`;

const ChatInput = styled.input``;

const ChatSubmit = styled.button``;
