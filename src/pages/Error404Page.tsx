import { Alert, AlertTitle, Button } from '@chakra-ui/react'
import { IconError404 } from '@tabler/icons-react'
import useDocumentTitle from '../hooks/useDocumentTitle'
import STRINGS from '../data/strings'
import { Link as RouterLink } from 'react-router-dom'
import ROUTES from '../data/routes'

export default function Error404Page() {
  useDocumentTitle(STRINGS.PAGES.ERROR404.TITLE)

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

      <AlertTitle fontSize='lg'>{STRINGS.PAGES.ERROR404.TITLE}</AlertTitle>

      <Button colorScheme='red' as={RouterLink} to={ROUTES.HOME} my={3}>
        {STRINGS.BUTTONS.HOMEPAGE}
      </Button>
    </Alert>
  )
}
