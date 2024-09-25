import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import IndexPage from './pages/IndexPage'
import CalculatorPage from './pages/CalculatorPage'
import { calculators } from './data/calculators-and-categories'
import FavPage from './pages/FavPage'
import AddFavPage from './pages/AddFavPage'
import Error404 from './components/Error404'

export default function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<RootLayout />}>
				<Route index element={<IndexPage />} />
				<Route path='ulubione' element={<FavPage />} />
				<Route path='dodaj-ulubione' element={<AddFavPage />} />
				// Generate a route for every calculator
				{calculators.map(calculator => (
					<Route
						key={calculator.id}
						path={calculator.link}
						element={<CalculatorPage calculator={calculator} />}
					/>
				))}
				<Route path='*' element={<Error404 />} />
			</Route>
		)
	)

	return <RouterProvider router={router} />
}
