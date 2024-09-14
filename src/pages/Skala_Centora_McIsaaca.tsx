import { useState } from 'react'
import CustomStack from '../components/CustomStack'
import CustomCheckbox from '../components/CustomCheckbox'
import PageLayout from '../layouts/PageLayout'
import { sumInputValues } from '../functions/sumInputValues'
import CustomRadioGroup from '../components/CustomRadioGroup'
import { Radio } from '@chakra-ui/react'

export default function Skala_Centora_McIsaaca() {
	const [result, setResult] = useState(0)

	const title = 'Skala Centora w modyfikacji McIsaaca'

	const formContent = (
		<CustomStack divider={true}>
			<CustomCheckbox value={1} text='Temperatura ciała powyżej 38°C' />
			<CustomCheckbox value={1} text='Nie występuje kaszel' />
			<CustomCheckbox
				value={1}
				text='Powiększone węzły chłonne szyjne przednie'
			/>
			<CustomCheckbox
				value={1}
				text='Wysięk na migdałkach i ich obrzęk'
			/>
			<CustomRadioGroup text='Wiek'>
				<Radio value='1'>3 – 14 lat</Radio>
				<Radio value='0'>15 – 44 lata</Radio>
				<Radio value='-1'>45 lat lub więcej</Radio>
			</CustomRadioGroup>
		</CustomStack>
	)

	const resultInterpretation = (() => {
		if (result >= 4)
			return 'Przy nasilonych objawach należy stosować antybiotyk. Przy łagodnych objawach zalecane jest wykonanie szybkiego testu na obecność antygenu PBHA lub posiewu wymazu z gardła. Decyzja o leczeniu zależna od wyniku.'
		if (result >= 2 && result <= 3)
			return 'Zalecane jest wykonanie szybkiego testu na obecność antygenu PBHA lub posiewu wymazu z gardła. Decyzja o leczeniu zależna od wyniku.'
		return 'Zalecane leczenie objawowe. Diagnostyka bakteriologiczna nie jest niepotrzebna.'
	})()

	const description: string =
		'Skala Centora w modyfikacji McIsaaca pozwala ustalić, czy patogenami wywołującymi ostre zapalenie gardła są paciorkowce oraz dobrać odpowiedni sposób leczenia.'

	const source = [
		{
			id: 1,
			name: 'Tabela 3.3-1. Skala Centora w modyfikacji McIsaaca – Medycyna Praktyczna',
			link: 'https://www.mp.pl/interna/table/B16.3.3-1.',
		},
	]

	const methodology =
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus reiciendis aperiam placeat nobis, dolorum laborum, nemo, eos quidem esse ducimus expedita amet repellendus nesciunt enim. Quae pariatur numquam aliquam doloremque.'

	return (
		<PageLayout
			calculateResult={sumInputValues}
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
