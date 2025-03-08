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
import { sortedCalculators } from '../data/sortedCalculators'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function ImportFavoritesPage() {
  useDocumentTitle('Importuj ulubione kalkulatory')

  const urlParams = new URLSearchParams(window.location.search)
  const favCalcIdString = urlParams.get('id')
  let favCalcIds: number[]

  const isEachIdValid = (() => {
    if (!favCalcIdString) return false
    try {
      favCalcIds = JSON.parse(favCalcIdString)
      return favCalcIds.length > 0 && favCalcIds.every((id: number) => typeof id === 'number')
    } catch {
      return false
    }
  })()

  if (!isEachIdValid) window.location.href = '/'

  const favsToImport = favCalcIdString
    ? sortedCalculators.filter(calculator => favCalcIds.includes(calculator.id))
    : []

  function importFavorites(favorites: string) {
    localStorage.setItem('favorites', favorites)
    window.location.href = '/ulubione'
  }

  return (
    <>
      {isEachIdValid && (
        <Card variant='outline'>
          <CardBody>
            <VStack mx='auto' maxW='80%'>
              <IconHeartPlus stroke={1.5} size={100} />
              <Heading as='h1' mx='auto' size='md'>
                Importuj ulubione
              </Heading>
              <Text align='center'>
                Poniższe kalkulatory zostaną dodane do ulubionych na tym urządzeniu. Jeśli masz już
                jakieś ulubione kalkulatory, zostaną one zastąpione.
              </Text>
              <UnorderedList>
                {favsToImport.map(fav => (
                  <ListItem key={fav.id}>{fav.name}</ListItem>
                ))}
              </UnorderedList>
            </VStack>
          </CardBody>

          <CardFooter mb={2}>
            <Flex justify='center' align='center' gap={2} w='100%'>
              <Link href='/'>
                <Button>Anuluj</Button>
              </Link>
              <Button
                colorScheme='red'
                onClick={() => {
                  if (favCalcIdString) importFavorites(favCalcIdString)
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
