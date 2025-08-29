import { useSuspenseQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState, type ChangeEvent } from 'react';
import { getData, getMinMaxYear } from '@/utils';

import { CountryItem, Heading, ListControls, ListItem } from '@/components';

export const CountriesList = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['countries'],
    queryFn: getData,
  });
  const [minMaxYears] = useState(getMinMaxYear(data));
  const [currentYear, setCurrentYear] = useState(minMaxYears.max);
  const [filteredData, setFilteredData] = useState(data);

  const [searchValue, setSearchValue] = useState('');

  const handleSort = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const targetValue = e.target.value;
      if (targetValue) {
        const filterData = data.filter((country) =>
          country.name.includes(targetValue)
        );
        setFilteredData(filterData);
      }

      if (!targetValue) {
        setFilteredData(data);
      }
      setSearchValue(targetValue);
    },
    [data]
  );
  const handleRange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCurrentYear(Number(e.target.value));
  }, []);

  const headings = useMemo(() => ['country name', 'ISO', 'population'], []);
  const detailedHeadings = [
    'year',
    'population',
    'co2',
    'co2 per capita',
    'methane',
    'oil co2',
    'temperature change from co2',
  ];

  return (
    <>
      <ListControls
        currentYear={currentYear}
        handleRange={handleRange}
        handleSort={handleSort}
        max={minMaxYears.max}
        min={minMaxYears.min}
        searchValue={searchValue}
      />
      <ul className="grid">
        <ListItem>
          {headings.map((heading) => (
            <Heading variant="tableHeading" key={heading}>
              {heading}
            </Heading>
          ))}
        </ListItem>

        {filteredData.map((country) => (
          <CountryItem
            key={country.name}
            country={country}
            currentYear={currentYear}
            activeHeadings={detailedHeadings}
          />
        ))}
      </ul>
    </>
  );
};
