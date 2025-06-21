import { Alert, AlertDescription, AlertTitle, Button, Flex } from '@chakra-ui/react'
import { IconExclamationCircle } from '@tabler/icons-react'
import { useRouteError } from 'react-router-dom'
import STRINGS from './data/strings'

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
          {STRINGS.PAGES.ERROR_BOUNDARY.TITLE}
        </AlertTitle>
        <AlertDescription>{STRINGS.PAGES.ERROR_BOUNDARY.DESCRIPTION}</AlertDescription>

        <Button as='a' href='/' mt={4} mb={4}>
          {STRINGS.BUTTONS.HOMEPAGE}
        </Button>
      </Alert>
    </Flex>
  )
}
