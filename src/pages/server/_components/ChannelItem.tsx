import styled from 'styled-components';
import { ChannelItemProps } from '../_types/props';
import { Link } from 'react-router-dom';
import tagSvg from '../../../../public/images/tag_FILL0_wght200_GRAD0_opsz24 3.svg';

export default function ChannelItem({ data }: ChannelItemProps) {
  return (
    <ChannelItemWrapper to={`/server/1/channel/${data.id}`}>
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
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 19.2px */
  text-decoration: none;

  &:hover {
    cursor: pointer;
    background-color: #d7eaff;
  }

  img {
    width: 20px;
    height: 20px;

    margin-left: 6px;
  }
`;
