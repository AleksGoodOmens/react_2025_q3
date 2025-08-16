import { CountryItem } from './CountryItem';
import clsx from 'clsx';
import { Heading } from 'components/ui/Heading';
import { OverlayUpdate } from 'components/ui/OverlayUpdate';
import { useHydratedCountryStore } from 'hooks/store/useCountryStore';
import { ICountry } from 'interfaces/index';
import { useTranslations } from 'next-intl';

interface Props {
  countries: ICountry[] | [] | undefined;
  activeCountry?: string | null;
  error: string | undefined;
  isFetching: boolean;
}

export const CountryList = ({
  countries,
  activeCountry,
  error,
  isFetching,
}: Props) => {
  const { favorite } = useHydratedCountryStore();
  const t = useTranslations('pagination');
  return (
    <ul
      className={clsx(
        'relative order-1 grid grid-cols-1 gap-2 overflow-hidden rounded-2xl border-2 md:order-0',
        !activeCountry && 'md:grid-cols-2 lg:grid-cols-3'
      )}
    >
      {error && <Heading variant="error">{error}</Heading>}

      {countries?.length === 0 && (
        <li className="text-center">{t('emptyList')}</li>
      )}

      {countries?.map((item) => (
        <CountryItem
          key={`${item.name.official}`}
          isFavorite={favorite.some(
            ({ name }) => name.official === item.name.official
          )}
          isActive={activeCountry === item.name.common}
          countryData={item}
        />
      ))}
      {isFetching && <OverlayUpdate />}
    </ul>
  );
};
