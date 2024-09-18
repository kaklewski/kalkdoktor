import { Flex, Link } from '@chakra-ui/react'

const externalLinkIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='1.5'
		strokeLinecap='round'
		strokeLinejoin='round'>
		<path stroke='none' d='M0 0h24v24H0z' fill='none' />
		<path d='M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6' />
		<path d='M11 13l9 -9' />
		<path d='M15 4h5v5' />
	</svg>
)

interface ComponentProps {
	name: string
	link: string
}

export default function SourceLink({ name, link }: ComponentProps) {
	return (
		<Link href={link} isExternal>
			<Flex direction='row' align='center' gap={2}>
				<span>{name}</span>
				{externalLinkIcon}
			</Flex>
		</Link>
	)
}
