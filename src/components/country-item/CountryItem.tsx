import type { FilteredCountries } from '@/interfaces';

import { CountryYearlyList, Heading, ListItem } from '@/components';

interface CountryItemProps {
  country: FilteredCountries[0];
  currentYear: number;
  activeHeadings: string[];
}

export const CountryItem = ({
  country,
  currentYear,
  activeHeadings,
}: CountryItemProps) => {
  const { name, iso_code = 'N/A', data } = country;

  const populationLastYear =
    data.filter((item) => item.year === currentYear)[0]?.population || 'N/A';

  const cols = [name, iso_code, populationLastYear];

  return (
    <>
      <ListItem>
        {cols.map((col, i) => (
          <div key={`${col}-${i}`} className="not-last:border-r-2">
            {col}
          </div>
        ))}
      </ListItem>
      <ul>
        <ListItem>
          {activeHeadings.map((heading) => (
            <Heading key={heading} Tag="h3" variant="small">
              {heading}
            </Heading>
          ))}
        </ListItem>
        <CountryYearlyList data={data} />
      </ul>
    </>
  );
};
