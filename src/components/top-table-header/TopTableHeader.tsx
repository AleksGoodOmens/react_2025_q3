import { Heading, ListItem } from '@/components';

const HEADINGS = ['country name', 'ISO', 'population'];

export const TopTableHeader = () => {
  return (
    <ListItem>
      {HEADINGS.map((heading) => (
        <Heading variant="tableHeading" key={heading}>
          {heading}
        </Heading>
      ))}
    </ListItem>
  );
};
