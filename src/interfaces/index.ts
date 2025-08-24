export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface ErrorsMessageTypes {
  name?: string[];
  age?: string[];
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
  gender?: string[];
  tc?: string[];
  file?: string[];
  country?: string[];
}

export interface Item {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female';
  tc?: 'on';
  file: [];
  country: string;
}
