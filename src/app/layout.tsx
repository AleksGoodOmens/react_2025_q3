import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { NavigationBar } from 'src/app/components/ui/navigation-bar/NavigationBar';
import { QueryProvider, ThemeProvider } from 'src/lib/providers';

import './globals.css';

import { Heading } from 'components/ui/Heading';
import { PropsWithChildren, Suspense } from 'react';

const jetBrains = localFont({
  src: [
    {
      path: 'fonts/JetBrainsMono-Bold.woff2',
      weight: '600',
      style: 'bold',
    },
    {
      path: 'fonts/JetBrainsMono-light.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: 'fonts/JetBrainsMono-regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'Countries AmensGood',
  description: 'app where you can find any information about countries',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <div
          id="root"
          className={
            (jetBrains.className,
            'container mx-auto flex min-h-dvh flex-col gap-4 p-2')
          }
        >
          <QueryProvider>
            <ThemeProvider>
              <main className="grow">
                <Suspense fallback={<div>Loading nav...</div>}>
                  <NavigationBar />
                </Suspense>
                <Heading variant="main" Tag="h1">
                  Countries by AmensGood
                </Heading>

                {children}
              </main>
            </ThemeProvider>
          </QueryProvider>
        </div>
      </body>
    </html>
  );
}
