export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'custom';

export type ButtonSize = 'S' | 'M' | 'L' | 'custom';

export type ButtonSettings = {
  isActive?: boolean;
  variant: ButtonVariant;
  size: ButtonSize;
};

export type SocialVariant = 'google' | 'kakao';
