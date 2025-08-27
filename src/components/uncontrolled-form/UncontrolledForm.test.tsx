import { UncontrolledForm } from './UncontrolledForm';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockAddToControlledForm = vi.fn();

vi.mock('@/hooks', () => ({
  useStore: vi.fn(() => {
    return {
      countries: ['Russia', 'Italy', 'Spain'],
      addToUnControlledForm: mockAddToControlledForm,
    };
  }),
}));

vi.mock('@/utils/toBase64', () => ({
  toBase64: vi.fn().mockResolvedValue('base64-string'),
}));

vi.mock('@/utils/toFileList', () => ({
  filesToFileList: vi.fn().mockReturnValue([new File([''], 'test.txt')]),
}));

describe('UncontrolledForm', () => {
  const mockCloseForm = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all form fields', () => {
    render(<UncontrolledForm closeForm={mockCloseForm} />);

    expect(
      screen.getByRole('heading', { level: 3, name: /name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: /age/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: /email/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'Password' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: /confirm/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'male' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'female' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: /upload file/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: /country/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: /terms and conditions/i })
    ).toBeInTheDocument();
  });

  it('shows error messages for invalid submission', async () => {
    render(<UncontrolledForm closeForm={mockCloseForm} />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/age is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Please provide correct email/i)
      ).toBeInTheDocument();
    });
  });
});
