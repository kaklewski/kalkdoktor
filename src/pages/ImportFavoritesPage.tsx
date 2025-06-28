import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react'
import { IconHeartPlus } from '@tabler/icons-react'
import { sortedCalculators } from '../data/sortedCalculators'
import useDocumentTitle from '../hooks/useDocumentTitle'
import STRINGS from '../data/strings'
import { Link as RouterLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../data/routes'
import STORAGE_KEYS from '../data/storageKeys'

export default function ImportFavoritesPage() {
  useDocumentTitle(STRINGS.PAGES.IMPORT_FAVORITES.TITLE)

  const urlParams = new URLSearchParams(window.location.search)
  const favCalcIdString = urlParams.get('id')
  let favCalcIds: number[]

  const navigate = useNavigate()

  const isEachIdValid = (() => {
    if (!favCalcIdString) return false
    try {
      favCalcIds = JSON.parse(favCalcIdString)
      return favCalcIds.length > 0 && favCalcIds.every((id: number) => typeof id === 'number')
    } catch {
      return false
    }
  })()

  if (!isEachIdValid) navigate(ROUTES.HOME)

  const favsToImport = favCalcIdString
    ? sortedCalculators.filter(calculator => favCalcIds.includes(calculator.id))
    : []

  function importFavorites(favorites: string) {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, favorites)
    navigate(ROUTES.FAVORITES)
  }

  return (
    <>
      {isEachIdValid && (
        <Card variant='outline'>
          <CardBody>
            <VStack mx='auto' maxW='80%'>
              <IconHeartPlus stroke={1.5} size={100} />
              <Heading as='h1' mx='auto' size='md'>
                {STRINGS.PAGES.IMPORT_FAVORITES.TITLE}
              </Heading>
              <Text align='center'>{STRINGS.PAGES.IMPORT_FAVORITES.DESCRIPTION}</Text>
              <UnorderedList>
                {favsToImport.map(fav => (
                  <ListItem key={fav.id}>{fav.name}</ListItem>
                ))}
              </UnorderedList>
            </VStack>
          </CardBody>

          <CardFooter mb={2}>
            <Flex justify='center' align='center' gap={2} w='100%'>
              <Button as={RouterLink} to={ROUTES.HOME}>
                {STRINGS.BUTTONS.CANCEL}
              </Button>
              <Button
                colorScheme='red'
                onClick={() => {
                  if (favCalcIdString) importFavorites(favCalcIdString)
                }}>
                {STRINGS.BUTTONS.IMPORT}
              </Button>
            </Flex>
          </CardFooter>
        </Card>
      )}
    </>
  )
}
