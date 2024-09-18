import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Index from './pages/Index'
import CalculatorPageLayout from './layouts/CalculatorPageLayout'
import { calculators } from './calculators'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<RootLayout />}>
			<Route index element={<Index />} />
			// Generate a route for every calculator
			{calculators.map(calculator => (
				<Route
					key={calculator.id}
					path={calculator.link}
					element={<CalculatorPageLayout calcId={calculator.id} />}
				/>
			))}
		</Route>
	)
)

export default function App() {
	return <RouterProvider router={router} />
}
