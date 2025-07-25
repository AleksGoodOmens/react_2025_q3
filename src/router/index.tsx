import About from '@/pages/about/About';
import Home from '@/pages/home/Home';
import NotFound from '@/pages/not-found/NotFound';
import { getCountries, getCountry } from '@/service/CountryAPI';
import { createBrowserRouter, redirect } from 'react-router';

import { Details, GeneralLayout } from '@/components';

export const router = createBrowserRouter([
  {
    Component: GeneralLayout,
    errorElement: <div>Main app error</div>,
    children: [
      {
        path: '/',
        Component: Home,
        hydrateFallbackElement: <div>loading...</div>,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const search = url.searchParams.get('search') || '';
          const page = Number(url.searchParams.get('page')) || 1;
          const limit = Number(url.searchParams.get('limit')) || 20;

          const { countries, error } = await getCountries(
            search ? `translation/${search}` : 'all'
          );

          const offset = (page - 1) * limit;
          const end = offset + limit;

          const filteredCountries = countries.slice(offset, end);

          return {
            countries: filteredCountries,
            search: search,
            prev: page <= 1,
            next: page < Math.ceil(countries.length / limit),
            page: page,
            limit: limit,
            total: countries.length,
            error: error,
          };
        },
        children: [
          {
            path: 'details/:country',
            Component: Details,
            loader: async ({ params }) => {
              const countryName = params.country;

              if (!countryName) {
                redirect('/');
                return;
              }
              const country = await getCountry(countryName);

              return { country };
            },
          },
        ],
      },
      {
        path: 'about',
        Component: About,
      },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]);
