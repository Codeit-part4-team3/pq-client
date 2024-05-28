import { useEffect } from 'react';

export const usePreventGoBack = () => {
  const preventGoBack = () => {
    history.pushState(null, '', location.href);
    alert('지금은 뒤로가기를 할 수 없습니다.');
  };

  useEffect(() => {
    (() => {
      history.pushState(null, '', location.href);
      window.addEventListener('popstate', preventGoBack);
    })();

    return () => {
      window.removeEventListener('popstate', preventGoBack);
    };
  }, []);
};
