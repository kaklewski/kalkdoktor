import { calculators } from '../calculators'
import { Box, Link } from '@chakra-ui/react'

export default function Index() {
	return (
		<Box maxW='650px' mx='auto' px={4} py={8}>
			{calculators.map(calculator => (
				<div key={calculator.id}>
					<Link href={'/' + calculator.link}>{calculator.name}</Link>
				</div>
			))}
		</Box>
	)
}
