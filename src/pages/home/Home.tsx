import Button from '@/components/button/Button';
import SearchForm from './components/search-form/SearchForm';
import { Component } from 'react';

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
      <section>
        <h1>Home</h1>
        <SearchForm />
        <Button
          onClick={() => {
            this.setState({ isError: true });
          }}
        >
          error
        </Button>
      </section>
    );
  }
}

export default Home;
