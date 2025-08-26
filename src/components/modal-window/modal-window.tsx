import { Button } from '../button/Button';
import { useEffect, useRef, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

interface Props extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const ModalWindow = ({ isOpen, onClose, children, title }: Props) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'esc') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="absolute inset-2 top-0 left-0 grid h-full w-full items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="rounded-2xl border-2 border-white bg-blue-400 p-2"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
      >
        <header className="flex justify-between">
          <h3 className="uppercase">{title}</h3>
          <Button variant="ghost" onClick={onClose} aria-label="Close modal">
            ×
          </Button>
        </header>
        {children}
      </div>
    </div>,
    document.body
  );
};
