export const ERROR_MESSAGES = {
  AUTH: {
    DUPLICATE_EMAIL: '중복된 이메일입니다.',
    EMAIL_REQUIRED: '이메일을 입력해주세요.',
    PASSWORD_REQUIRED: '비밀번호를 입력해주세요.',
    CONFIRM_PASSWORD_REQUIRED: '비밀번호를 다시 한번 입력해주세요',
    EMAIL_CHECK_FAILED: '이메일을 확인해주세요.',
    PASSWORD_CHECK_FAILED: '비밀번호를 확인해주세요.',
    CONFIRM_PASSWORD_CHECK_FAILED: '비밀번호를 다시 한번 확인해주세요.',
    INVALID_EMAIL: '올바른 이메일 주소가 아닙니다.',
    INVALID_PASSWORD: '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.',
    INVALID_CONFIRM_PASSWORD: '비밀번호가 일치하지 않아요.',
    LOGIN_ERROR: '로그인 에러',
    SIGN_UP_ERROR: '회원가입 에러',
    LOGIN_FAILED: '로그인에 실패했습니다. 다시 시도해주세요.',
    SIGN_UP_FAILED: '회원가입에 실패했습니다. 다시 시도해주세요.',
  },
} as const;
