import { Alert, AlertTitle, Button } from '@chakra-ui/react'
import { IconError404 } from '@tabler/icons-react'

export default function Error404Page() {
	return (
		<Alert
			status='error'
			variant='subtle'
			flexDirection='column'
			alignItems='center'
			justifyContent='center'
			textAlign='center'
			borderRadius='base'>
			<IconError404 size={100} stroke={1.5} />

			<AlertTitle fontSize='lg'>Nie znaleziono strony!</AlertTitle>

			<Button as='a' href='/' mt={3} mb={4}>
				Strona główna
			</Button>
		</Alert>
	)
}
