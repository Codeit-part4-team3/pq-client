export const translatePaymentStatus = (status: string): string => {
  const statusTranslations: { [key: string]: string } = {
    READY: '결제 준비',
    IN_PROGRESS: '진행 중',
    WAITING_FOR_DEPOSIT: '입금 대기',
    DONE: '결제 완료',
    CANCELED: '취소됨',
    PARTIAL_CANCELED: '부분 취소됨',
    ABORTED: '중단됨',
    EXPIRED: '만료됨',
    REFUNDED: '환불됨',
  };
  return statusTranslations[status] || status;
};
