// typ do zmiany
export function sumInputValues(setResult: (value: number) => void) {
	const inputs = document.querySelectorAll('input')
	let sum: number = 0

	inputs.forEach(input => {
		if (input.checked) sum += parseInt(input.value)
	})

	setResult(sum)
}
