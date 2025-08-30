import { create } from 'zustand';
import { getMinMaxYear, getTopLevelData } from '@/utils';
import { sortBy } from '@/utils/sortBy';

import type { CountriesData, SortType, TopLevelDataType } from '@/interfaces';

type IState = {
  rawData: CountriesData;
  rawCountriesNames: string[];
  countriesNames: string[];
  topLevelData: TopLevelDataType;
  sortBy: SortType;
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
  changeOrder: (newOrder: SortType) => void;
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
      return {
        topLevelData: sortBy(state.topLevelData, newOrder),
        sortBy: newOrder,
      };
    }),

  changeCurrentYear: (year: number) =>
    set((state) => {
      const topLevelData = getTopLevelData(
        state.rawData,
        state.countriesNames,
        year
      );

      return {
        topLevelData: sortBy(topLevelData, state.sortBy),
        currentYear: year,
      };
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

      return {
        topLevelData: sortBy(topLevelData, state.sortBy),
        countriesNames,
        searchValue,
      };
    }),
}));
