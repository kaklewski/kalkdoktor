import { Badge } from '@chakra-ui/react'

interface Props {
	value: number
}

export default function CustomBadge({ value }: Props) {
	const badgeText = (() => {
		if (value > 0) {
			return '+' + value.toString()
		} else {
			return value
		}
	})()

	return <Badge>{badgeText}</Badge>
}
