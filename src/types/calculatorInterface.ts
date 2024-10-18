export default interface Calculator {
	id: number
	name: string
	urlPath: string
	category: string
	description: string
	methodology: string | null
	sources:
		| {
				id: number
				name: string
				link: string
		  }[]
		| string
	fields: {
		numberInputs?:
			| {
					id: string | number
					text: string
					min: number
					max: number
			  }[]
			| null
		checkboxes?:
			| {
					id: string | number
					value: number
					text: string
			  }[]
			| null
		radioGroups?:
			| {
					id: string | number
					text: string
					radios: {
						id: string | number
						value: number | string
						hideBadge?: boolean
						text: string
					}[]
			  }[]
			| null
	}
	resultUnit: string | null
	calculateResult: (setResult: (value: number) => void) => void
	interpretResult: (result: number) => string
}
