import { useState } from 'react';
import styled from 'styled-components';
import ServerDropDown from './ServerDropDown';

interface Props {
  serverName: string;
}

export default function ServerMenu({ serverName }: Props) {
  const [isDropDown, setIsDropDown] = useState(false);

  const toggleDropDown = () => {
    setIsDropDown((isDropDown) => !isDropDown);
  };

  return (
    <Area>
      <H2>{serverName}</H2>
      <DropDownButton type='button' onClick={toggleDropDown}>
        <img src='/images/arrow-down.svg' alt='arrow-down' />
      </DropDownButton>
      <ServerDropDown isDropDown={isDropDown} toggleDropDown={toggleDropDown} />
    </Area>
  );
}

const Area = styled.section`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 260px;
  height: 48px;

  flex-shrink: 0;

  z-index: 10;
`;

const H2 = styled.h2`
  color: var(--text_gray);
  padding: 11px 12px;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%; /* 25.6px */
`;

const DropDownButton = styled.button`
  margin-right: 12px;
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  cursor: pointer;
`;
