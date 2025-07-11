import Button from '@/components/button/Button';
import SearchForm from './components/search-form/SearchForm';
import { Component } from 'react';
import CountryList from '@/components/country-list/CountryList';
import ErrorBoundary from '@/components/error-boundary/ErrorBoundary';

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
          className="cursor-pointer bg-amber-800 hover:bg-white border-2 rounded-xl text-white px-4 py-2"
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
