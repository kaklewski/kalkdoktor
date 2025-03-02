import { Alert, AlertTitle, Button } from '@chakra-ui/react'
import { IconError404 } from '@tabler/icons-react'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function Error404Page() {
  useDocumentTitle('Błąd 404! Nie znaleziono strony')

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

      <Button colorScheme='red' as='a' href='/' my={3}>
        Strona główna
      </Button>
    </Alert>
  )
}
