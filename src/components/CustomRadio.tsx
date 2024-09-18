import { Flex, Radio } from '@chakra-ui/react'
import CustomBadge from './CustomBadge'

interface ComponentProps {
	value: number
	text: string
}

export default function CustomRadio({ value, text }: ComponentProps) {
	return (
		<Radio value={value.toString()} isRequired>
			<Flex align='center' gap={2}>
				{text}
				<CustomBadge value={value} />
			</Flex>
		</Radio>
	)
}
