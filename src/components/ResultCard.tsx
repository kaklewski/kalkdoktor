import {
	Card,
	CardBody,
	CardHeader,
	Divider,
	Heading,
	Text,
} from '@chakra-ui/react'

interface ComponentProps {
	result: number
	interpretResult: (result: number) => string
}

export default function ResultCard({
	result,
	interpretResult,
}: ComponentProps) {
	const resultInterpretation = interpretResult(result)

	return (
		<Card overflow='hidden' variant='filled'>
			<CardHeader>
				<Heading size='md'>Wynik: {result}</Heading>
			</CardHeader>

			<Divider color='white' />

			<CardBody>
				<Text>{resultInterpretation}</Text>
			</CardBody>
		</Card>
	)
}
