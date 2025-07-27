import { DetailItem, Details, DetailSection } from './Details';
import { MockDetailedCountry } from '@/__test__/mockData/countries.mock';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useLoaderData, useNavigation, useSearchParams } from 'react-router';

describe('details page', () => {
  vi.mock('react-router', () => ({
    useLoaderData: vi.fn(),
    useNavigation: vi.fn(),
    useSearchParams: vi.fn(),
    useNavigate: vi.fn(),
  }));
  beforeEach(() => {
    (useLoaderData as jest.Mock).mockReturnValue({
      country: MockDetailedCountry,
    });

    (useNavigation as jest.Mock).mockReturnValue({
      state: 'idle',
    });

    (useSearchParams as jest.Mock).mockReturnValue(['searchParams']);
  });
  it('should render country details correctly', () => {
    render(<Details />);

    // Проверяем основные элементы
    expect(screen.getByText('Official Test Country')).toBeInTheDocument();
    expect(screen.getByText('Test Country')).toBeInTheDocument();
    expect(screen.getByText('Test Region')).toBeInTheDocument();
    expect(screen.getByText('Test Subregion')).toBeInTheDocument();

    // Проверяем изображения
    const flagImg = screen.getByAltText('Test flag description');
    expect(flagImg).toHaveAttribute('src', 'https://test.flag.png');

    const coatImg = screen.getByAltText('Coat of arms of Test Country');
    expect(coatImg).toHaveAttribute('src', 'https://test.coat.png');
  });
  it('should show loading state when navigation is loading', () => {
    (useNavigation as jest.Mock).mockReturnValue({
      state: 'loading',
    });

    render(<Details />);
    expect(screen.getByText('loading...')).toBeInTheDocument();
  });
  it('should handle missing optional data gracefully', () => {
    (useLoaderData as jest.Mock).mockReturnValue({
      country: {
        ...MockDetailedCountry,
        coatOfArms: undefined,
        subregion: undefined,
        borders: undefined,
      },
    });

    render(<Details />);

    expect(screen.queryByAltText(/Coat of arms/)).not.toBeInTheDocument();
    expect(screen.getByText('Subregion')).toBeInTheDocument();
    expect(screen.getByText('N/A')).toBeInTheDocument();
    expect(screen.queryByText('Bordering Countries')).not.toBeInTheDocument();
  });
  it('should render all data sections', () => {
    render(<Details />);

    expect(screen.getByText('Languages')).toBeInTheDocument();
    expect(screen.getByText('Currencies')).toBeInTheDocument();
    expect(screen.getByText('Timezones')).toBeInTheDocument();
    expect(screen.getByText('Bordering Countries')).toBeInTheDocument();
    expect(screen.getByText('Postal Code')).toBeInTheDocument();
    expect(screen.getByText('Alternative Names')).toBeInTheDocument();
    expect(screen.getByText('Maps')).toBeInTheDocument();
  });
  describe('Country Name Rendering', () => {
    it('should display official name when available', () => {
      vi.mocked(useLoaderData).mockReturnValue({
        country: {
          ...MockDetailedCountry,
          name: {
            official: 'Official Test Name',
            common: 'Common Test Name',
          },
        },
      });

      render(<Details />);

      expect(screen.getByText('Official Test Name')).toBeInTheDocument();
    });

    it('should display common name when official is missing', () => {
      vi.mocked(useLoaderData).mockReturnValue({
        country: {
          ...MockDetailedCountry,
          name: {
            common: 'Common Test Name',
          },
        },
      });

      render(<Details />);

      expect(screen.getAllByText(/Common Test Name/i)).toHaveLength(2);
    });

    it('should display both names when they are different', () => {
      vi.mocked(useLoaderData).mockReturnValue({
        country: {
          ...MockDetailedCountry,
          name: {
            official: 'Official Long Test Name',
            common: 'Short Test Name',
          },
        },
      });

      render(<Details />);

      const officialName = screen.getByText('Official Long Test Name');
      const commonName = screen.getByText('Short Test Name');

      expect(officialName).toBeInTheDocument();
      expect(commonName).toBeInTheDocument();
      expect(officialName.tagName).toBe('H2');
      expect(commonName.tagName).toBe('H2');
      expect(officialName).toHaveClass('text-3xl');
      expect(commonName).toHaveClass('text-xl');
    });

    it('should not display common name when it matches official name', () => {
      vi.mocked(useLoaderData).mockReturnValue({
        country: {
          ...MockDetailedCountry,
          name: {
            official: 'Same Name',
            common: 'Same Name',
          },
        },
      });

      render(<Details />);

      const names = screen.getAllByText('Same Name');
      expect(names.length).toBe(1);
      expect(names[0].tagName).toBe('H2');
      expect(names[0]).toHaveClass('text-3xl');
    });
  });
  describe('DetailItem Component', () => {
    it('should render label and value', () => {
      render(<DetailItem label="Test Label" value="Test Value" />);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
      expect(screen.getByText('Test Value')).toBeInTheDocument();
    });

    it('should show N/A for null value', () => {
      render(<DetailItem label="Test Label" value={null} />);
      expect(screen.getByText('N/A')).toBeInTheDocument();
    });
  });

  describe('DetailSection Component', () => {
    it('should render title and content', () => {
      render(
        <DetailSection title="Test Title" content={<div>Test Content</div>} />
      );
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
  });
});
