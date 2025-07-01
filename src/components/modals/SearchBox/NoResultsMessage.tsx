import { Flex, Text } from '@chakra-ui/react'
import { IconZoomQuestion } from '@tabler/icons-react'
import STRINGS from '../../../data/strings'

export default function NoResultsMessage() {
  return (
    <Flex
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      py={4}>
      <IconZoomQuestion size={100} />
      <Text fontSize='lg'>{STRINGS.MODALS.SEARCH.NO_RESULTS}</Text>
    </Flex>
  )
}
