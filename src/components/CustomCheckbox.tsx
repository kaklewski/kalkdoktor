import { Box, Checkbox } from '@chakra-ui/react'

interface Props {
	value: number
	text: string
}

export default function CustomCheckbox({ value, text }: Props) {
	return (
		<Box>
			<Checkbox value={value} colorScheme='teal' w='100%'>
				{text}
			</Checkbox>
		</Box>
	)
}
