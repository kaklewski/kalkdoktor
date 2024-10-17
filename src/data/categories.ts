import { calculators } from './calculators'

export const categories: string[] = (() => {
	let categoryArray: string[] = []

	calculators.forEach(calculator => {
		if (!categoryArray.includes(calculator.category))
			categoryArray.push(calculator.category)
	})

	return categoryArray.sort()
})()
