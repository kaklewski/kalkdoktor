import { Flex, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import { sortedCalculators } from '../data/sortedCalculators'
import CalculatorCard from '../components/CalculatorCard'
import { IconHeartOff } from '@tabler/icons-react'
import ShareFavModal from '../components/ShareFavModal'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function FavPage() {
	useDocumentTitle('Ulubione')

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
			<VStack my={10} mx='auto'>
				<IconHeartOff stroke={1.5} size={100} />
				<Heading size='md' mx='auto'>
					Brak ulubionych
				</Heading>
				<Text align='center'>
					Możesz dodać kalkulator do ulubionych, klikając przycisk z
					ikoną serca.
				</Text>
			</VStack>
		)
	}

	return (
		<>
			<Flex justify='space-between' align='center'>
				<Heading>Ulubione</Heading>
				{favoriteCalculators.length !== 0 && <ShareFavModal />}
			</Flex>
			<Stack spacing={6}>
				{favoriteCalculators.length === 0 ? (
					<NoFavoritesPlaceholder />
				) : (
					favoriteCalculators.map(calculator => (
						<CalculatorCard
							key={calculator.id}
							id={calculator.id}
							name={calculator.name}
							link={calculator.urlPath}
							description={calculator.description}
						/>
					))
				)}
			</Stack>
		</>
	)
}
