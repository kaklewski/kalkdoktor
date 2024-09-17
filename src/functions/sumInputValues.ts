// typ do zmiany
export function sumInputValues(setResult: (value: number) => void, event: any) {
	//Block the page from reloading
	event.preventDefault()

	const inputs = document.querySelectorAll('input')
	let sum: number = 0

	inputs.forEach(input => {
		if (input.checked) sum += parseInt(input.value)
	})

	setResult(sum)
}
