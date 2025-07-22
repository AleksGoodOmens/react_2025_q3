import About from '@/pages/about/About';
import Home from '@/pages/home/Home';
import NotFound from '@/pages/not-found/NotFound';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
    loader: () => {},
  },
  {
    path: '/about',
    Component: About,
    loader: () => {},
  },
  {
    path: '*',
    Component: NotFound,
  },
]);
