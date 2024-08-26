import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom'
import Skala_CHA2DS2_VASc from './pages/Skala_CHA2DS2_VASc'
import RootLayout from './layouts/RootLayout'
import Index from './pages/Index'
import Kalkulator_BMI from './pages/Kalkulator_BMI'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<RootLayout />}>
			<Route index element={<Index />} />
			<Route path='skala-cha2ds2-vasc' element={<Skala_CHA2DS2_VASc />} />
			<Route path='kalkulator-bmi' element={<Kalkulator_BMI />} />
		</Route>
	)
)

export default function App() {
	return <RouterProvider router={router} />
}
