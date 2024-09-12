import { Card, CardBody } from '@chakra-ui/react'
import { Form } from 'react-router-dom'

interface Props {
	formContent: any
	calculateResult: any
	setResult: any
}

export default function FormCard({
	formContent,
	calculateResult,
	setResult,
}: Props) {
	return (
		<Card overflow='hidden' variant='outline'>
			<Form
				onChange={() => calculateResult(setResult)}
				onClick={() => calculateResult(setResult)}>
				<CardBody>{formContent}</CardBody>
			</Form>
		</Card>
	)
}
