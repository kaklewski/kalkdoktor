import { Box, RadioGroup, Stack, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface ComponentProps {
	text: string
	id: number | string
	children: ReactNode
}

export default function CustomRadioGroup({
	text,
	id,
	children,
}: ComponentProps) {
	return (
		<Box>
			<RadioGroup colorScheme='teal' name={id.toString()}>
				<Stack>
					<Text>{text}:</Text>
					{children}
				</Stack>
			</RadioGroup>
		</Box>
	)
}
