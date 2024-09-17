import { Flex, Radio } from '@chakra-ui/react'
import CustomBadge from './CustomBadge'

interface Props {
	value: string
	text: string
}

export default function CustomRadio({ value, text }: Props) {
	return (
		<Radio value={value} isRequired>
			<Flex align='center' gap={2}>
				{text}
				<CustomBadge value={parseInt(value)} />
			</Flex>
		</Radio>
	)
}
