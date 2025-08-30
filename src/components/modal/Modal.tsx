import { Button } from '../button/Button';
import { Heading } from '../heading/Heading';
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';

import { COLUMNS, type ActiveColumn } from '@/interfaces';

import { useStore } from '@/hooks';

interface ModalProps {
  onClose: () => void;
}

export const Modal = memo(({ onClose }: ModalProps) => {
  const { changeColumns, activeColumns } = useStore();
  const [state, setState] = useState(activeColumns);
  const modalRef = useRef<HTMLDivElement>(null);

  const getFocusableElements = useMemo(() => {
    if (!modalRef.current) return [];
    return modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
  }, []);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );
  const handleTabKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const focusableElements = getFocusableElements;
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    },
    [getFocusableElements]
  );

  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) return;

    modalElement.focus();

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTabKey);

    document.body.style.overflow = 'hidden';

    const previousActiveElement = document.activeElement as HTMLElement;

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTabKey);

      document.body.style.overflow = 'unset';

      previousActiveElement?.focus();
    };
  }, [handleEscape, handleTabKey]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      changeColumns(state);
      onClose();
    },
    [changeColumns, onClose, state]
  );

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as ActiveColumn;
    const value = e.target.checked;
    setState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const checkbox = COLUMNS.map((col) => {
    const value = col.split(' ').join('_') as ActiveColumn;
    return (
      <label key={col} className="flex flex-row-reverse justify-end gap-6">
        <Heading variant="small" Tag="h4">
          {col}
        </Heading>
        <input
          className="rounded-2xls h-10 w-10"
          onChange={onChange}
          type="checkbox"
          name={value}
          id={value}
          checked={state[value]}
        />
      </label>
    );
  });

  return (
    <div
      className="fixed top-0 left-0 grid h-full w-full items-center justify-center overflow-hidden bg-black/60"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <section
        ref={modalRef}
        tabIndex={-1}
        className="w-fit rounded-2xl bg-amber-700 p-4 outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <Heading className="p-4">Inner form settings</Heading>
        <form onSubmit={onSubmit} className="grid gap-4">
          {checkbox}
          <Button type="submit">accept</Button>
          <Button onClick={onClose}>Close</Button>
        </form>
      </section>
    </div>
  );
});
Modal.displayName = 'Modal';
