import {
	Button,
	Card,
	CardBody,
	CardFooter,
	Flex,
	Heading,
	Link,
	ListItem,
	Text,
	UnorderedList,
	VStack,
} from '@chakra-ui/react'
import { IconHeartPlus } from '@tabler/icons-react'
import { useEffect } from 'react'
import { sortedCalculators } from '../data/sortedCalculators'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function AddFavPage() {
	useDocumentTitle('Importuj ulubione kalkulatory')

	const urlParams = new URLSearchParams(window.location.search)
	const favIds = urlParams.get('id')

	useEffect(() => {
		if (
			favIds === null ||
			favIds === undefined ||
			favIds === '' ||
			JSON.parse(favIds).length === 0
		) {
			window.location.href = '/'
		}
	}, [])

	const favsToBeAdded =
		favIds === null
			? []
			: sortedCalculators.filter(c => JSON.parse(favIds).includes(c.id))

	function saveNewFav(fav: string) {
		localStorage.setItem('favorites', fav)
		window.location.href = '/ulubione'
	}

	return (
		<>
			{favIds === null ||
				favIds === undefined ||
				favIds === '' ||
				(JSON.parse(favIds).length !== 0 && (
					<Card variant='outline'>
						<CardBody>
							<VStack mx='auto' maxW='80%'>
								<IconHeartPlus stroke={1.5} size={100} />
								<Heading mx='auto' size='md'>
									Importuj ulubione
								</Heading>
								<Text align='center'>
									Poniższe kalkulatory zostaną dodane do
									ulubionych. Twoje obecne ulubione zostaną
									nadpisane.
								</Text>
								<UnorderedList>
									{favsToBeAdded.map(fav => {
										return (
											<ListItem key={fav.id}>
												{fav.name}
											</ListItem>
										)
									}, [])}
								</UnorderedList>
							</VStack>
						</CardBody>

						<CardFooter>
							<Flex
								justify='center'
								align='center'
								gap={3}
								w='100%'>
								<Link href='/'>
									<Button>Anuluj</Button>
								</Link>
								<Button
									colorScheme='teal'
									onClick={() => saveNewFav(favIds)}>
									Dodaj
								</Button>
							</Flex>
						</CardFooter>
					</Card>
				))}
		</>
	)
}
