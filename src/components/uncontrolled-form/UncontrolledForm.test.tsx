import { UncontrolledForm } from './UncontrolledForm';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/hooks', () => ({
  useStore: vi.fn(() => {
    return { countries: ['Russia', 'Italy', 'Spain'] };
  }),
}));

vi.mock('@/utils/toBase64', () => ({
  toBase64: vi.fn().mockResolvedValue('base64-string'),
}));

vi.mock('@/utils/toFileList', () => ({
  filesToFileList: vi.fn().mockReturnValue([new File([''], 'test.txt')]),
}));

vi.mock('@/components', () => ({}));

describe('UncontrolledForm', () => {
  const mockCloseForm = vi.fn();
  const mockAddToUnControlledForm = vi.fn();

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
      screen.getByRole('heading', { level: 3, name: /password/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: /confirm/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'Male' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'Female' })
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
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
  });

  it.skip('submits form with valid data', async () => {
    render(<UncontrolledForm closeForm={mockCloseForm} />);

    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/age/i), '25');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'Password123');
    await userEvent.type(screen.getByLabelText(/confirm/i), 'Password123');
    await userEvent.click(screen.getByLabelText(/male/i));

    const countrySelect = screen.getByLabelText(/country/i);
    await userEvent.selectOptions(countrySelect, 'USA');

    await userEvent.click(screen.getByLabelText(/terms and conditions/i));

    const fileInput = screen.getByLabelText(/upload file/i);
    const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
    await userEvent.upload(fileInput, file);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAddToUnControlledForm).toHaveBeenCalled();
      expect(mockCloseForm).toHaveBeenCalled();
    });
  });

  it.skip('shows password strength indicator', async () => {
    render(<UncontrolledForm closeForm={mockCloseForm} />);

    const passwordInput = screen.getByLabelText(/password/i);
    await userEvent.type(passwordInput, 'Test123');

    expect(screen.getByText(/strength: Test123/i)).toBeInTheDocument();
  });

  it.skip('validates email format', async () => {
    render(<UncontrolledForm closeForm={mockCloseForm} />);

    await userEvent.type(screen.getByLabelText(/email/i), 'invalid-email');
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    });
  });

  it.skip('validates password confirmation', async () => {
    render(<UncontrolledForm closeForm={mockCloseForm} />);

    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    await userEvent.type(screen.getByLabelText(/confirm/i), 'different');
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/passwords don't match/i)).toBeInTheDocument();
    });
  });

  it.skip('requires terms and conditions', async () => {
    render(<UncontrolledForm closeForm={mockCloseForm} />);

    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/age/i), '25');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'Password123');
    await userEvent.type(screen.getByLabelText(/confirm/i), 'Password123');
    await userEvent.click(screen.getByLabelText(/male/i));

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/you must accept the terms/i)
      ).toBeInTheDocument();
    });
  });

  it.skip('handles file upload validation', async () => {
    render(<UncontrolledForm closeForm={mockCloseForm} />);

    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/age/i), '25');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'Password123');
    await userEvent.type(screen.getByLabelText(/confirm/i), 'Password123');
    await userEvent.click(screen.getByLabelText(/male/i));
    await userEvent.click(screen.getByLabelText(/terms and conditions/i));

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/file is required/i)).toBeInTheDocument();
    });
  });
});
