import { calculators, Calculator } from './calculators'

export const sortedCalculators = calculators.sort(
	(a: Calculator, b: Calculator) => {
		const keyA = a.name.toLowerCase()
		const keyB = b.name.toLowerCase()
		if (keyA < keyB) return -1
		if (keyA > keyB) return 1
		return 0
	}
)
