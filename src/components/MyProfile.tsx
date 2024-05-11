import styled from 'styled-components';
import { useState } from 'react';
import MyDropDown from './dropdown/MyDropDown';
import InvitedServerListModal from './modal/contents/InvitedServerListModal';
import { MyDropdownType } from 'src/constants/enum';
import useUserStore from 'src/store/userStore';
import { ProfileImage, ProfileImageWrapper } from 'src/GlobalStyles';
import LogoutModal from './modal/contents/LogoutModal';
import MyPageModal from './modal/contents/MyPageModal';
import SubscriptionModal from './modal/contents/SubscriptionModal';

/**
 * get user profile image, status, and user id
 */
export default function MyProfile() {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [dropdownType, setDropdownType] = useState<MyDropdownType>(MyDropdownType.INVITED_SERVER_LIST);

  const { userInfo } = useUserStore();

  const handleCloseModal = () => {
    setIsShow(false);
    setIsDropdown(false);
  };

  const toggleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const handleSelectItem = (item: MyDropdownType) => {
    setIsShow(true);
    setDropdownType(item);
  };

  return (
    <>
      <Area>
        <Wrapper>
          <ProfileImageWrapper>
            <ProfileImage imageUrl={userInfo.imageUrl as string} onClick={toggleDropdown} />
          </ProfileImageWrapper>
          <InfoWrapper>
            <strong>{userInfo.nickname}</strong>
            <div>
              <Status />
              <div>{userInfo.state}</div>
            </div>
          </InfoWrapper>
          <MyDropDown isDropDown={isDropdown} selectItem={handleSelectItem} />
        </Wrapper>
      </Area>
      {
        {
          [MyDropdownType.INVITED_SERVER_LIST]: (
            <InvitedServerListModal closeModal={handleCloseModal} isOpen={isShow} />
          ),
          [MyDropdownType.LOGOUT]: <LogoutModal closeModal={handleCloseModal} isOpen={isShow} />,
          [MyDropdownType.MYPAGE]: <MyPageModal closeModal={handleCloseModal} isOpen={isShow} />,
          [MyDropdownType.SUBSCRIPTION]: <SubscriptionModal closeModal={handleCloseModal} isOpen={isShow} />,
        }[dropdownType]
      }
    </>
  );
}

const Area = styled.div`
  width: 100%;
  height: 60px;

  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);

  position: relative;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
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
