import styled from 'styled-components';
import { useEffect, useId, useState } from 'react';
import { ServerItemProps } from '../_types/props';
import { LOCAL_STORAGE_ALRAM_KEY } from 'src/constants/common';

export default function ServerItem({ data, channelDataList, ...rest }: ServerItemProps) {
  const lid = useId();
  const [isAlram, setIsAlram] = useState<boolean>(false);

  useEffect(() => {
    if (!channelDataList) return;

    const interval = setInterval(() => {
      let flag = false;
      for (const channelData of channelDataList) {
        if (localStorage.getItem(`${LOCAL_STORAGE_ALRAM_KEY}:${channelData?.id}`)) {
          flag = true;
          break;
        }
      }
      setIsAlram(flag);
    }, 30);

    return () => {
      clearInterval(interval);
    };
  }, [channelDataList]);

  return (
    <Wrapper>
      <Button key={`${lid}-${data.id}`} {...rest}>
        {data.imageUrl ? (
          <Image imageUrl={data.imageUrl} data-serverid={data.id} />
        ) : (
          <strong data-serverid={data.id}>{data.name}</strong>
        )}
      </Button>
      {isAlram && (
        <Alram>
          <div />
        </Alram>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

const Button = styled.button`
  width: 48px;
  height: 48px;

  border: none;
  border-radius: 50%;
  background-color: var(--landing_background_color);
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  overflow: hidden;

  &:hover {
    border: 3px solid #d9d9d9;
    cursor: pointer;
  }
`;

const Alram = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--primary_basic_color);
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: -2px;
  right: -2px;

  & > div {
    width: 60%;
    height: 60%;

    border-radius: 50%;
    background-color: var(--specific_color);
  }
`;

export const Image = styled.div<{ imageUrl?: string }>`
  width: 100%;
  height: 100%;

  background-image: ${(props) => (props.imageUrl ? `url(${props.imageUrl})` : ``)};
  background-size: cover;
  background-position: center;

  &:hover {
    cursor: pointer;
  }
`;
