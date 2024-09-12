import {
	Box,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Stack,
	Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import PageLayout from '../layouts/PageLayout'

export default function Kalkulator_BMI() {
	const [result, setResult] = useState(1)
	const [resultDescription, setResultDescription] = useState('Uzupełnij pola')

	useEffect(() => {
		provideInterpretation()
	}, [result])

	const title = <span>Kalkulator BMI</span>

	const formContent = (
		<Stack spacing={4}>
			<Box>
				<Text>Masa ciała (kg):</Text>
				<NumberInput defaultValue={1} min={1} max={200} id='bodyMass'>
					<NumberInputField />
					<NumberInputStepper>
						<NumberIncrementStepper />
						<NumberDecrementStepper />
					</NumberInputStepper>
				</NumberInput>
			</Box>
			<Box>
				<Text>Wzrost (cm):</Text>
				<NumberInput defaultValue={1} min={1} max={230} id='height'>
					<NumberInputField />
					<NumberInputStepper>
						<NumberIncrementStepper />
						<NumberDecrementStepper />
					</NumberInputStepper>
				</NumberInput>
			</Box>
		</Stack>
	)

	const description: string =
		'Skala służąca do oceny ryzyka wystąpienia powikłań zakrzepowo–zatorowych u pacjentów z migotaniem przedsionków. Skala umożliwia wskazanie pacjentów z migotaniem przedsionków, u których konieczne jest wdrożenie terapii przeciwpłytkowej lub przeciwzakrzepowej.'

	const source =
		'https://www.mdcalc.com/calc/801/cha2ds2-vasc-score-atrial-fibrillation-stroke-risk'

	const interpretation =
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

	function provideInterpretation() {
		let resultDescriptionText: string = 'Niedowaga'

		if (result === 0) resultDescriptionText = 'Podaj wszystkie informacje'
		if (result < 18.5 && result < 0) resultDescriptionText = 'Niedowaga'
		if (result >= 18.5 && result < 25)
			resultDescriptionText = 'Wartość prawidłowa'
		if (result >= 25 && result < 30) resultDescriptionText = 'Nadwaga'
		if (result >= 30 && result < 35)
			resultDescriptionText = 'Otyłość I stopnia'
		if (result >= 35 && result < 40)
			resultDescriptionText = 'Otyłość II stopnia'
		if (result >= 40) resultDescriptionText = 'Otyłość III stopnia'

		setResultDescription(resultDescriptionText)
	}

	return (
		<PageLayout
			calculateResult={calculateResult}
			setResult={setResult}
			title={title}
			formContent={formContent}
			result={result}
			resultDescription={resultDescription}
			description={description}
			source={source}
			interpretation={interpretation}
		/>
	)
}
