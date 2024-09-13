import { Stack } from '@chakra-ui/react'
import { useState } from 'react'
import PageLayout from '../layouts/PageLayout'
import CustomNumberInput from '../components/CustomNumberInput'

export default function Kalkulator_BMI() {
	const [result, setResult] = useState(0)

	const title = <span>Kalkulator BMI</span>

	const formContent = (
		<Stack spacing={6}>
			<CustomNumberInput
				text='Masa ciała (kg)'
				min={1}
				max={200}
				id='bodyMass'
			/>

			<CustomNumberInput
				text='Wzrost (cm)'
				min={1}
				max={230}
				id='height'
			/>
		</Stack>
	)

	const resultInterpretation = (() => {
		if (result === 0) return 'Podaj wszystkie informacje'
		if (result > 0 && result < 18.5) return 'Niedowaga'
		if (result >= 18.5 && result < 25) return 'Wartość prawidłowa'
		if (result >= 25 && result < 30) return 'Nadwaga'
		if (result >= 30 && result < 35) return 'Otyłość I stopnia'
		if (result >= 35 && result < 40) return 'Otyłość II stopnia'
		if (result >= 40) return 'Otyłość III stopnia'
		return ''
	})()

	const description: string =
		'Skala służąca do oceny ryzyka wystąpienia powikłań zakrzepowo–zatorowych u pacjentów z migotaniem przedsionków. Skala umożliwia wskazanie pacjentów z migotaniem przedsionków, u których konieczne jest wdrożenie terapii przeciwpłytkowej lub przeciwzakrzepowej.'

	const source =
		'https://www.mdcalc.com/calc/801/cha2ds2-vasc-score-atrial-fibrillation-stroke-risk'

	const methodology =
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus reiciendis aperiam placeat nobis, dolorum laborum, nemo, eos quidem esse ducimus expedita amet repellendus nesciunt enim. Quae pariatur numquam aliquam doloremque.'

	function calculateResult(setResult: (value: number) => void) {
		const bodyMass = parseInt(
			(document.getElementById('bodyMass') as HTMLInputElement).value
		)
		const height =
			parseInt(
				(document.getElementById('height') as HTMLInputElement).value
			) / 100
		let sum: number = parseInt((bodyMass / (height * height)).toFixed(2))

		if (Number.isNaN(sum)) sum = 0

		setResult(sum)
	}

	return (
		<PageLayout
			calculateResult={calculateResult}
			setResult={setResult}
			title={title}
			formContent={formContent}
			result={result}
			resultInterpretation={resultInterpretation}
			description={description}
			source={source}
			methodology={methodology}
		/>
	)
}
