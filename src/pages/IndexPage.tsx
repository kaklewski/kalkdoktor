import { Calculator, calculators } from '../calculators'
import ListTabsLayout from '../layouts/ListTabsLayout'

const sortedCalculators = calculators.sort((a: Calculator, b: Calculator) => {
	const keyA = a.name.toLowerCase()
	const keyB = b.name.toLowerCase()
	if (keyA < keyB) return -1
	if (keyA > keyB) return 1
	return 0
})

export default function IndexPage() {
	return <ListTabsLayout calculators={sortedCalculators} />
}
