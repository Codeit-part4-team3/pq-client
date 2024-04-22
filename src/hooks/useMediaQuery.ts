import { useEffect, useState } from 'react';
import { MediaQueryType } from '../constants/common';

export const useMediaQuery = () => {
  const [mediaQuery, setMediaQuery] = useState<MediaQueryType>(MediaQueryType.MOBILE);

  const handleMediaQuery = (event: MediaQueryListEvent, queryType: MediaQueryType) => {
    if (event.matches) setMediaQuery(queryType);
  };

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const tabletQuery = window.matchMedia('(min-width: 769px) and (max-width: 1023px)');
    const desktopQuery = window.matchMedia('(min-width: 1024px) and (max-width: 1535px)');
    const desktop2XLQuery = window.matchMedia('(min-width: 1536px)');

    if (mobileQuery.matches) {
      setMediaQuery(MediaQueryType.MOBILE);
    } else if (tabletQuery.matches) {
      setMediaQuery(MediaQueryType.TABLET);
    } else if (desktopQuery.matches) {
      setMediaQuery(MediaQueryType.DESKTOP);
    } else if (desktop2XLQuery.matches) {
      setMediaQuery(MediaQueryType.DESKTOP_2XL);
    }

    mobileQuery.addEventListener('change', (event) => {
      if (event.matches) handleMediaQuery(event, MediaQueryType.MOBILE);
    });
    tabletQuery.addEventListener('change', (event) => {
      if (event.matches) handleMediaQuery(event, MediaQueryType.TABLET);
    });
    desktopQuery.addEventListener('change', (event) => {
      if (event.matches) handleMediaQuery(event, MediaQueryType.DESKTOP);
    });
    desktop2XLQuery.addEventListener('change', (event) => {
      if (event.matches) handleMediaQuery(event, MediaQueryType.DESKTOP_2XL);
    });
  }, []);

  return mediaQuery;
};
