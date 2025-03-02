import { Alert, AlertTitle, Button } from '@chakra-ui/react'
import { IconMailCheck } from '@tabler/icons-react'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function SubmissionSuccessPage() {
  useDocumentTitle('Wiadomość została wysłana!')

  return (
    <Alert
      status='success'
      variant='subtle'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      borderRadius='base'>
      <IconMailCheck size={100} stroke={1.5} />

      <AlertTitle fontSize='lg'>Wiadomość została wysłana!</AlertTitle>

      <Button colorScheme='green' as='a' href='/' my={3}>
        Strona główna
      </Button>
    </Alert>
  )
}
