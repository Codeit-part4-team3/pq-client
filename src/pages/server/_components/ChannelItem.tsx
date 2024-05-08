import styled from 'styled-components';
import { ChannelItemProps } from '../_types/props';
import { Link, useLocation } from 'react-router-dom';
import tagSvg from '/images/tag_small_white.svg';

export default function ChannelItem({ data }: ChannelItemProps) {
  const path = useLocation();
  const serverId = path.pathname.split('/')[2];

  return (
    <ChannelItemWrapper to={`/server/${serverId}/channel/${data.id}`}>
      <img src={tagSvg} alt='채널 태그 이미지' />
      {data.name}
    </ChannelItemWrapper>
  );
}

const ChannelItemWrapper = styled(Link)`
  border-radius: 5px;
  border: none;
  width: 100%;
  height: 36px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  background-color: transparent;
  color: #d9d9d9;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 19.2px */
  text-decoration: none;

  &:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.2);
  }

  img {
    width: 20px;
    height: 20px;

    margin-left: 6px;
  }
`;
