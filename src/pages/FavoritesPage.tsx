import { Heading, Stack, Text } from '@chakra-ui/react'
import { sortedCalculators } from '../data/calculators-and-categories'
import CalculatorCard from '../components/CalculatorCard'

export default function FavoritesPage() {
	const favIds = (() => {
		const fav = localStorage.getItem('favorites')
		if (fav === null) return []
		return JSON.parse(fav)
	})()
	const favoriteCalculators = sortedCalculators.filter(c =>
		favIds.includes(c.id)
	)

	return (
		<>
			<Heading>Ulubione</Heading>
			<Stack spacing={4}>
				{favoriteCalculators.length === 0 ? (
					<Text>Brak ulubionych</Text>
				) : (
					favoriteCalculators.map(calculator => (
						<CalculatorCard
							key={calculator.id}
							id={calculator.id}
							name={calculator.name}
							link={calculator.link}
							description={calculator.description}
						/>
					))
				)}
			</Stack>
		</>
	)
}
