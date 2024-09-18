import { Box, RadioGroup, Stack, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface ComponentProps {
	text: string
	children: ReactNode
}

export default function CustomRadioGroup({ text, children }: ComponentProps) {
	return (
		<Box>
			<RadioGroup colorScheme='teal' name={text}>
				<Stack>
					<Text>{text}:</Text>
					{children}
				</Stack>
			</RadioGroup>
		</Box>
	)
}
