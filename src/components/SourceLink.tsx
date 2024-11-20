import { Box, Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { SourceType } from '../types/calculatorTypes'

type SourceLinkProps = Omit<SourceType, 'id'>

export default function SourceLink({ name, link }: SourceLinkProps) {
  return (
    <Box mb={2}>
      <Link href={link} isExternal>
        {name} <ExternalLinkIcon mx='2px' />
      </Link>
    </Box>
  )
}
