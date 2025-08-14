import { PropsWithChildren } from 'react';
import { QueryProvider, ThemeProvider } from 'src/lib/providers';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryProvider>
  );
};
