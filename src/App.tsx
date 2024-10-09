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
import AddFavPage from './pages/AddFavoriteCalculatorsPage'
import Error404 from './components/Error404'
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
				<Route path='dodaj-ulubione' element={<AddFavPage />} />
				// Generate a route for every calculator
				{calculators.map(calculator => (
					<Route
						key={calculator.id}
						path={calculator.urlPath}
						element={<CalculatorPage calculator={calculator} />}
					/>
				))}
				<Route path='*' element={<Error404 />} />
			</Route>
		)
	)

	return <RouterProvider router={router} />
}
