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
      {isDropDown && <ServerDropDown toggleDropDown={toggleDropDown} />}
    </Area>
  );
}

const Area = styled.section`
  position: relative;
  margin: -10px 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 260px;
  height: 48px;

  flex-shrink: 0;
  border-right: 1px solid #ccc;

  border-bottom: 1px solid #ccc;

  background: var(--Schemes-On-Primary, #fff);
`;

const H2 = styled.h2`
  color: #000;
  padding: 11px 12px;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
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
