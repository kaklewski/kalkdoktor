import { Stack, StackDivider } from '@chakra-ui/react'

interface Props {
	divider?: boolean
	children: React.ReactNode
}

export default function CustomStack({ divider = false, children }: Props) {
	return (
		<Stack
			divider={divider ? <StackDivider /> : undefined}
			spacing={divider ? 4 : 6}>
			{children}
		</Stack>
	)
}
