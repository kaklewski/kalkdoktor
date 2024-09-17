import { Box, RadioGroup, Stack, Text } from '@chakra-ui/react'

interface Props {
	text: string
	children: React.ReactNode
}

export default function CustomRadioGroup({ text, children }: Props) {
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
