import { Providers } from './providers/providers';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';

import './globals.css';

import { NavigationBar } from './components/ui/navigation-bar/NavigationBar';
import jetBrains from './fonts/fonts';
import { Heading } from 'components/ui/Heading';

export const metadata: Metadata = {
  title: 'Countries AmensGood',
  description: 'app where you can find any information about countries',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <div id="root">
          <Providers>
            <NavigationBar />
            <main
              className={
                (jetBrains.className,
                'container mx-auto flex min-h-dvh flex-col gap-4 p-2')
              }
            >
              <Heading variant="main" Tag="h1">
                Countries by AmensGood
              </Heading>
              {children}
            </main>
          </Providers>
        </div>
      </body>
    </html>
  );
}
