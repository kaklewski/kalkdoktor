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
	resultDescription: string
}

export default function ResultCard({ result, resultDescription }: Props) {
	return (
		<Card overflow='hidden' variant='filled'>
			<CardHeader>
				<Heading size='md'>Wynik: {result}</Heading>
			</CardHeader>
			<Divider color='white' />
			<CardBody>
				<Text>{resultDescription}</Text>
			</CardBody>
		</Card>
	)
}
