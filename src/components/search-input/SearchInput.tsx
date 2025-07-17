import {
  Component,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export class SearchInput extends Component<SearchInputProps> {
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
      <label className="flex w-full items-center gap-2 rounded-xl border-2 px-4 py-2 sm:col-span-5">
        <h5 className="uppercase">{label || 'search'}</h5>
        <input
          className="w-full rounded-xl bg-amber-200 px-2 py-1"
          type="search"
          name={label || 'search'}
          value={this.state.value}
          onChange={this.handleChange}
          {...inputProps}
        />
      </label>
    );
  }
}
