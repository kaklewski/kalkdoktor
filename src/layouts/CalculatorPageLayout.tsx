import { useEffect, useState } from 'react'
import { Flex, Heading, Spacer } from '@chakra-ui/react'
import FavButton from '../components/FavButton'
import ResultCard from '../components/ResultCard'
import DetailsCard from '../components/DetailsCard'
import FormCard from '../components/FormCard'
import { Calculator } from '../data/calculators-and-categories'

interface ComponentProps {
	calculator: Calculator
}

export default function CalculatorPageLayout({ calculator }: ComponentProps) {
	const [result, setResult] = useState<number>(0)

	useEffect(() => {
		// Add calculator name to the page title
		document.title = calculator.name + ' – Kalkdoktor'
	}, [])

	return (
		<>
			<Flex>
				<Heading as='h1'>{calculator.name}</Heading>
				<Spacer />
				<FavButton pageId={calculator.id} />
			</Flex>

			<FormCard
				numberInputs={calculator.fields.numberInputs}
				checkboxes={calculator.fields.checkboxes}
				radioGroups={calculator.fields.radioGroups}
				calculateResult={calculator.calculateResult}
				setResult={setResult}
			/>

			<ResultCard
				result={result}
				interpretResult={calculator.interpretResult}
			/>

			<DetailsCard
				description={calculator.description}
				sources={calculator.sources}
				methodology={calculator.methodology}
			/>
		</>
	)
}
