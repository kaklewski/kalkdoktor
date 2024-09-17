import { calculators } from '../calculators'
import { Link } from '@chakra-ui/react'

export default function Index() {
	return (
		<>
			{calculators.map(calculator => (
				<div key={calculator.id}>
					<Link href={'/' + calculator.link}>{calculator.name}</Link>
				</div>
			))}
		</>
	)
}
