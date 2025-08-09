import Details from './Details';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import { describe, expect, it } from 'vitest';

const createTestClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const Stub = createRoutesStub([
  {
    path: '/',
    hydrateFallbackElement: <div>loading...</div>,
    Component: Details,
    loader() {
      return { countryName: 'test' };
    },
  },
]);

describe('Details', () => {
  it('renders loading state', async () => {
    render(
      <QueryClientProvider client={createTestClient()}>
        <Stub />
      </QueryClientProvider>
    );

    expect(await screen.findByText('loading...')).toBeInTheDocument();
  });

  it('renders country data from MSW', async () => {
    render(
      <QueryClientProvider client={createTestClient()}>
        <Stub />
      </QueryClientProvider>
    );

    expect(
      await screen.findByText('Official Test Country')
    ).toBeInTheDocument();
  });
});
