import { Badge } from '@chakra-ui/react'

type CustomBadgeProps = {
  value: number
}

export default function CustomBadge({ value }: CustomBadgeProps) {
  return <Badge>{value > 0 ? `+${value.toString()}` : value.toString()}</Badge>
}
