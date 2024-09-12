import {
	Box,
	Checkbox,
	Radio,
	RadioGroup,
	Stack,
	StackDivider,
	Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import PageLayout from '../layouts/PageLayout'
import CustomCheckbox from '../components/CustomCheckbox'

export default function Skala_CHA2DS2_VASc() {
	const lowRiskText: string =
		'Niskie ryzyko powikłań. Nie zaleca się leczenia.'
	const mediumRiskText: string =
		'Umiarkowane ryzyko powikłań. Można rozważyć doustny antykoagulant.'
	const highRiskText: string =
		'Wysokie ryzyko powikłań. Należy zastosować doustny antykoagulant.'

	const [result, setResult] = useState(0)
	const [resultDescription, setResultDescription] = useState(lowRiskText)

	useEffect(() => {
		provideInterpretation()
	}, [result])

	const title = (
		<span>
			Skala CHA<sub>2</sub>DS<sub>2</sub>-VASc
		</span>
	)

	const formContent = (
		<Stack divider={<StackDivider />} spacing={4}>
			<CustomCheckbox
				value={1}
				text='Zastoinowa niewydolność serca / dysfunkcja lewej komory'
			/>

			<CustomCheckbox value={1} text='Nadciśnienie tętnicze' />

			<CustomCheckbox value={1} text='Cukrzyca' />

			<CustomCheckbox
				value={1}
				text='Choroba naczyniowa (przebyty zawał serca, miażdżycowa
					choroba tętnic obwodowych, blaszki miażdżycowe w aorcie)'
			/>

			<CustomCheckbox
				value={2}
				text='Przebyty udar mózgu / TIA / incydent zakrzepowo-zatorowy'
			/>

			<Box>
				<RadioGroup defaultValue='0' colorScheme='teal'>
					<Stack>
						<Text>Płeć:</Text>
						<Radio value='0' id='man'>
							Mężczyzna
						</Radio>
						<Radio value='1'>Kobieta</Radio>
					</Stack>
				</RadioGroup>
			</Box>

			<Box>
				<RadioGroup defaultValue='0' colorScheme='teal'>
					<Stack>
						<Text>Wiek:</Text>
						<Radio value='0'>Mniej niż 65 lat</Radio>
						<Radio value='1'>65 – 74 lata</Radio>
						<Radio value='2'>75 lat lub więcej</Radio>
					</Stack>
				</RadioGroup>
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
		const inputs = document.querySelectorAll('input')
		let sum: number = 0

		inputs.forEach(input => {
			if (input.checked) sum += parseInt(input.value)
		})

		setResult(sum)
	}

	function provideInterpretation() {
		const isMan = (document.getElementById('man') as HTMLInputElement)
			.checked
		let resultDescriptionText: string = lowRiskText

		if (isMan) {
			if (result <= 0) resultDescriptionText = lowRiskText
			if (result == 1) resultDescriptionText = mediumRiskText
			if (result >= 2) resultDescriptionText = highRiskText
		} else {
			if (result <= 1) resultDescriptionText = lowRiskText
			if (result == 2) resultDescriptionText = mediumRiskText
			if (result >= 3) resultDescriptionText = highRiskText
		}

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
