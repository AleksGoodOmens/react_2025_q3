import { create } from 'zustand';
import { getMinMaxYear, getTopLevelData } from '@/utils';

import type { CountriesData, TopLevelDataType } from '@/interfaces';

type IState = {
  rawData: CountriesData;
  rawCountriesNames: string[];
  countriesNames: string[];
  topLevelData: TopLevelDataType;
  sortBy: {
    order: 'asc' | 'desc';
    by: 'name' | 'population';
  };
  currentYear: number;
  searchValue: string;
  columnNames: [
    'year',
    'population',
    'co2',
    'co2 per capita',
    'methane',
    'oil co2',
    'temperature change from co2',
  ];
  minMaxYears: { min: number; max: number };
};

type IActions = {
  searchByName: (searchValue: string) => void;
  changeCurrentYear: (year: number) => void;
  changeOrder: (newOrder: {
    order: 'asc' | 'desc';
    by: 'name' | 'population';
  }) => void;
  setRawData: (rawData: CountriesData) => void;
};

export const useStore = create<IState & IActions>((set) => ({
  rawData: {},
  minMaxYears: {
    max: new Date().getFullYear(),
    min: 1990,
  },
  rawCountriesNames: [],
  countriesNames: [],
  topLevelData: [],
  sortBy: {
    order: 'asc',
    by: 'name',
  },
  searchValue: '',
  columnNames: [
    'year',
    'population',
    'co2',
    'co2 per capita',
    'methane',
    'oil co2',
    'temperature change from co2',
  ],
  currentYear: new Date().getFullYear(),

  setRawData: (rawData) =>
    set(() => {
      const countriesNames = Object.keys(rawData).sort();
      const minMaxYears = getMinMaxYear(rawData);
      const topLevelData = getTopLevelData(
        rawData,
        countriesNames,
        minMaxYears.max
      );

      return {
        rawData,
        topLevelData,
        rawCountriesNames: countriesNames,
        countriesNames,
        minMaxYears,
        currentYear: minMaxYears.max,
      };
    }),

  changeOrder: (newOrder) =>
    set((state) => {
      const sortBy = [...state.topLevelData];
      if (newOrder.by === 'name') {
        sortBy.sort((a, b) => {
          if (newOrder.order === 'asc') {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        });
      } else if (newOrder.by === 'population') {
        sortBy.sort((a, b) => {
          const popA = Number(a.population) || 0;
          const popB = Number(b.population) || 0;

          if (newOrder.order === 'asc') {
            return popA - popB;
          } else {
            return popB - popA;
          }
        });
      }

      return { topLevelData: sortBy };
    }),

  changeCurrentYear: (year: number) =>
    set((state) => {
      const topLevelData = getTopLevelData(
        state.rawData,
        state.countriesNames,
        year
      );

      return { topLevelData, currentYear: year };
    }),

  searchByName: (searchValue: string) =>
    set((state) => {
      const countriesNames = state.rawCountriesNames.filter((country) =>
        country.toLowerCase().includes(searchValue.toLowerCase())
      );

      const topLevelData = getTopLevelData(
        state.rawData,
        countriesNames,
        state.currentYear
      );

      return { topLevelData, countriesNames, searchValue };
    }),
}));
