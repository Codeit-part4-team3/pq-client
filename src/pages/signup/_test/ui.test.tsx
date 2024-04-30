import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ReactNode } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import AuthInput from 'src/components/sign/input/AuthInput';
import OTPInput from 'src/components/sign/input/OtpInput';
import SignInput from 'src/components/sign/input/SignInput';
import { FormValues } from '../_types/type';

describe('SignInput Component', () => {
  const setup = (type = 'text', errors = {}) => {
    const Wrapper = ({ children }: { children: ReactNode }) => {
      const methods = useForm({
        defaultValues: {
          email: '',
        },
      });
      return <FormProvider {...methods}>{children}</FormProvider>;
    };

    render(
      <Wrapper>
        <SignInput id='email' label='이메일' type={type} placeholder='이메일을 입력하세요' errors={errors} />
      </Wrapper>,
    );
  };

  test('SignInput 렌더링 및 입력 상호작용 테스트', () => {
    setup();
    const input = screen.getByPlaceholderText('이메일을 입력하세요') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test@example.com' } });
    expect(input.value).toBe('test@example.com');
  });

  test('SignInput 에러 메시지 렌더링 테스트', () => {
    setup('text', { email: { message: '잘못된 이메일 형식입니다.' } });
    const errorMessage = screen.getByText('잘못된 이메일 형식입니다.');

    expect(errorMessage).toBeInTheDocument();
  });

  test('비밀번호 보기 토글 기능 테스트', () => {
    setup('password');
    const toggleIcon = screen.getByAltText('눈 모양 토글 아이콘');
    const input = screen.getByPlaceholderText('이메일을 입력하세요') as HTMLInputElement;

    expect(input.type).toBe('password');
    fireEvent.click(toggleIcon);
    expect(input.type).toBe('text');
  });
});

describe('OTPInput Component', () => {
  const onCompleteMock = jest.fn();

  beforeEach(() => {
    render(<OTPInput length={6} onComplete={onCompleteMock} />);
  });

  test('OTPInput 렌더링 및 입력 테스트', () => {
    const inputElements = screen.getAllByRole('textbox');

    expect(inputElements.length).toBe(6);
    fireEvent.change(inputElements[0], { target: { value: '1' } });
    fireEvent.change(inputElements[1], { target: { value: '2' } });
    fireEvent.change(inputElements[2], { target: { value: '3' } });
    fireEvent.change(inputElements[3], { target: { value: '4' } });
    fireEvent.change(inputElements[4], { target: { value: '5' } });
    fireEvent.change(inputElements[5], { target: { value: '6' } });
    expect(onCompleteMock).toHaveBeenCalledWith('123456');
  });
});

describe('AuthInput Component', () => {
  const setup = () => {
    const Wrapper = () => {
      const methods = useForm<FormValues>({
        defaultValues: {
          otp: '',
        },
      });

      return (
        <FormProvider {...methods}>
          <AuthInput control={methods.control} setValue={methods.setValue} errors={{}} />
        </FormProvider>
      );
    };
    render(<Wrapper />);
  };

  test('AuthInput 렌더링 및 인증번호 입력 테스트', () => {
    setup();
    const inputElements = screen.getAllByRole('textbox') as HTMLInputElement[];

    expect(inputElements.length).toBe(6);
    inputElements.forEach((input, index) => {
      fireEvent.change(input, { target: { value: String(index + 1) } });
      expect(input.value).toBe(String(index + 1));
    });
  });
});
