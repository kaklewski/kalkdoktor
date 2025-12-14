import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Loader from './components/other/Loader';
import { calculators } from './data/calculators';
import ROUTES from './data/routes';
import RootLayout from './layouts/RootLayout';
import CalculatorPageWrapper from './pages/CalculatorPageWrapper';
import RouterErrorBoundary from './RouterErrorBoundary';

const Error404Page = lazy(() => import('./pages/Error404Page'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const ImportFavoritesPage = lazy(() => import('./pages/ImportFavoritesPage'));
const SubmissionSuccessPage = lazy(
  () => import('./pages/SubmissionSuccessPage'),
);

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path={ROUTES.HOME}
        element={<RootLayout />}
        errorElement={<RouterErrorBoundary />}
      >
        <Route index element={<HomePage />} />
        <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
        <Route
          path={ROUTES.IMPORT_FAVORITES}
          element={<ImportFavoritesPage />}
        />
        <Route path={ROUTES.SUCCESS} element={<SubmissionSuccessPage />} />
        <Route path="*" element={<Error404Page />} />

        {calculators.map((calculator) => (
          <Route
            key={calculator.id}
            path={calculator.urlPath}
            element={<CalculatorPageWrapper calculator={calculator} />}
          />
        ))}
      </Route>,
    ),
  );

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
