import { Suspense, lazy } from 'react';
import type { RouteObject } from 'react-router';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';

const ToursPage = lazy(() => import('src/pages/tours/index'));
const TourBookingPage = lazy(() => import('src/pages/tours/tour-booking'));
const Error404Page = lazy(() => import('src/pages/404'));

export const toursRoutes: RouteObject[] = [
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
        path: '/tours',
        element: <ToursPage />,
      },
      {
        path: '/tours/:tourId',
        element: <TourBookingPage />,
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
];
