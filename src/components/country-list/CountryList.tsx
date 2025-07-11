import { getAllCountries } from '@/service/CountryAPI';
import { Component, type ReactNode } from 'react';

interface IProps {
  items: [];
}

class CountryList extends Component<IProps> {
  async componentDidMount(): Promise<void> {
    const countryList = await getAllCountries();

    console.log(countryList);
  }
  render(): ReactNode {
    const { items } = this.props;
    return (
      <ul className="relative min-h-80 rounded-xl border-2">
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
