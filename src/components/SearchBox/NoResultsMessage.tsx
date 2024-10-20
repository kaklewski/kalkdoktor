import { Flex, Text } from '@chakra-ui/react'
import { IconZoomQuestion } from '@tabler/icons-react'

export default function NoResultsMessage() {
	return (
		<Flex
			flexDirection='column'
			alignItems='center'
			justifyContent='center'
			textAlign='center'
			py={4}>
			<IconZoomQuestion size={100} stroke={1.5} />
			<Text fontSize='lg'>Nie znaleziono kalkulatora</Text>
		</Flex>
	)
}
