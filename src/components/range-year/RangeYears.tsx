import { Heading } from '../heading/Heading';
import styles from './RangeYears.module.css';
import clsx from 'clsx';
import { useCallback, useRef, useState, type ChangeEvent } from 'react';

import { useStore } from '@/hooks';

export const RangeYearsInput = () => {
  const { minMaxYears, currentYear, changeCurrentYear } = useStore();
  const [year, setYear] = useState(currentYear);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleRange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newYear = Number(e.target.value);
      setYear(newYear);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        changeCurrentYear(newYear);

        setIsAnimating(true);

        setTimeout(() => setIsAnimating(false), 300);
      }, 300);
    },

    [changeCurrentYear]
  );

  return (
    <label>
      <Heading
        Tag={'h3'}
        className={clsx(
          'transition-all duration-300',
          isAnimating && 'scale-90 animate-pulse'
        )}
      >
        {currentYear}
      </Heading>

      <input
        type="range"
        id="points"
        name="points"
        className={clsx(styles['input'], '2-full')}
        onChange={handleRange}
        value={year}
        min={minMaxYears.min}
        max={minMaxYears.max}
      />
    </label>
  );
};
