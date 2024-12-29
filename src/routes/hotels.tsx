import { Suspense, lazy } from 'react';
import type { RouteObject } from 'react-router';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';

const HotelsPage = lazy(() => import('src/pages/hotels/index'));
const HotelBookingPage = lazy(() => import('src/pages/hotels/hotel-booking'));
// const RoomsBookingPage = lazy(() => import('src/pages/hotels/rooms-booking'));
const Error404Page = lazy(() => import('src/pages/404'));

export const hotelsRoutes: RouteObject[] = [
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
        path: '/hotels',
        element: <HotelsPage />,
      },
      {
        path: '/hotels/:hotelId',
        element: <HotelBookingPage />,
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
