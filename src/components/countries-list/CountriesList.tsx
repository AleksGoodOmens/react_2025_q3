import { useCountriesList } from '@/hooks/useCountriesList';

import { CountryItem, Heading, ListControls, ListItem } from '@/components';

const HEADINGS = ['country name', 'ISO', 'population'];

export const CountriesList = () => {
  const { topLevelData } = useCountriesList();

  return (
    <>
      <ListControls />
      <ul className="grid">
        <ListItem>
          {HEADINGS.map((heading) => (
            <Heading variant="tableHeading" key={heading}>
              {heading}
            </Heading>
          ))}
        </ListItem>

        {topLevelData.map((country) => (
          <CountryItem key={country.name} country={country} />
        ))}
      </ul>
    </>
  );
};
