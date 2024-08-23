import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom'
import Skala_CHA2DS2_VASc from './pages/Skala_CHA2DS2_VASc'
import RootLayout from './layouts/RootLayout'
import Index from './pages/Index'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<RootLayout />}>
			<Route index element={<Index />} />
			<Route path='skala-cha2ds2-vasc' element={<Skala_CHA2DS2_VASc />} />
		</Route>
	)
)

export default function App() {
	return <RouterProvider router={router} />
}
