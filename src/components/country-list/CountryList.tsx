import { CountryItem } from '../country-item/CountryItem';
import { SkeletonListItem } from '../skeleton-list-item/SkeletonListItem';
import type { ICountry } from '@/interfaces';
import { getAllCountries, getCountriesByName } from '@/service/CountryAPI';
import { Component, type ReactNode } from 'react';

interface IState {
  countries: ICountry[];
  loading: boolean;
}

export class CountryList extends Component<object, IState> {
  state: IState = {
    countries: [],
    loading: true,
  };

  private searchListener = () => this.handleUrlChange();

  componentDidMount(): void {
    this.loadCountries();
    window.addEventListener('searchUpdated', this.searchListener);
  }

  componentWillUnmount(): void {
    window.removeEventListener('searchUpdated', this.searchListener);
  }

  private handleUrlChange = async () => {
    this.setState({ loading: true });
    await this.loadCountries();
  };

  private getSearchValue = (): string => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('search') || localStorage.getItem('search') || '';
  };

  loadCountries = async (): Promise<void> => {
    const searchValue = this.getSearchValue();

    try {
      const countryList = searchValue
        ? await getCountriesByName(searchValue)
        : await getAllCountries();

      this.setState({
        countries: countryList,
        loading: false,
      });
    } catch (error) {
      console.error('Failed to load countries:', error);
      this.setState({
        countries: [],
        loading: false,
      });
    }
  };

  render(): ReactNode {
    return (
      <ul className="relative grid gap-2 rounded-xl border-2 p-2 md:grid-cols-2 lg:grid-cols-3">
        {this.state.loading ? (
          Array.from({ length: 20 }).map((_, i) => <SkeletonListItem key={i} />)
        ) : this.state.countries.length > 0 ? (
          this.state.countries.map((item) => (
            <CountryItem key={`${item.name.official}`} {...item} />
          ))
        ) : (
          <li className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center">
            No countries found
          </li>
        )}
      </ul>
    );
  }
}
