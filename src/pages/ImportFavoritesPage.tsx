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

export default function ImportFavoritesPage() {
  useDocumentTitle('Importuj ulubione kalkulatory')

  useEffect(() => {
    if (!idsAreValid) {
      window.location.href = '/'
    }
  }, [])

  const urlParams = new URLSearchParams(window.location.search)
  const favoriteCalculatorIds = urlParams.get('id')
  const idsAreValid: boolean =
    favoriteCalculatorIds === null ||
    favoriteCalculatorIds === undefined ||
    favoriteCalculatorIds === '' ||
    JSON.parse(favoriteCalculatorIds).length === 0
      ? false
      : true

  const favoritesToImport =
    favoriteCalculatorIds === null
      ? []
      : sortedCalculators.filter(calculator =>
          JSON.parse(favoriteCalculatorIds).includes(calculator.id)
        )

  function importFavorites(favorites: string) {
    localStorage.setItem('favorites', favorites)
    window.location.href = '/ulubione'
  }

  return (
    <>
      {idsAreValid && (
        <Card variant='outline'>
          <CardBody>
            <VStack mx='auto' maxW='80%'>
              <IconHeartPlus stroke={1.5} size={100} />
              <Heading mx='auto' size='md'>
                Importuj ulubione
              </Heading>
              <Text align='center'>
                Poniższe kalkulatory zostaną dodane do ulubionych na tym
                urządzeniu. Jeśli masz już jakieś ulubione kalkulatory, zostaną
                one nadpisane.
              </Text>
              <UnorderedList>
                {favoritesToImport.map(fav => {
                  return <ListItem key={fav.id}>{fav.name}</ListItem>
                }, [])}
              </UnorderedList>
            </VStack>
          </CardBody>

          <CardFooter mb={2}>
            <Flex justify='center' align='center' gap={3} w='100%'>
              <Link href='/'>
                <Button>Anuluj</Button>
              </Link>
              <Button
                colorScheme='red'
                onClick={() => {
                  if (favoriteCalculatorIds !== null)
                    importFavorites(favoriteCalculatorIds)
                }}>
                Importuj
              </Button>
            </Flex>
          </CardFooter>
        </Card>
      )}
    </>
  )
}
