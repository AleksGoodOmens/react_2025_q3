import { create } from 'zustand';
import type { ICountry } from '@/interfaces';

interface IState {
  favorite: ICountry[];
}

interface IActions {
  addToFavorite: (newCountry: ICountry) => void;
  removeFromFavorite: (countryName: string) => void;
  clearFavorite: () => void;
}

export const useCountryStore = create<IState & IActions>((set) => {
  const storageValue = localStorage.getItem('favorite');
  let favorite: ICountry[] = [];
  if (storageValue) {
    favorite = JSON.parse(storageValue) as ICountry[];
  }
  return {
    favorite: favorite,
    addToFavorite: (newCountry) =>
      set((state) => {
        const newCountryArray = [...state.favorite, newCountry];
        localStorage.setItem('favorite', JSON.stringify(newCountryArray));
        return { favorite: newCountryArray };
      }),
    removeFromFavorite: (countryName) =>
      set((state) => {
        const newCountryArray = [
          ...state.favorite.filter(
            (country) => country.name.official !== countryName
          ),
        ];
        localStorage.setItem('favorite', JSON.stringify(newCountryArray));

        return {
          favorite: newCountryArray,
        };
      }),
    clearFavorite: () =>
      set(() => {
        localStorage.removeItem('favorite');
        return { favorite: [] };
      }),
  };
});
