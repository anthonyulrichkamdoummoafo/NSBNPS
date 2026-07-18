import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number; // ms
}

/** Counts up from 0 to `target` once it scrolls into view. Renders the static target
 * value immediately during SSR/prerendering (useInView is false until a real browser
 * IntersectionObserver fires), so crawlers and no-JS visitors still see the real number. */
export default function AnimatedCounter({ target, suffix = '', prefix = '', duration = 1500 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [value, setValue] = useState(target);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;
    setHasAnimated(true);
    setValue(0);
    let start: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isInView, hasAnimated, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
