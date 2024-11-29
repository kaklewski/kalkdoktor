import { Box, Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { SourceType } from '../types/calculatorTypes'

type SourceLinkProps = Omit<SourceType, 'id'>

export default function SourceLink({
  author,
  title,
  dateOfAccess,
  link,
}: SourceLinkProps) {
  return (
    <Box mb={2}>
      <Link href={link} isExternal>
        <span>{author}, </span>
        <i>{title}</i>
        <span>, dostęp: {dateOfAccess}</span>
        <ExternalLinkIcon mx='2px' ml={1} mt={-1} />
      </Link>
    </Box>
  )
}
