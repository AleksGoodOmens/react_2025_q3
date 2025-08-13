'use client';

import { ICountry } from 'interfaces/index';
import { useEffect } from 'react';
import { create } from 'zustand';

interface IState {
  favorite: ICountry[];
}

interface IActions {
  addToFavorite: (newCountry: ICountry) => void;
  removeFromFavorite: (countryName: string) => void;
  clearFavorite: () => void;
  hydrate: () => void;
}

export const useCountryStore = create<IState & IActions>((set) => ({
  favorite: [],
  addToFavorite: (newCountry) =>
    set((state) => {
      const newCountryArray = [...state.favorite, newCountry];
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorite', JSON.stringify(newCountryArray));
      }
      return { favorite: newCountryArray };
    }),
  removeFromFavorite: (countryName) =>
    set((state) => {
      const newCountryArray = state.favorite.filter(
        (country) => country.name.official !== countryName
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorite', JSON.stringify(newCountryArray));
      }
      return { favorite: newCountryArray };
    }),
  clearFavorite: () =>
    set(() => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('favorite');
      }
      return { favorite: [] };
    }),
  hydrate: () => {
    if (typeof window !== 'undefined') {
      const storageValue = localStorage.getItem('favorite');
      if (storageValue) {
        set({ favorite: JSON.parse(storageValue) as ICountry[] });
      }
    }
  },
}));

export const useHydratedCountryStore = () => {
  const store = useCountryStore();
  useEffect(() => {
    store.hydrate();
  }, [store]);
  return store;
};
