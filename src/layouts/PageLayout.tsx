import { useState } from 'react'
import { Box, Flex, Heading, Spacer, Stack } from '@chakra-ui/react'
import { dummyCalculator, calculators } from '../calculators'
import FavButton from '../components/FavButton'
import ResultCard from '../components/ResultCard'
import DetailsCard from '../components/DetailsCard'
import FormCard from '../components/FormCard'

function findCalculator(searchedId: number) {
	let foundCalc = calculators.find(calculator => calculator.id === searchedId)
	if (typeof foundCalc === 'undefined') foundCalc = dummyCalculator
	return foundCalc
}

function changeDocumentTitle(title: string) {
	if (title !== '') document.title = title + ' – Kalkdoktor'
}

interface ComponentProps {
	calcId: number
}

export default function PageLayout({ calcId }: ComponentProps) {
	const [result, setResult] = useState<number>(0)

	const calculator = findCalculator(calcId)
	const resultInterpretation = calculator.interpretResult(result)

	changeDocumentTitle(calculator.name)

	return (
		<Box maxW='650px' mx='auto' px={4} py={8}>
			<Stack spacing={8}>
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
					resultInterpretation={resultInterpretation.toString()}
				/>

				<DetailsCard
					description={calculator.description}
					sources={calculator.sources}
					methodology={calculator.methodology}
				/>
			</Stack>
		</Box>
	)
}
