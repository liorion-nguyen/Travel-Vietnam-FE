import { Suspense, lazy } from 'react';
import type { RouteObject } from 'react-router';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { hotelsRoutes } from './hotels';
import { toursRoutes } from './tours';
import { aboutRoutes } from './about';
import { profileRoutes } from './profile';

const HomePage = lazy(() => import('src/pages/index'));
const VnPayResult = lazy(() => import('src/pages/vnpay/return-vnpay'));
const Error404Page = lazy(() => import('src/pages/404'));

export const routes: RouteObject[] = [
  {
    element: (
      <>
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </>
    ),
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/vnpay/vnpay_return',
        element: <VnPayResult />,
      },
    ],
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="*"
            element={<Error404Page />}
          />
        </Routes>
      </Suspense>
    ),
  },
  ...hotelsRoutes,
  ...toursRoutes,
  ...aboutRoutes,
  ...profileRoutes,
];
