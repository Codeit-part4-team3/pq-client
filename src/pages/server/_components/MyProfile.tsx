import styled from 'styled-components';
import { UserIdContext } from '../Server';
import { useContext } from 'react';

export default function MyProfile() {
  const user = useContext<number>(UserIdContext);

  return (
    <Area>
      <Wrapper>
        <ImageWrapper>
          <Image />
        </ImageWrapper>
        <InfoWrapper>
          <strong>{user}</strong>
          <div>
            <Status />
            <div>온라인</div>
          </div>
        </InfoWrapper>
      </Wrapper>
    </Area>
  );
}

const Area = styled.div`
  width: 100%;
  height: 60px;

  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
`;

const Wrapper = styled.div`
  /* width: 100%; */
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const ImageWrapper = styled.div`
  width: 60px;
  height: 60px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
`;

const Image = styled.img`
  width: 70%;
  height: 70%;

  border-radius: 50%;
  overflow: hidden;
  background-size: cover;
  background-image: url('/images/minji-profile-image.png');

  &:hover {
    cursor: pointer;
  }
`;

const InfoWrapper = styled.div`
  width: 120px;
  height: 60px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
  }
`;

const Status = styled.div`
  width: 10px;
  height: 10px;
  background-color: #00cc00;
  border-radius: 50%;
`;
