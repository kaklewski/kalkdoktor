import { Box, Checkbox, Flex } from '@chakra-ui/react'
import CustomBadge from './CustomBadge'

interface ComponentProps {
	id: number | string
	value: number
	text: string
}

export default function CustomCheckbox({ id, value, text }: ComponentProps) {
	return (
		<Box>
			<Checkbox
				value={value}
				name={id.toString()}
				colorScheme='teal'
				w='100%'>
				<Flex align='center' gap={2}>
					{text}
					<CustomBadge value={value} />
				</Flex>
			</Checkbox>
		</Box>
	)
}
