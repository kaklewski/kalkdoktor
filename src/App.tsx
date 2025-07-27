import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { calculators } from './data/calculators';
import ROUTES from './data/routes';
import RootLayout from './layouts/RootLayout';
import CalculatorPage from './pages/CalculatorPage';
import Error404Page from './pages/Error404Page';
import FavoritesPage from './pages/FavoritesPage';
import HomePage from './pages/HomePage';
import ImportFavoritesPage from './pages/ImportFavoritesPage';
import SubmissionSuccessPage from './pages/SubmissionSuccessPage';
import RouterErrorBoundary from './RouterErrorBoundary';

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
            element={<CalculatorPage calculator={calculator} />}
          />
        ))}
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
}
