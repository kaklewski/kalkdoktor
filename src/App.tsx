import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Index from './pages/Index'
import PageLayout from './layouts/PageLayout'
import { calculators } from './calculators'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<RootLayout />}>
			<Route index element={<Index />} />

			{calculators.map(calculator => {
				return (
					<Route
						key={calculator.id}
						path={calculator.link}
						element={<PageLayout calcId={calculator.id} />}
					/>
				)
			})}
		</Route>
	)
)

export default function App() {
	return <RouterProvider router={router} />
}
