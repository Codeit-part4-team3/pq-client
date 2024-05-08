import { ButtonIcon } from 'src/GlobalStyles';
import styled from 'styled-components';

interface Props {
  isEnabled: boolean;
  title: string;
  desc: string;
  state: boolean;
  toggleClick: () => void;
}

export default function ToggleButton({ isEnabled, title, desc, state, toggleClick }: Props) {
  return (
    <Area enabled={isEnabled}>
      <PrivateBox>
        {title}
        <Button onClick={toggleClick} type='button' state={state} />
      </PrivateBox>
      <Paragraph>{desc}</Paragraph>
    </Area>
  );
}

const Area = styled.section<{ enabled: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: ${(props) => (props.enabled ? 'auto' : 'none')};
  opacity: ${(props) => (props.enabled ? 1 : 0.5)};
`;

const PrivateBox = styled.div`
  display: flex;
  justify-content: space-between;
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Paragraph = styled.p`
  margin: 0;
  color: #666;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Button = styled(ButtonIcon)<{ state: boolean }>`
  width: 48px;
  height: 24px;

  background-image: url(${(props) => (props.state ? '/images/toggle-on.svg' : '/images/toggle-off.svg')});
`;
