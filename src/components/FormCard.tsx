import { Card, CardBody } from '@chakra-ui/react'

interface Props {
	formContent: any
}

export default function FormCard({ formContent }: Props) {
	return (
		<Card overflow='hidden' variant='outline'>
			<CardBody>{formContent}</CardBody>
		</Card>
	)
}
