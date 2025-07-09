import { Component, type ChangeEvent, type ReactNode } from 'react';

class SearchInput extends Component {
  state = {
    value: '',
  };
  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };

  render(): ReactNode {
    return (
      <label>
        <h5>search</h5>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </label>
    );
  }
}
export default SearchInput;
