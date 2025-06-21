import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { sortedCalculators } from '../data/sortedCalculators'
import { useEffect, useState } from 'react'
import { getCategories } from '../utils/getCategories'
import SortButton from '../components/buttons/SortButton'
import { calculators } from '../data/calculators'
import CalculatorCard from '../components/cards/CalculatorCard'
import STRINGS from '../data/strings'

export default function HomePage() {
  const STORAGE_KEY_HOMEPAGE_SORTING = 'sort-homepage'

  const [sortingOrder, setSortingOrder] = useState<string>(() => {
    const initialSorting = localStorage.getItem(STORAGE_KEY_HOMEPAGE_SORTING)
    if (!initialSorting) return 'alphabetically'
    return initialSorting
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_HOMEPAGE_SORTING, sortingOrder)
  }, [sortingOrder])

  const categories: string[] = getCategories(calculators)

  return (
    <>
      <Flex justify='space-between' gap={2}>
        <Heading as='h1'>
          <Text>{STRINGS.PAGES.HOME.TITLE}</Text>
        </Heading>
        <SortButton sortingOrder={sortingOrder} setSortingOrder={setSortingOrder} />
      </Flex>

      {sortingOrder === 'alphabetically' && (
        <Stack spacing={4}>
          {sortedCalculators.map(calculator => (
            <CalculatorCard
              key={calculator.id}
              id={calculator.id}
              name={calculator.name}
              link={calculator.urlPath}
              description={calculator.description}
            />
          ))}
        </Stack>
      )}

      {sortingOrder === 'by-specialization' && (
        <Stack spacing={12}>
          {categories.map((category, categoryId) => (
            <Box key={categoryId}>
              <Box mb={4}>
                <Heading as='h2' fontSize='2xl' borderBottomWidth='1px'>
                  {category.toUpperCase()}
                </Heading>
              </Box>
              <Stack spacing={4}>
                {sortedCalculators
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
