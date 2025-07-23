import About from '@/pages/about/About';
import Details from '@/pages/details/Details';
import Home from '@/pages/home/Home';
import NotFound from '@/pages/not-found/NotFound';
import { createBrowserRouter } from 'react-router';

import { GeneralLayout } from '@/components';

export const router = createBrowserRouter([
  {
    Component: GeneralLayout,
    errorElement: <div>Main app error</div>,
    children: [
      {
        path: '/',
        Component: Home,
        loader: () => {},
        children: [
          {
            path: 'details/:countryName',
            Component: Details,
            errorElement: <div>details page error</div>,
            loader: () => {},
          },
        ],
      },
      {
        path: '/about',
        Component: About,
        loader: () => {},
      },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]);
