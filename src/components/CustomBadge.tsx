import { Badge } from '@chakra-ui/react'

interface ComponentProps {
	value: number
}

export default function CustomBadge({ value }: ComponentProps) {
	return (
		<Badge>{value > 0 ? `+${value.toString()}` : value.toString()}</Badge>
	)
}
