import { useState } from 'react';
import { Outlet } from 'react-router';

import { Button, CountryList, ErrorBoundary, SearchForm } from '@/components';

const Home = () => {
  const [isError, setIsError] = useState(false);
  if (isError) {
    throw new Error('test error');
  }
  return (
    <section>
      <h1 className="text-4xl">Countries by AmensGood</h1>
      <Button
        className="cursor-pointer rounded-xl border-2 bg-amber-800 px-4 py-2 text-white hover:bg-white"
        onClick={() => {
          setIsError(true);
        }}
      >
        error
      </Button>
      <SearchForm />
      <ErrorBoundary
        fallback={<p> Unexpected error occurred, Please try again later</p>}
      >
        <CountryList />
      </ErrorBoundary>
      <Outlet />
    </section>
  );
};

export default Home;
