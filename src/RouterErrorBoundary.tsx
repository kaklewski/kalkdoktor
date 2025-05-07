import { Alert, AlertDescription, AlertTitle, Button, Flex } from '@chakra-ui/react'
import { IconExclamationCircle } from '@tabler/icons-react'
import { useRouteError } from 'react-router-dom'

export default function RouterErrorBoundary() {
  const error = useRouteError()
  console.error(error)
  return (
    <Flex height='100vh' justifyContent='center' alignItems='center'>
      <Alert
        status='error'
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        borderRadius='base'
        maxWidth='sm'>
        <IconExclamationCircle size={70} stroke={1.5} />

        <AlertTitle fontSize='lg' mt={4} mb={1}>
          Błąd
        </AlertTitle>
        <AlertDescription>
          Coś poszło nie tak. Spróbuj ponownie lub przejdź na stronę główną.
        </AlertDescription>

        <Button as='a' href='/' mt={4} mb={4}>
          Strona główna
        </Button>
      </Alert>
    </Flex>
  )
}
