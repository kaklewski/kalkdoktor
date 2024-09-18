import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import IndexPage from './pages/IndexPage'
import CalculatorPageLayout from './layouts/CalculatorPageLayout'
import { calculators } from './calculators'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<RootLayout />}>
			<Route index element={<IndexPage />} />
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
