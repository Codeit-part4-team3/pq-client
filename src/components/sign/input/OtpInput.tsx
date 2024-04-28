import styled from 'styled-components';
import { useRef, useState } from 'react';
import { InputNormal } from 'src/GlobalStyles';

// declare type for the props

type OTPInputProps = {
  length?: number;
  onComplete: (pin: string) => void;
};

export default function OTPInput({ length = 6, onComplete }: OTPInputProps) {
  const [OTP, setOTP] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<HTMLInputElement[]>(Array(length).fill(null));

  const handleTextChange = (input: string, index: number) => {
    const newPin = [...OTP];
    newPin[index] = input;
    setOTP(newPin);

    if (input.length === 1 && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (input.length === 0 && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (newPin.every((digit) => digit !== '')) {
      onComplete(newPin.join(''));
    }
  };

  return (
    <OTPInputBox>
      {Array.from({ length }, (_, index) => (
        <Input
          key={index}
          type='tel'
          maxLength={1}
          value={OTP[index]}
          onChange={(e) => {
            const val = e.target.value;
            if (val === '' || /^[0-9]$/i.test(val)) {
              handleTextChange(val, index);
            }
          }}
          ref={(ref) => (inputRefs.current[index] = ref as HTMLInputElement)}
        />
      ))}
    </OTPInputBox>
  );
}

const OTPInputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Input = styled(InputNormal)`
  width: 64px;
  height: 72px;
  padding: 18px 25px;
  font-size: 20px;
`;
