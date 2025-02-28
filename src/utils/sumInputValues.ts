export default function sumInputValues() {
  const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('input')
  let sum: number = 0

  inputs.forEach(input => {
    if (input.checked && isNaN(parseInt(input.value)) === false) {
      sum += parseInt(input.value)
    }
  })

  return sum
}
