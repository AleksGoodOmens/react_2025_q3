import { useSuspenseQuery } from '@tanstack/react-query';
import { useState, type ChangeEvent } from 'react';
import { CountriesDataSchema, type CountriesData } from '@/interfaces/schemas';

const dataPath = import.meta.env.VITE_DATA_URL as string;

const fetchData = async (): Promise<CountriesData> => {
  const response = await fetch(dataPath);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const rawData = await response.json();

  return CountriesDataSchema.parse(rawData);
};

export const CountriesList = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['countries'],
    queryFn: fetchData,
  });
  const [countriesNames] = useState(Object.keys(data));
  const [countriesNamesFiltered, setCountriesNamesFiltered] = useState(
    Object.keys(data)
  );
  const [value, setValue] = useState('');

  const handleSort = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    if (!targetValue) {
      setCountriesNamesFiltered(countriesNames);
      setValue(targetValue);
      return;
    }
    setValue(targetValue);

    const filterData = countriesNames.filter((country) =>
      country.includes(value)
    );
    setCountriesNamesFiltered(filterData);
  };

  return (
    <ul className="flex flex-wrap gap-2">
      <h2>countries list </h2>
      <input
        className="border-2 bg-amber-400 px-4"
        value={value}
        onChange={handleSort}
      />
      {countriesNamesFiltered.map((country) => (
        <li className="border px-4 py-2" key={country}>
          {country}
        </li>
      ))}
    </ul>
  );
};
