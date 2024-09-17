import { Box, Flex, Heading, Spacer, Stack } from '@chakra-ui/react'
import { calculators } from '../calculators'
import FavButton from '../components/FavButton'
import { useState } from 'react'

import ResultCard from '../components/ResultCard'
import DetailsCard from '../components/DetailsCard'
import FormCard from '../components/FormCard'

function findCalculator(searchedId: number) {
	for (const calculator of calculators) {
		if (calculator.id === searchedId) return calculator
	}
}

function changeDocumentTitle(title: string | undefined) {
	if (typeof title === 'string') document.title = title + ' – Kalkdoktor'
}

interface Props {
	calcId: number
}

export default function PageLayout({ calcId }: Props) {
	const [result, setResult] = useState(0)

	const calculator = findCalculator(calcId)
	let resultInterpretation = calculator?.interpretResult(result)
	if (typeof resultInterpretation === 'undefined') resultInterpretation = ''

	changeDocumentTitle(calculator?.name)

	return (
		<Box maxW='650px' mx='auto' px={4} py={8}>
			<Stack spacing={8}>
				<Flex>
					<Heading as='h1'>{calculator?.name}</Heading>
					<Spacer />
					<FavButton />
				</Flex>

				<FormCard calculator={calculator} setResult={setResult} />

				<ResultCard
					result={result}
					resultInterpretation={resultInterpretation.toString()}
				/>

				<DetailsCard
					description={calculator?.description}
					sources={calculator?.sources}
					methodology={calculator?.methodology}
				/>
			</Stack>
		</Box>
	)
}
