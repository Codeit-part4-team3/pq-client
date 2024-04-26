import styled from 'styled-components';
import { scaleAnim } from '../../GlobalStyles';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { ButtonSettings } from '../../types/buttonType';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonSettings {
  icon?: ReactNode;
  children?: ReactNode;
  appendix?: ReactNode;
}

export default function Button({
  icon = <span></span>,
  children,
  appendix = <span></span>,
  type,
  isActive = true,
  variant,
  size,
  ...props
}: Props) {
  return (
    <BaseButton type={type} isActive={isActive} variant={variant} size={size} {...props}>
      {icon}
      <strong>{children}</strong>
      {appendix}
    </BaseButton>
  );
}

const BaseButton = styled.button<ButtonSettings>`
  ${({ size }) => {
    let buttonWidth;
    let buttonHeight;
    let fontSize;

    switch (size) {
      case 'L':
        buttonWidth = '440px';
        buttonHeight = '40px';
        fontSize = '16px';
        break;
      case 'M':
        buttonWidth = '360px';
        buttonHeight = '48px';
        fontSize = '14px';
        break;
      case 'S':
        buttonWidth = '198px';
        buttonHeight = '47px';
        fontSize = '18px';
        break;
    }

    return `
      width: ${buttonWidth};
      height: ${buttonHeight};
      font-size: ${fontSize};
    `;
  }}

  // 버튼 종류에 따른 스타일(임시)
  ${({ isActive, variant }) => {
    let backgroundColor;
    let textColor;
    let border;

    if (isActive) {
      switch (variant) {
        case 'primary':
          backgroundColor = '#258DFF';
          textColor = '#fff';
          border = 'none';
          break;
        case 'secondary':
          backgroundColor = '#fff';
          textColor = '#000';
          border = '1px solid #F4F4F4';
          break;
        case 'ghost':
          backgroundColor = 'transparent';
          textColor = '#000';
          border = 'none';
          break;
      }
    } else {
      backgroundColor = '#E0E0E0';
      textColor = '#B0B0B0';
      border = '1px solid #ccc';
    }

    return `
    background: ${backgroundColor};
    color: ${textColor};
    border: ${border};
  `;
  }}

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 10px;
  &:hover {
    animation: 0.5s ease-in-out infinite alternate ${scaleAnim};
    cursor: pointer;
  }
`;
