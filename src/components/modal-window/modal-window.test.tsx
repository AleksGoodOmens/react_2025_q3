import { ModalWindow } from './modal-window';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

vi.mock('react-dom', () => ({
  createPortal: (children: React.ReactNode) => children,
}));

describe('ModalWindow', () => {
  it('shows and hides modal based on isOpen prop', () => {
    const { rerender } = render(
      <ModalWindow isOpen={false} onClose={vi.fn()} title="Test">
        Content
      </ModalWindow>
    );

    expect(screen.queryByRole('dialog')).toBeNull();

    rerender(
      <ModalWindow isOpen={true} onClose={vi.fn()} title="Test">
        Content
      </ModalWindow>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes when clicking close button', async () => {
    const onClose = vi.fn();
    render(
      <ModalWindow isOpen={true} onClose={onClose} title="Test">
        Content
      </ModalWindow>
    );

    await userEvent.click(screen.getByLabelText('Close modal'));
    expect(onClose).toHaveBeenCalled();
  });
});
