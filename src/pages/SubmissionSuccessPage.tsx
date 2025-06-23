import { Alert, AlertTitle, Button } from '@chakra-ui/react'
import { IconMailCheck } from '@tabler/icons-react'
import useDocumentTitle from '../hooks/useDocumentTitle'
import STRINGS from '../data/strings'
import { Link as RouterLink } from 'react-router-dom'

export default function SubmissionSuccessPage() {
  useDocumentTitle(STRINGS.PAGES.SUBMISSION_SUCCESS.TITLE)

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

      <AlertTitle fontSize='lg'>{STRINGS.PAGES.SUBMISSION_SUCCESS.TITLE}</AlertTitle>

      <Button colorScheme='green' as={RouterLink} to='/' my={3}>
        {STRINGS.BUTTONS.HOMEPAGE}
      </Button>
    </Alert>
  )
}
