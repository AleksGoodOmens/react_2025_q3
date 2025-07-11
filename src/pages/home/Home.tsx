import { Component } from 'react';

import Button from '@components/button/Button';
import CountryList from '@components/country-list/CountryList';
import ErrorBoundary from '@components/error-boundary/ErrorBoundary';

import SearchForm from './components/search-form/SearchForm';

class Home extends Component {
  state = {
    isError: false,
  };

  componentWillUnmount(): void {
    this.setState({ isError: false });
  }
  render() {
    if (this.state.isError) {
      throw new Error('test error');
    }
    return (
      <section className="container mx-auto">
        <h1 className="text-9xl">Home</h1>
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
          <CountryList items={[]} />
        </ErrorBoundary>
      </section>
    );
  }
}

export default Home;
