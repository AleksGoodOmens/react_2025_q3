import { Button } from '../button/Button';
import type { IDetailedCountry } from '@/interfaces';
import {
  useLoaderData,
  useNavigate,
  useNavigation,
  useSearchParams,
} from 'react-router';

interface loaderData {
  country: IDetailedCountry;
}

export const Details = () => {
  const { state } = useNavigation();
  const { country } = useLoaderData<loaderData>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate({ pathname: '/', search: searchParams.toString() });
  };

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

  if (state === 'loading') return <div>loading...</div>;

  return (
    <section className="animate-fadeIn mx-auto flex-4/6 self-start rounded-2xl border-2 border-black bg-amber-800 p-6 text-white shadow-md">
      <header className="mb-4 flex justify-between gap-2">
        <div>
          <h2 className="text-3xl font-bold">
            {name?.official || name?.common}
          </h2>
          {name?.common !== name?.official && (
            <h2 className="text-xl">{name?.common}</h2>
          )}
        </div>
        <Button className="self-start" variant="ghost" onClick={handleClose}>
          X
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {flags?.png && (
              <img
                src={flags.png}
                alt={flags.alt || `Flag of ${name?.common}`}
                className="aspect-video h-32 border object-cover"
              />
            )}
            {coatOfArms?.png && (
              <img
                src={coatOfArms.png}
                alt={`Coat of arms of ${name?.common}`}
                className="aspect-square h-32 object-cover"
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <DetailItem label="Region" value={region} />
            <DetailItem label="Subregion" value={subregion} />
            <DetailItem label="Capital" value={capital?.join(', ')} />
            <DetailItem label="Area" value={`${area?.toLocaleString()} km²`} />
            <DetailItem
              label="Population"
              value={population?.toLocaleString()}
            />
            <DetailItem label="Status" value={status} />
            <DetailItem
              label="Independent"
              value={independent ? 'Yes' : 'No'}
            />
          </div>

          {idd?.root && (
            <div>
              <h3 className="mb-2 text-lg font-semibold">Calling Codes</h3>
              <div className="flex flex-wrap gap-2">
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
              title="Languages"
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
              title="Currencies"
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
              title="Timezones"
              content={
                <div className="flex flex-wrap gap-2">
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
              title="Bordering Countries"
              content={
                <div className="flex flex-wrap gap-2">
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
              title="Postal Code"
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
              title="Alternative Names"
              content={
                <div className="flex flex-wrap gap-2">
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
              title="Maps"
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
    </section>
  );
};

export const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) => (
  <div>
    <dt className="text-sm font-medium">{label}</dt>
    <dd className="mt-1 text-sm">{value || 'N/A'}</dd>
  </div>
);

export const DetailSection = ({
  title,
  content,
}: {
  title: string;
  content: React.ReactNode;
}) => (
  <div className="border-t pt-2">
    <h3 className="mb-1 text-lg font-semibold">{title}</h3>
    {content}
  </div>
);
