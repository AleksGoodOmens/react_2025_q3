import { Heading } from 'components/ui/Heading';
import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import React, { PropsWithChildren } from 'react';
import { Providers } from 'src/app/components/providers/providers';
import { NavigationBar } from 'src/app/components/ui/navigation-bar/NavigationBar';
import jetBrains from 'src/app/fonts/fonts';

import '../globals.css';

import { Locale } from '../components/ui/locale-changer/locale-changer';
import { getTranslations } from 'next-intl/server';
import { routing } from 'src/i18n/routing';

interface Props extends PropsWithChildren {
  params: Promise<{ locale: Locale }>;
}

export const metadata: Metadata = {
  title: 'Countries AmensGood',
  description: 'app where you can find any information about countries',
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }];
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'heading' });
  let messages;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body>
        <div id="root">
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Providers>
              <NavigationBar />
              <main
                className={
                  (jetBrains.className,
                  'container mx-auto flex min-h-dvh flex-col gap-4 p-2')
                }
              >
                <Heading variant="main" Tag="h1">
                  {t('title')}
                </Heading>
                {children}
              </main>
            </Providers>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
