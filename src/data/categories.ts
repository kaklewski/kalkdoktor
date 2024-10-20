import { calculators } from './calculators'

function getCategories() {
	const categoriesArray: string[] = []

	calculators.forEach(calculator => {
		if (!categoriesArray.includes(calculator.category)) {
			categoriesArray.push(calculator.category)
		}
	})

	return categoriesArray.sort()
}

export const categories: string[] = getCategories()
