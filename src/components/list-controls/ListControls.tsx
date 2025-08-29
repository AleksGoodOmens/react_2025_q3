import { Button } from '../button/Button';
import { Heading } from '../heading/Heading';
import { Modal } from '../modal/Modal';
import styles from './ListControls.module.css';
import clsx from 'clsx';
import { memo, useState, type ChangeEvent } from 'react';
import { createPortal } from 'react-dom';

interface ListControlsProps {
  searchValue: string;
  currentYear: number;
  min: number;
  max: number;
  handleSort: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const ListControls = memo(
  ({
    currentYear,
    handleRange,
    handleSort,
    max,
    min,
    searchValue,
  }: ListControlsProps) => {
    const [show, setShow] = useState(false);

    const handleClose = () => {
      setShow((prev) => !prev);
    };

    return (
      <section>
        <input
          className="border-2 bg-amber-400 px-4"
          value={searchValue}
          onChange={handleSort}
        />
        <label>
          <Heading Tag={'h3'}>{currentYear}</Heading>

          <input
            type="range"
            id="points"
            name="points"
            className={clsx(styles['input'], '2-full')}
            onChange={handleRange}
            value={currentYear}
            min={min}
            max={max}
          ></input>
        </label>

        <Button onClick={handleClose}>Settings</Button>
        {show && createPortal(<Modal onClose={handleClose} />, document.body)}
      </section>
    );
  }
);
ListControls.displayName = 'ListControls';
