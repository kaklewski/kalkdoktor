import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import HomePage from './pages/HomePage'
import CalculatorPage from './pages/CalculatorPage'
import { calculators } from './data/calculators'
import FavoritesPage from './pages/FavoritesPage'
import ImportFavoritesPage from './pages/ImportFavoritesPage'
import Error404Page from './pages/Error404Page'
import RouterErrorBoundary from './RouterErrorBoundary'
import SubmissionSuccessPage from './pages/SubmissionSuccessPage'

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />} errorElement={<RouterErrorBoundary />}>
        <Route index element={<HomePage />} />
        <Route path='*' element={<Error404Page />} />
        <Route path='ulubione' element={<FavoritesPage />} />
        <Route path='importuj-ulubione' element={<ImportFavoritesPage />} />
        <Route path='sukces' element={<SubmissionSuccessPage />} />

        {calculators.map(calculator => (
          <Route
            key={calculator.id}
            path={calculator.urlPath}
            element={<CalculatorPage calculator={calculator} />}
          />
        ))}
      </Route>
    )
  )

  return <RouterProvider router={router} />
}
