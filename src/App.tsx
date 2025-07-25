import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';
import CalculatorPage from './pages/CalculatorPage';
import { calculators } from './data/calculators';
import FavoritesPage from './pages/FavoritesPage';
import ImportFavoritesPage from './pages/ImportFavoritesPage';
import Error404Page from './pages/Error404Page';
import RouterErrorBoundary from './RouterErrorBoundary';
import SubmissionSuccessPage from './pages/SubmissionSuccessPage';

import ROUTES from './data/routes';

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path={ROUTES.HOME} element={<RootLayout />} errorElement={<RouterErrorBoundary />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
        <Route path={ROUTES.IMPORT_FAVORITES} element={<ImportFavoritesPage />} />
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
