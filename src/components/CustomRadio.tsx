import { Flex, Radio } from '@chakra-ui/react'
import CustomBadge from './CustomBadge'

interface ComponentProps {
	id: number | string
	value: number
	text: string
}

export default function CustomRadio({ id, value, text }: ComponentProps) {
	return (
		<Radio value={value.toString()} id={id.toString()} isRequired>
			<Flex align='center' gap={2}>
				{text}
				<CustomBadge value={value} />
			</Flex>
		</Radio>
	)
}
