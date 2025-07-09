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
    this.setState({ value: e.target.value });
  };

  render(): ReactNode {
    const { label, ...inputProps } = this.props;
    return (
      <label>
        <h5>{label || 'search'}</h5>
        <input
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
