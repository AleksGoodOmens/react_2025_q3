import Button from '@/components/button/Button';
import SearchInput from '@/components/search-input/SearchInput';
import { Component, type FormEvent } from 'react';

class SearchForm extends Component {
  private handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
  };
  render() {
    return (
      <form onSubmit={this.handleSearch}>
        <SearchInput name="search" />
        <Button>search</Button>
      </form>
    );
  }
}
export default SearchForm;
