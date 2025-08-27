import { countriesList } from './countryList';
import { create } from 'zustand';
import type { Item } from '@/interfaces';

type IState = {
  countries: typeof countriesList;
  uncontrolledFormData: Item[];
  controlledFormData: Item[];
};

type IActions = {
  addToUnControlledForm: (value: Item) => void;
  addToControlledForm: (value: Item) => void;
};

export const useStore = create<IState & IActions>((set) => ({
  countries: countriesList,
  uncontrolledFormData: [],
  controlledFormData: [],
  addToUnControlledForm: (value) =>
    set((state) => ({
      uncontrolledFormData: [...state.uncontrolledFormData, value],
    })),
  addToControlledForm: (value) =>
    set((state) => ({
      controlledFormData: [...state.controlledFormData, value],
    })),
}));
