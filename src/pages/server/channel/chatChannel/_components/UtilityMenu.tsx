import styled from 'styled-components';

import fileAttachmentSvg from '../../../../../../public/images/attachment_FILL0_wght200_GRAD0_opsz24 1.svg';

export default function UtilityMenu() {
  return (
    <Wrapper>
      <Item>
        <img src={fileAttachmentSvg} alt='fileAttachment' width={20} height={20} />
        <span>파일 업로드</span>
      </Item>
      <Item>
        <img src={fileAttachmentSvg} alt='fileAttachment' width={20} height={20} />
        <span>파일 업로드</span>
      </Item>
      <Item>
        <img src={fileAttachmentSvg} alt='fileAttachment' width={20} height={20} />
        <span>파일 업로드</span>
      </Item>
      <Item>
        <img src={fileAttachmentSvg} alt='fileAttachment' width={20} height={20} />
        <span>파일 업로드</span>
      </Item>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-radius: 8px;
  border-bottom: 0.5px solid #eee;

  gap: 10px;
  background: var(--material-theme-ref-secondary-secondary100, #fff);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

  position: absolute;
  right: -1px;
  bottom: 27px;
`;

const Item = styled.div`
  padding: 5px 8px;
  display: flex;
  gap: 8px;
  white-space: nowrap;
  color: var(--gray-666666, #666);
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:hover {
    background-color: #edf0ff;
  }

  &:active {
    background-color: #d8e2ff;
  }
`;
