import styled from 'styled-components';
import groupSvg from '../../../public/images/group_FILL0_wght200_GRAD0_opsz24 1.svg';
import tagSvg from '../../../public/images/tag_FILL0_wght200_GRAD0_opsz24 11.svg';

export default function ChannelHeader() {
  return (
    <Wrapper>
      <LeftBox>
        <ChannelName>
          <img src={tagSvg} width={24} height={24} alt='채널 이름 태그 이미지' />
          <span>{'채팅방 이름1'}</span>
        </ChannelName>
        <ChannelDescription>{'채팅방 이름1을 소개하는 설명입니다.'}</ChannelDescription>
      </LeftBox>
      <RightBox>
        <ChannelParticipants type='button'>
          <img src={groupSvg} width={20} height={20} alt='채널 참여자 수 이미지' />
          <span>{'5명'}</span>
        </ChannelParticipants>
      </RightBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-bottom: 1px solid #ccc;
  width: 100%;
  height: 48px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

const LeftBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 12px;
`;

const ChannelName = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 25.6px */
`;

const ChannelDescription = styled.div`
  color: #999;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 25.6px */
`;

const RightBox = styled.div`
  margin-right: 9px;
`;

const ChannelParticipants = styled.button`
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 66px;
  height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  gap: 8px;
  background-color: #fff;
  color: #666;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */

  cursor: pointer;
`;
