import { useEffect, useState } from 'react';

export default function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // delay 시간 후에 값을 업데이트하는 타이머를 설정합니다.
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 클린업 함수에서는 타이머를 취소합니다.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // value나 delay가 변경될 때마다 useEffect를 다시 실행합니다.

  return debouncedValue;
}
