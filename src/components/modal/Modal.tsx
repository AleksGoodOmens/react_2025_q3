interface ModalProps {
  onClose: () => void;
}

export const Modal = ({ onClose }: ModalProps) => {
  return (
    <div className="fixed top-0 left-0 h-full w-full overflow-hidden bg-black/20">
      <section>
        <div>Im a modal dialog</div>
        <button onClick={onClose}>Close</button>
      </section>
    </div>
  );
};
