import * as React from 'react';

function defaultTrigger(store: React.MutableRefObject<any>, options: UseScrollTriggerOptions) {
  const { disableHysteresis = false, threshold = 100, target } = options;
  if (!store) return false;
  const previous = store.current;

  if (target) {
    // @ts-ignore
    store.current = target.pageYOffset !== undefined ? target.pageYOffset : target.scrollTop;
  }

  if (!disableHysteresis && previous !== undefined) {
    if (store.current < previous) {
      return false;
    }
  }

  return store.current > threshold;
}

const defaultTarget = typeof window !== 'undefined' ? window : null;

interface UseScrollTriggerOptions {
  disableHysteresis?: boolean;
  target?: Node | Window | null;
  threshold?: number;
  getTrigger?: typeof defaultTrigger;
}

export default function useScrollTrigger(options: UseScrollTriggerOptions = {}): boolean {
  const { getTrigger = defaultTrigger, target = defaultTarget, ...other } = options;
  const store = React.useRef();
  const [trigger, setTrigger] = React.useState(() => getTrigger(store, other));

  React.useEffect(() => {
    const handleScroll = () => {
      setTrigger(getTrigger(store, { target, ...other }));
    };

    handleScroll(); // Re-evaluate trigger when dependencies change
    target?.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      target?.removeEventListener('scroll', handleScroll);
    };
    // See Option 3. https://github.com/facebook/react/issues/14476#issuecomment-471199055
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, getTrigger, JSON.stringify(other)]);

  return trigger;
}
