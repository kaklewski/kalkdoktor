import { Box, Checkbox, Flex } from '@chakra-ui/react'
import CustomBadge from './CustomBadge'

interface Props {
	value: number
	text: string
}

export default function CustomCheckbox({ value, text }: Props) {
	return (
		<Box>
			<Checkbox value={value} colorScheme='teal' w='100%'>
				<Flex align='center' gap={2}>
					{text}
					<CustomBadge value={value} />
				</Flex>
			</Checkbox>
		</Box>
	)
}
