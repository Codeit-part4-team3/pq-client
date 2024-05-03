import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import styled from 'styled-components';

const SOCKET_SERVER_URL = 'https://pqsoft.net:3000';

// @ToDo: 데이터 베이스에 채팅 메시지를 어떤 구조로 저장할지 정해야함
interface Message {
  messageId: string;
  userId: string;
  message: string;
  createdAt: number;
  updatedAt: number;
  status: string;
}

export default function AdminSocketServer() {
  // const { id: roomName } = useParams();
  const roomName = 'admin_chat_channel';
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const socketRef = useRef<Socket | null>(null);

  // 채팅 메시지 전송
  const sendMessage = (message: string, roomName: string) => {
    socketRef.current?.emit('send_message', message, roomName);
    // 내 채팅창 업데이트
  };

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);

    // 채팅 채널 입장
    socketRef.current.emit('join_chat_channel', roomName);

    // 다른 유저가 들어왔을 때 다른 유저가 들어왔다고 로그 찍기
    socketRef.current.on('user_joined', (socketId) => {
      console.log(socketId + 'is joined');
    });

    socketRef.current.on('receive_message', (newMessage: Message) => {
      console.log('new message data : ', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [roomName]);

  return (
    <section>
      <ChannelName>AdminChat</ChannelName>
      <ChatContainer>
        {messages.length === 0 ? (
          <div>환영합니다!</div>
        ) : (
          messages.map((message) => {
            return (
              <ChatMessage key={message.messageId}>
                <div>user:{message.userId}</div>
                <div>message:{message.message}</div>
              </ChatMessage>
            );
          })
        )}
      </ChatContainer>
      <ChatForm>
        <ChatInput type='text' value={inputValue} onChange={inputChange} />
        <ChatSubmit
          type='button'
          onClick={() => {
            sendMessage(inputValue, roomName);
          }}
        >
          submit
        </ChatSubmit>
      </ChatForm>
    </section>
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
  gap: 18px;
`;

const ChatForm = styled.form`
  display: flex;
`;

const ChatInput = styled.input``;

const ChatSubmit = styled.button``;
