import { Radio } from '@chakra-ui/react'
import { useState } from 'react'
import PageLayout from '../layouts/PageLayout'
import CustomCheckbox from '../components/CustomCheckbox'
import CustomRadioGroup from '../components/CustomRadioGroup'
import CustomStack from '../components/CustomStack'

export default function Skala_CHA2DS2_VASc() {
	const [result, setResult] = useState(0)

	const title = (
		<span>
			Skala CHA<sub>2</sub>DS<sub>2</sub>-VASc
		</span>
	)

	const formContent = (
		<CustomStack divider={true}>
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
			<CustomRadioGroup text='Płeć'>
				<Radio value='0' id='man'>
					Mężczyzna
				</Radio>
				<Radio value='1'>Kobieta</Radio>
			</CustomRadioGroup>
			<CustomRadioGroup text='Wiek'>
				<Radio value='0'>Mniej niż 65 lat</Radio>
				<Radio value='1'>65 – 74 lata</Radio>
				<Radio value='2'>75 lat lub więcej</Radio>
			</CustomRadioGroup>
		</CustomStack>
	)

	const resultInterpretation = (() => {
		const sexCheckbox = document.getElementById('man') as HTMLInputElement
		const isMan = sexCheckbox ? sexCheckbox.checked : true

		const lowRisk: string =
			'Niskie ryzyko powikłań. Nie zaleca się leczenia.'
		const mediumRisk: string =
			'Umiarkowane ryzyko powikłań. Można rozważyć doustny antykoagulant.'
		const highRisk: string =
			'Wysokie ryzyko powikłań. Należy zastosować doustny antykoagulant.'

		if (isMan) {
			if (result <= 0) return lowRisk
			if (result == 1) return mediumRisk
			if (result >= 2) return highRisk
		} else {
			if (result <= 1) return lowRisk
			if (result == 2) return mediumRisk
			if (result >= 3) return highRisk
		}
		return lowRisk
	})()

	const description: string =
		'Skala CHA₂DS₂-VASc służy do oceny ryzyka wystąpienia powikłań zakrzepowo–zatorowych u pacjentów z migotaniem przedsionków. Pozwala wskazać pacjentów, u których konieczne jest wdrożenie terapii przeciwpłytkowej lub przeciwzakrzepowej.'

	const source = [
		{
			id: 1,
			name: 'CHA₂DS₂-VASc Score for Atrial Fibrillation Stroke Risk – MDCalc',
			link: 'https://www.mdcalc.com/calc/801/cha2ds2-vasc-score-atrial-fibrillation-stroke-risk',
		},
	]

	const methodology =
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus reiciendis aperiam placeat nobis, dolorum laborum, nemo, eos quidem esse ducimus expedita amet repellendus nesciunt enim. Quae pariatur numquam aliquam doloremque.'

	function calculateResult(setResult: (value: number) => void) {
		const inputs = document.querySelectorAll('input')
		let sum: number = 0

		inputs.forEach(input => {
			if (input.checked) sum += parseInt(input.value)
		})

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
