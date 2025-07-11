import {
  Component,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

class SearchInput extends Component<SearchInputProps> {
  state = {
    value: '',
  };
  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    this.setState({ value: value });
  };

  componentDidMount(): void {
    const savedSearch = localStorage.getItem('search');
    if (savedSearch) this.setState({ value: savedSearch });
  }

  render(): ReactNode {
    const { label, ...inputProps } = this.props;
    return (
      <label className="col-span-5 flex gap-2 border-2 px-4 py-2 rounded-xl items-center">
        <h5 className="uppercase">{label || 'search'}</h5>
        <input
          className="bg-amber-200 rounded-xl px-2 py-1 w-full"
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          {...inputProps}
        />
      </label>
    );
  }
}
export default SearchInput;
