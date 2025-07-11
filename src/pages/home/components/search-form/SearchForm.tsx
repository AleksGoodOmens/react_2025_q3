import { Component, type FormEvent } from 'react';

import Button from '@/components/button/Button';
import SearchInput from '@/components/search-input/SearchInput';

class SearchForm extends Component {
  private handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget).get('search');
    if (!formData) return;
    const searchValue = formData.toString().trim();
    localStorage.setItem('search', searchValue);
    console.log(searchValue);
  };

  render() {
    return (
      <form
        onSubmit={this.handleSearch}
        className="my-2 grid grid-cols-6 justify-center gap-2"
      >
        <SearchInput name="search" id="search" />
        <Button className="cursor-pointer rounded-xl border-2 uppercase duration-300 hover:bg-amber-800 hover:text-white">
          search
        </Button>
      </form>
    );
  }
}
export default SearchForm;
