import Button from '@/components/button/Button';
import SearchInput from '@/components/search-input/SearchInput';
import { Component, type FormEvent } from 'react';

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
        className="grid grid-cols-6 gap-2 justify-center my-2"
      >
        <SearchInput name="search" id="search" />
        <Button className="border-2 rounded-xl uppercase hover:text-white duration-300 cursor-pointer hover:bg-amber-800">
          search
        </Button>
      </form>
    );
  }
}
export default SearchForm;
