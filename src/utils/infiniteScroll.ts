import { lastKey } from 'src/pages/server/channel/chatChannel/_types/type';

interface InfiniteScrollProps {
  infiniteScrollTriggerRef: React.RefObject<HTMLDivElement>;
  fn: () => void;
  lastKey: lastKey | null;
  threshold: number;
}

const infiniteScroll = async ({ infiniteScrollTriggerRef, fn, lastKey, threshold }: InfiniteScrollProps) => {
  if (infiniteScrollTriggerRef.current) {
    const infiniteScrollTriggerIo = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting && infiniteScrollTriggerRef.current && lastKey) {
            // infiniteScrollTriggerRef이 보일 때 실행할 함수
            fn();

            infiniteScrollTriggerIo.disconnect();
          }
        });
      },
      { threshold: threshold },
    );

    infiniteScrollTriggerIo.observe(infiniteScrollTriggerRef.current);
  }
};

export default infiniteScroll;
