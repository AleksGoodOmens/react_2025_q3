export interface ICountry {
  flags: { png: string; svg: string; alt: string };
  name: {
    common: string;
    official: string;
    nativeName: { spa: { official: string; common: string } };
  };
  capital?: string[];
  area: number;
}
