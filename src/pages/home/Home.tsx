import { Component } from 'react';

import { Button, CountryList, ErrorBoundary, SearchForm } from '@/components';

class Home extends Component {
  state = {
    isError: false,
  };

  componentWillUnmount(): void {
    this.setState({ isError: false });
  }
  render() {
    if (this.state.isError) {
      throw new Error('test error for Данияр');
    }
    return (
      <section className="container mx-auto flex min-h-dvh flex-col p-2">
        <h1 className="text-4xl">Countries by AmensGood</h1>
        <Button
          className="cursor-pointer rounded-xl border-2 bg-amber-800 px-4 py-2 text-white hover:bg-white"
          onClick={() => {
            this.setState({ isError: true });
          }}
        >
          error
        </Button>
        <SearchForm />
        <ErrorBoundary fallback={<p>Some error try again</p>}>
          <CountryList />
        </ErrorBoundary>
      </section>
    );
  }
}

export default Home;
