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

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<RootLayout />}>
			<Route index element={<IndexPage />} />
			<Route path='ulubione' element={<FavoritesPage />} />
			// Generate a route for every calculator
			{calculators.map(calculator => (
				<Route
					key={calculator.id}
					path={calculator.link}
					element={<CalculatorPageLayout calculator={calculator} />}
				/>
			))}
		</Route>
	)
)

export default function App() {
	return <RouterProvider router={router} />
}
