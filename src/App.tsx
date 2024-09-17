import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Index from './pages/Index'
import Skala_CHA2DS2_VASc from './pages/Skala_CHA2DS2_VASc'
import Kalkulator_BMI from './pages/Kalkulator_BMI'
import Skala_Centora_McIsaaca from './pages/Skala_Centora_McIsaaca'

// ----- nowe podejscie ----
import NewPageLayout from './layouts/NewPageLayout'
import { calculators } from './calculators'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<RootLayout />}>
			<Route index element={<Index />} />
			<Route path='skala-cha2ds2-vasc' element={<Skala_CHA2DS2_VASc />} />
			<Route
				path='skala-centora-mcisaaca'
				element={<Skala_Centora_McIsaaca />}
			/>
			<Route path='kalkulator-bmi' element={<Kalkulator_BMI />} />
			// ----- nowe podejscie ----
			{calculators.map(c => {
				return (
					<Route
						key={c.id}
						path={c.link}
						element={<NewPageLayout calcId={c.id} />}
					/>
				)
			})}
		</Route>
	)
)

export default function App() {
	return <RouterProvider router={router} />
}
