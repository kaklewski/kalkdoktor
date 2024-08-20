import { Card, CardBody, Stack, StackDivider } from '@chakra-ui/react'

interface Props {
	children: any
}

export default function FormCard({ children }: Props) {
	return (
		<Card overflow='hidden' variant='outline'>
			<CardBody>
				<Stack divider={<StackDivider />} spacing={4}>
					{children}
				</Stack>
			</CardBody>
		</Card>
	)
}
