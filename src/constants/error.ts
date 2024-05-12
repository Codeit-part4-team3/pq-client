export const ERROR_MESSAGES = {
  AUTH: {
    EMAIL_REQUIRED: '이메일을 입력해주세요.',
    PASSWORD_REQUIRED: '비밀번호를 입력해주세요.',
    PASSWORD_CONFIRM_REQUIRED: '비밀번호를 다시 입력해주세요',
    NICKNAME_REQUIRED: '사용자명을 입력해주세요.',

    EMAIL_CHECK_FAILED: '이메일을 확인해주세요.',
    PASSWORD_CHECK_FAILED: '비밀번호를 확인해주세요.',
    PASSWORD_CONFIRM_CHECK_FAILED: '비밀번호를 다시 한번 확인해주세요.',
    EMAIL_VERIFY_CHECK_FAILED: '유효한 인증번호가 아닙니다.',

    INVALID_EMAIL: '올바른 이메일 주소가 아닙니다.',
    INVALID_PASSWORD: '비밀번호는 영문, 숫자, 특수문자 조합 8자 이상 입력해 주세요.',
    INVALID_PASSWORD_CONFIRM: '비밀번호가 일치하지 않습니다.',

    LOGIN_ERROR: '로그인 에러',
    SIGN_UP_ERROR: '회원가입 에러',
    EMAIL_VERIFY_ERROR: '이메일 인증 에러',

    LOGIN_FAILED: '로그인에 실패했습니다. 다시 시도해주세요.',
    SIGN_UP_FAILED: '회원가입에 실패했습니다. 다시 시도해주세요.',
    EMAIL_VERIFY_FAILED: '인증에 실패하였습니다. 다시 시도해주세요.',

    DUPLICATE_EMAIL: '이미 존재하는 유저입니다.',
    INVALID_LOGIN: '로그인 정보가 일치하지 않습니다.',

    NO_TOKEN: '토큰이 존재하지 않습니다.',
    SESSION_EXPIRED: '세션이 만료되었습니다.',

    EMAIL_VERIFY_REQUIRED: '이메일 인증을 해주세요.',
    USER_NOT_FOUND: '존재하지 않는 유저입니다.',
  },
  PAYMENT: {
    FAILED: '결제에 실패했습니다. 잠시 후 다시 시도해주세요.',
    CANCEL_FAILED: '환불 요청 실패',
    CANCEL_SUCCESS: '환불되었습니다.',
    REFUND_NOT_ALLOWED: '환불할 수 없는 주문입니다.',
    NO_SELECTED_PLAN: '선택된 플랜이 없습니다.',
    SELECT_PLAN: '플랜을 선택해주세요.',
    NO_ORDER_ID: '주문번호를 찾을 수 없습니다.',
    NO_PAYMENT: '주문을 찾을 수 없습니다.',
    SELECT_PAYMENT: '주문을 선택해 주세요.',
    INVALID_CARD_DATA: '카드 정보가 올바르지 않습니다.',
    NO_USER_INFO: '결제 위젯을 불러오기 위해 사용자 정보가 필요합니다.',
  },
  CARD: {
    INVALID_SUBSCRIPTION_DATA: '카드 등록 정보가 올바르지 않습니다.',
    REGIST_FAILED: '카드 등록에 실패했습니다. 카드 정보를 다시 확인해주세요.',
    REGIST_CANCEL: '사용자가 등록을 취소했습니다.',
    INVALID_CARD_COMPANY: '지원하지 않는 카드사입니다.',
    USER_CANCEL: '사용자가 등록을 취소했습니다.',
  },
  TEMP_ORDER: {
    FAILED: '가주문 요청 실패',
    NO_TEMP_ORDER_ID: '가주문 ID가 없습니다.',
  },
} as const;
