export interface ICountry {
  flags: Flags;
  name: Name;
  capital: string[];
  borders: string[];
  area: number;
}

interface Flags {
  png: string;
  svg: string;
  alt: string;
}

interface Name {
  common: string;
  official: string;
  nativeName: NativeName;
}

interface NativeName {
  spa: Spa;
}

interface Spa {
  official: string;
  common: string;
}
