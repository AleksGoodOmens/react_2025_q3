import { create } from 'zustand';

interface IState {
  favorite: string[];
}

interface IActions {
  addToFavorite: (newCountry: string) => void;
  removeFromFavorite: (countryName: string) => void;
  clearFavorite: () => void;
}

export const useCountryStore = create<IState & IActions>((set) => ({
  favorite: localStorage.getItem('favorite')?.split(',') || [],
  addToFavorite: (newCountry: string) =>
    set((state: IState) => {
      const newCountryArray = [...state.favorite, newCountry];
      localStorage.setItem('favorite', newCountryArray.join(','));
      return { favorite: newCountryArray };
    }),
  removeFromFavorite: (countryName: string) =>
    set((state: IState) => {
      const newCountryArray = [
        ...state.favorite.filter((country) => country !== countryName),
      ];
      localStorage.setItem('favorite', newCountryArray.join(','));

      return {
        favorite: newCountryArray,
      };
    }),
  clearFavorite: () =>
    set(() => {
      localStorage.removeItem('favorite');
      return { favorite: [] };
    }),
}));
