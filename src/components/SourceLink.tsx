import { Flex, Link } from '@chakra-ui/react'
import { IconExternalLink } from '@tabler/icons-react'

interface ComponentProps {
	name: string
	link: string
}

export default function SourceLink({ name, link }: ComponentProps) {
	return (
		<Link href={link} isExternal>
			<Flex direction='row' align='center' gap={2}>
				<span>{name}</span>
				<IconExternalLink stroke={1.5} size={20} />
			</Flex>
		</Link>
	)
}
