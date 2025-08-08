import { createBrowserRouter, redirect, type RouteObject } from 'react-router';

import type { IDetailsPageProps, IHomePageProps } from '@/interfaces';

import About from '@/pages/about/About';
import { aboutMe } from '@/pages/about/data';
import Details from '@/pages/details/Details';
import Home from '@/pages/home/Home';
import NotFound from '@/pages/not-found/NotFound';

import { GeneralLayout } from '@/components';

export const routerConfig: RouteObject[] = [
  {
    Component: GeneralLayout,
    errorElement: <div>Main app error</div>,
    children: [
      {
        path: '/',
        Component: Home,
        hydrateFallbackElement: <div>loading...</div>,
        loader: ({ request }): IHomePageProps => {
          const url = new URL(request.url);
          const search = url.searchParams.get('search') || 'all';
          const page = Number(url.searchParams.get('page')) || 1;
          const limit = Number(url.searchParams.get('limit')) || 20;

          return {
            search: search,
            page: page,
            limit: limit,
          };
        },
        children: [
          {
            path: 'details/:country',
            hydrateFallbackElement: <div>loading...</div>,
            Component: Details,
            loader: ({ params }): IDetailsPageProps | undefined => {
              const countryName = params.country;

              if (!countryName) {
                redirect('/');
                return;
              }

              return { countryName };
            },
          },
        ],
      },
      {
        path: 'about',
        hydrateFallbackElement: <div>loading...</div>,
        Component: About,
        loader: () => {
          return aboutMe;
        },
      },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
];

export const router = createBrowserRouter(routerConfig);
