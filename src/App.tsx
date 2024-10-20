import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import IndexPage from './pages/IndexPage'
import CalculatorPage from './pages/CalculatorPage'
import { calculators } from './data/calculators'
import FavPage from './pages/FavoritesPage'
import ImportFavoritesPage from './pages/ImportFavoritesPage'
import Error404Page from './pages/Error404Page'
import RouterErrorBoundary from './RouterErrorBoundary'

export default function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route
				path='/'
				element={<RootLayout />}
				errorElement={<RouterErrorBoundary />}>
				<Route index element={<IndexPage />} />
				<Route path='ulubione' element={<FavPage />} />
				<Route
					path='importuj-ulubione'
					element={<ImportFavoritesPage />}
				/>
				// Generate a route for every calculator
				{calculators.map(calculator => (
					<Route
						key={calculator.id}
						path={calculator.urlPath}
						element={<CalculatorPage calculator={calculator} />}
					/>
				))}
				<Route path='*' element={<Error404Page />} />
			</Route>
		)
	)

	return <RouterProvider router={router} />
}
