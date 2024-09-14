import { Link, Stack } from '@chakra-ui/react'

interface Props {
	name: string
	link: string
}

const externalLinkIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='20'
		height='20'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='1.52'
		strokeLinecap='round'
		strokeLinejoin='round'>
		<path stroke='none' d='M0 0h24v24H0z' fill='none' />
		<path d='M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6' />
		<path d='M11 13l9 -9' />
		<path d='M15 4h5v5' />
	</svg>
)

export default function SourceLink({ name, link }: Props) {
	return (
		<Link href={link} isExternal>
			<Stack direction='row'>
				<span>{name}</span>
				{externalLinkIcon}
			</Stack>
		</Link>
	)
}
