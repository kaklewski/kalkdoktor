import { Box, Checkbox, Flex } from '@chakra-ui/react'
import CustomBadge from './CustomBadge'

interface ComponentProps {
	value: number
	text: string
}

export default function CustomCheckbox({ value, text }: ComponentProps) {
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
