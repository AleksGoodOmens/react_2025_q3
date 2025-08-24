import { countriesList } from './countryList';
import { create } from 'zustand';
import type { Item } from '@/interfaces';

type IState = {
  countries: string[];
  uncontrolledFormData: Item[];
};

type IActions = {
  addToUnControlledForm: (value: Item) => void;
};

export const useStore = create<IState & IActions>((set) => ({
  countries: countriesList,
  uncontrolledFormData: [],
  addToUnControlledForm: (value) =>
    set((state) => ({
      uncontrolledFormData: [...state.uncontrolledFormData, value],
    })),
}));
