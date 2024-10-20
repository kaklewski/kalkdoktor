import { useEffect, useState } from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import FavButton from '../components/FavButton'
import ResultCard from '../components/ResultCard'
import DetailsCard from '../components/DetailsCard'
import FormCard from '../components/FormCard'
import Calculator from '../types/calculatorInterface'
import useDocumentTitle from '../hooks/useDocumentTitle'

interface ComponentProps {
	calculator: Calculator
}

export default function CalculatorPage({ calculator }: ComponentProps) {
	const {
		id,
		name,
		fields,
		calculateResult,
		resultUnit,
		getResultInterpretation,
		sources,
		description,
		methodology,
	} = calculator
	const [result, setResult] = useState<number>(0)
	const [resultInterpretation, setResultInterpretation] = useState<string>(
		getResultInterpretation(result)
	)

	useEffect(() => {
		setResultInterpretation(getResultInterpretation(result))
	}, [result])

	useDocumentTitle(name)

	return (
		<>
			<Flex justify='space-between' gap={2}>
				<Heading as='h1'>{name}</Heading>
				<FavButton pageId={id} />
			</Flex>

			<FormCard
				numberInputs={fields.numberInputs}
				checkboxes={fields.checkboxes}
				radioGroups={fields.radioGroups}
				calculateResult={calculateResult}
				setResult={setResult}
				result={result}
				getResultInterpretation={getResultInterpretation}
				setResultInterpretation={setResultInterpretation}
			/>

			<ResultCard
				result={result}
				resultUnit={resultUnit}
				resultInterpretation={resultInterpretation}
			/>

			<DetailsCard
				description={description}
				sources={sources}
				methodology={methodology}
			/>
		</>
	)
}
