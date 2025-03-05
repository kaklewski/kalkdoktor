import { Box, Flex, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import { sortedCalculators } from '../data/sortedCalculators'
import { IconHeartOff } from '@tabler/icons-react'
import ShareFavModal from '../components/modals/ShareFavModal'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { useEffect, useState } from 'react'
import { getCategories } from '../utils/getCategories'
import SortButton from '../components/buttons/SortButton'
import CalculatorCard from '../components/cards/CalculatorCard'

export default function FavoritesPage() {
  useDocumentTitle('Ulubione')

  const sortingStorageKey = 'sort-favorites'

  const [sortingType, setSortingType] = useState<string>(() => {
    let initial = localStorage.getItem(sortingStorageKey)
    if (initial == null) initial = 'alphabetically'
    return initial
  })

  useEffect(() => {
    localStorage.setItem(sortingStorageKey, sortingType)
  }, [sortingType])

  const favIds = (() => {
    const fav = localStorage.getItem('favorites')
    if (fav === null) return []
    return JSON.parse(fav)
  })()

  const favoriteCalculators = sortedCalculators.filter(c => favIds.includes(c.id))

  const categories: string[] = getCategories(favoriteCalculators)

  return (
    <>
      <Flex justify='space-between' gap='2'>
        <Heading as='h1'>Ulubione</Heading>
        {favoriteCalculators.length !== 0 && (
          <Stack direction='row' gap={{ base: 3, md: 2 }}>
            <ShareFavModal />
            <SortButton sortingType={sortingType} setSortingType={setSortingType} />
          </Stack>
        )}
      </Flex>

      {sortingType === 'alphabetically' && (
        <Stack spacing={4}>
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
      )}

      {sortingType === 'by-specialization' && (
        <Stack spacing={12}>
          {categories.map((category, categoryId) => (
            <Box key={categoryId}>
              <Box mb={4}>
                <Heading as='h2' fontSize='2xl' borderBottomWidth='1px'>
                  {category.toUpperCase()}
                </Heading>
              </Box>
              <Stack spacing={4}>
                {favoriteCalculators
                  .filter(calc => calc.category === category)
                  .map(calculator => (
                    <CalculatorCard
                      key={calculator.id}
                      id={calculator.id}
                      name={calculator.name}
                      link={calculator.urlPath}
                      description={calculator.description}
                    />
                  ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      )}
    </>
  )
}

function NoFavoritesPlaceholder() {
  return (
    <VStack my={10} mx='auto'>
      <IconHeartOff stroke={1.5} size={100} />
      <Heading as='h1' size='md' mx='auto'>
        Brak ulubionych
      </Heading>
      <Text align='center'>
        Możesz dodać kalkulator do ulubionych, klikając przycisk z ikoną serca.
      </Text>
    </VStack>
  )
}
