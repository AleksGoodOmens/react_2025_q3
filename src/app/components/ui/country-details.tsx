import { IDetailedCountry } from 'interfaces/index';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';

interface Props {
  country: IDetailedCountry;
  handleRefetch: () => void;
}

export const CountryDetails = ({ country }: Props) => {
  const {
    name,
    capital,
    region,
    subregion,
    flags,
    coatOfArms,
    area,
    population,
    languages,
    currencies,
    timezones,
    borders,
    idd,
    postalCode,
    maps,
    independent,
    status,
    altSpellings,
  } = country;
  const t = useTranslations('details');

  return (
    <article>
      <header className="flex justify-between gap-1">
        <div>
          <h2 className="text-center text-xl font-bold">
            {name?.official || name?.common}
          </h2>
          {name?.common !== name?.official && (
            <h2 className="text-sm">{name?.common}</h2>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <div className="space-y-1">
          <div className="flex flex-wrap gap-1">
            {flags?.png && (
              <img
                src={flags.png}
                alt={flags.alt || `${t('flag')} ${name?.common}`}
                className="aspect-video h-32 border object-cover"
              />
            )}
            {coatOfArms?.png && (
              <img
                src={coatOfArms.png}
                alt={`${t('coat')} ${name?.common}`}
                className="aspect-square h-32 object-contain"
              />
            )}
          </div>

          <div
            className="grid gap-1"
            style={{
              gridTemplateColumns:
                'repeat(auto-fill, minmax(min(180px, 100%), 1fr))',
              maxWidth: 'calc(180px * 2 + 8px)',
            }}
          >
            <DetailItem label={t('region')} value={region} />
            <DetailItem label={t('subregion')} value={subregion} />
            <DetailItem label={t('capital')} value={capital?.join(', ')} />
            <DetailItem
              label={t('area')}
              value={`${area?.toLocaleString()} km²`}
            />
            <DetailItem
              label={t('population')}
              value={population?.toLocaleString()}
            />
            <DetailItem label={t('status')} value={status} />
            <DetailItem
              label={t('independent')}
              value={independent ? t('yes') : t('no')}
            />
          </div>

          {idd?.root && (
            <div>
              <h3 className="mb-2 text-sm font-semibold">{t('codesTitle')}</h3>
              <div className="flex flex-wrap gap-1">
                {idd.suffixes?.map((suffix) => (
                  <span key={suffix} className="rounded bg-amber-500 px-3 py-1">
                    +{idd.root}
                    {suffix}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          {languages && Object.keys(languages).length > 0 && (
            <DetailSection
              title={t('languages')}
              content={
                <ul className="space-y-1">
                  {Object.entries(languages).map(([code, name]) => (
                    <li key={code}>
                      <span className="font-medium">{code}:</span> {name}
                    </li>
                  ))}
                </ul>
              }
            />
          )}

          {currencies && Object.keys(currencies).length > 0 && (
            <DetailSection
              title={t('currencies')}
              content={
                <ul className="space-y-2">
                  {Object.entries(currencies).map(([code, currency]) => (
                    <li key={code}>
                      <span className="font-medium">{code}:</span>{' '}
                      {currency.name} ({currency.symbol})
                    </li>
                  ))}
                </ul>
              }
            />
          )}

          {timezones?.length > 0 && (
            <DetailSection
              title={t('timezones')}
              content={
                <div className="flex flex-wrap gap-1">
                  {timezones.map((tz) => (
                    <span key={tz} className="rounded bg-amber-500 px-2 py-1">
                      {tz}
                    </span>
                  ))}
                </div>
              }
            />
          )}

          {borders && borders?.length > 0 && (
            <DetailSection
              title={t('borders')}
              content={
                <div className="flex flex-wrap gap-1">
                  {borders.map((code) => (
                    <span key={code} className="rounded bg-amber-500 px-3 py-1">
                      {code}
                    </span>
                  ))}
                </div>
              }
            />
          )}

          {postalCode?.format && (
            <DetailSection
              title={t('postCode')}
              content={
                <div>
                  <p>Format: {postalCode.format}</p>
                  {postalCode.regex && (
                    <p className="text-sm">Regex: {postalCode.regex}</p>
                  )}
                </div>
              }
            />
          )}

          {altSpellings?.length > 0 && (
            <DetailSection
              title={t('altNames')}
              content={
                <div className="flex flex-wrap gap-1">
                  {altSpellings.map((name) => (
                    <span key={name} className="rounded bg-amber-500 px-2 py-1">
                      {name}
                    </span>
                  ))}
                </div>
              }
            />
          )}

          {maps && (
            <DetailSection
              title={t('maps')}
              content={
                <div className="space-y-2">
                  <a
                    href={maps.googleMaps}
                    target="_blank"
                    className="block text-blue-600 hover:underline"
                    rel="noreferrer"
                  >
                    Google Maps
                  </a>
                  <a
                    href={maps.openStreetMaps}
                    target="_blank"
                    className="block text-blue-600 hover:underline"
                    rel="noreferrer"
                  >
                    OpenStreetMap
                  </a>
                </div>
              }
            />
          )}
        </div>
      </div>
    </article>
  );
};

const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) => (
  <div>
    <dt className="text-sm font-medium text-black">{label}</dt>
    <dd className="mt-1 text-sm">{value || 'N/A'}</dd>
  </div>
);

const DetailSection = ({
  title,
  content,
}: {
  title: string;
  content: ReactNode;
}) => (
  <div className="border-t pt-2">
    <h3 className="mb-1 text-sm font-semibold text-black">{title}</h3>
    {content}
  </div>
);
