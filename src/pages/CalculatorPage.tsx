import { useEffect, useState } from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import FavButton from '../components/FavButton'
import ResultCard from '../components/ResultCard'
import DetailsCard from '../components/DetailsCard'
import FormCard from '../components/FormCard'
import { Calculator } from '../data/calculators'

interface ComponentProps {
	calculator: Calculator
}

export default function CalculatorPage({ calculator }: ComponentProps) {
	const [result, setResult] = useState<number>(0)

	useEffect(() => {
		// Add calculator name to the page title
		document.title = calculator.name + ' - Kalkdoktor'
	}, [])

	return (
		<>
			<Flex justify='space-between' gap={2}>
				<Heading as='h1'>{calculator.name}</Heading>
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
				resultUnit={calculator.resultUnit}
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
