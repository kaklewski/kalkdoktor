import { Box, Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

interface ComponentProps {
	name: string
	link: string
}

export default function SourceLink({ name, link }: ComponentProps) {
	return (
		<Box mb={2}>
			<Link href={link} isExternal>
				{name} <ExternalLinkIcon mx='2px' />
			</Link>
		</Box>
	)
}
