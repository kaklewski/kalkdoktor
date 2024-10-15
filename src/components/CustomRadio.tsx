import { Flex, Radio } from '@chakra-ui/react'
import CustomBadge from './CustomBadge'

interface ComponentProps {
	id: number | string
	value: number | string
	hideBadge?: boolean
	text: string
}

export default function CustomRadio({
	id,
	value,
	hideBadge,
	text,
}: ComponentProps) {
	return (
		<Radio value={value.toString()} id={id.toString()} isRequired>
			<Flex align='center' gap={2}>
				{text}
				{hideBadge !== true && typeof value === 'number' && (
					<CustomBadge value={value} />
				)}
			</Flex>
		</Radio>
	)
}
