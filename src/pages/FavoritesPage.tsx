import { Flex, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import { sortedCalculators } from '../data/calculators-and-categories'
import CalculatorCard from '../components/CalculatorCard'
import { IconHeartOff } from '@tabler/icons-react'
import ShareFavModal from '../components/ShareFavModal'

export default function FavoritesPage() {
	const favIds = (() => {
		const fav = localStorage.getItem('favorites')
		if (fav === null) return []
		return JSON.parse(fav)
	})()

	const favoriteCalculators = sortedCalculators.filter(c =>
		favIds.includes(c.id)
	)

	function NoFavoritesPlaceholder() {
		return (
			<VStack my={10} mx='auto' maxW='80%'>
				<IconHeartOff stroke={1.5} size={100} />
				<Heading size='md'>Brak ulubionych</Heading>
				<Text align='center'>
					Dodaj kalkulator do ulubionych, klikając ikonę serca w
					prawym górnym rogu.
				</Text>
			</VStack>
		)
	}

	return (
		<>
			<Flex justify='space-between' align='center'>
				<Heading>Ulubione</Heading>
				{favoriteCalculators.length === 0 ? '' : <ShareFavModal />}
			</Flex>
			<Stack spacing={4}>
				{favoriteCalculators.length === 0 ? (
					<NoFavoritesPlaceholder />
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
