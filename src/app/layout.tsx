import { NavigationBar } from 'components/navigation-bar/NavigationBar';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { QueryProvider, ThemeProvider } from 'src/lib/providers';

import './globals.css';

const jetBrains = localFont({
  src: [
    {
      path: '../../public/fonts/JetBrainsMono-Bold.woff2',
      weight: '600',
      style: 'bold',
    },
    {
      path: '../../public/fonts/JetBrainsMono-light.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/JetBrainsMono-regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'Countries AmensGood',
  description: 'app where you can find any information about countries',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
              <NavigationBar />
              <main className="grow">{children}</main>
            </ThemeProvider>
          </QueryProvider>
        </div>
      </body>
    </html>
  );
}
