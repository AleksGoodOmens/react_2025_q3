import { Button } from '@/components';

interface ModalProps {
  onClose: () => void;
}

export const Modal = ({ onClose }: ModalProps) => {
  return (
    <div className="fixed top-0 left-0 grid h-full w-full items-center justify-center overflow-hidden bg-black/60">
      <section className="w-fit rounded-2xl bg-amber-700 p-4">
        <div>Im a modal dialog</div>
        <Button onClick={onClose}>Close</Button>
      </section>
    </div>
  );
};
