import { Box, Flex, Heading, Spacer, Stack } from '@chakra-ui/react'
import FavButton from '../components/FavButton'
import FormCard from '../components/FormCard'
import ResultCard from '../components/ResultCard'
import DetailsCard from '../components/DetailsCard'

interface Props {
	calculateResult: any
	setResult: any
	title: JSX.Element
	formContent: JSX.Element
	result: number
	resultInterpretation: string
	description: string
	source: any
	methodology: string
}

export default function PageLayout({
	calculateResult,
	setResult,
	title,
	formContent,
	result,
	resultInterpretation,
	description,
	source,
	methodology,
}: Props) {
	return (
		<Box maxW='650px' mx='auto' px={4} py={8}>
			<Stack spacing={8}>
				<Flex>
					<Heading as='h1'>{title} </Heading>

					<Spacer />

					<FavButton />
				</Flex>

				<FormCard
					formContent={formContent}
					calculateResult={calculateResult}
					setResult={setResult}
				/>

				<ResultCard
					result={result}
					resultInterpretation={resultInterpretation}
				/>

				<DetailsCard
					description={description}
					source={source}
					methodology={methodology}
				/>
			</Stack>
		</Box>
	)
}
