import {
	Card,
	CardBody,
	CardHeader,
	Divider,
	Heading,
	Text,
} from '@chakra-ui/react'

interface Props {
	result: number
	resultInterpretation: string
}

export default function ResultCard({ result, resultInterpretation }: Props) {
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
