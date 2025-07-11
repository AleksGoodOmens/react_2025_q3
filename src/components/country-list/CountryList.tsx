import { Component, type ReactNode } from 'react';

interface IProps {
  items: [];
}

class CountryList extends Component<IProps> {
  render(): ReactNode {
    const { items } = this.props;
    return (
      <ul className="border-2 min-h-80 rounded-xl relative">
        {items.length ? (
          items.map((item, i) => <li key={i}>{item}</li>)
        ) : (
          <li className="absolute top-[50%] left-[50%] translate-[-50%] text-center">
            No countries in a list
          </li>
        )}
        {}
      </ul>
    );
  }
}

export default CountryList;
