import { ListOfItems } from './ListOfItems';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Item } from '@/interfaces';

describe('ListOfItems', () => {
  const mockItems: Item[] = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      age: '25',
      country: 'USA',
      password: 'Password123',
      confirmPassword: 'Password123',
      gender: 'male',
      tc: 'on',
      file: 'data:image/png;base64,test123',
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      age: '30',
      country: 'Canada',
      password: 'Secure456',
      confirmPassword: 'Secure456',
      gender: 'female',
      tc: null,
      file: undefined,
    },
  ];

  it('renders title correctly', () => {
    render(<ListOfItems title="Test List" items={[]} />);
    expect(screen.getByText('Test List')).toBeInTheDocument();
  });

  it('shows "no items added" when items array is empty', () => {
    render(<ListOfItems title="Test List" items={[]} />);
    expect(screen.getByText('no items added')).toBeInTheDocument();
  });

  it('shows "no items added" when items is undefined', () => {
    render(<ListOfItems title="Test List" />);
    expect(screen.getByText('no items added')).toBeInTheDocument();
  });

  it('renders list of items correctly', () => {
    render(<ListOfItems title="Test List" items={mockItems} />);

    expect(screen.getByText('name: John Doe')).toBeInTheDocument();
    expect(screen.getByText('name: Jane Smith')).toBeInTheDocument();

    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();

    expect(screen.getByText('Age:25')).toBeInTheDocument();
    expect(screen.getByText('Age:30')).toBeInTheDocument();

    expect(screen.getByText('from: USA')).toBeInTheDocument();
    expect(screen.getByText('from: Canada')).toBeInTheDocument();
  });

  it('renders gender correctly', () => {
    render(<ListOfItems title="Test List" items={mockItems} />);
    expect(screen.getByText('gender: male')).toBeInTheDocument();
    expect(screen.getByText('gender: female')).toBeInTheDocument();
  });

  it('shows terms accepted when tc is present', () => {
    render(<ListOfItems title="Test List" items={mockItems} />);
    expect(
      screen.getByText('terms and conditions accepted')
    ).toBeInTheDocument();
  });

  it('renders image when file is provided', () => {
    render(<ListOfItems title="Test List" items={mockItems} />);

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(1);
    expect(images[0]).toHaveAttribute('src', 'data:image/png;base64,test123');
    expect(images[0]).toHaveAttribute('alt', 'John Doe');
  });

  it('does not render image when file is null', () => {
    render(<ListOfItems title="Test List" items={mockItems} />);

    const images = screen.getAllByRole('img');

    expect(images).toHaveLength(1);
  });

  it('renders passwords correctly', () => {
    render(<ListOfItems title="Test List" items={mockItems} />);

    expect(screen.getByText('Password: Password123')).toBeInTheDocument();
    expect(
      screen.getByText('Password confirm: Password123')
    ).toBeInTheDocument();
    expect(screen.getByText('Password: Secure456')).toBeInTheDocument();
    expect(screen.getByText('Password confirm: Secure456')).toBeInTheDocument();
  });
});
