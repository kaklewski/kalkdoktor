import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import IndexPage from './pages/IndexPage'
import CalculatorPageLayout from './layouts/CalculatorPageLayout'
import { calculators } from './data/calculators-and-categories'
import FavoritesPage from './pages/FavoritesPage'
import AddFavPage from './pages/AddFavPage'

export default function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<RootLayout />}>
				<Route index element={<IndexPage />} />
				<Route path='ulubione' element={<FavoritesPage />} />
				<Route path='dodaj-ulubione' element={<AddFavPage />} />
				// Generate a route for every calculator
				{calculators.map(calculator => (
					<Route
						key={calculator.id}
						path={calculator.link}
						element={
							<CalculatorPageLayout calculator={calculator} />
						}
					/>
				))}
			</Route>
		)
	)

	return <RouterProvider router={router} />
}
