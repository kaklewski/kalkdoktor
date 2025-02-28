import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { sortedCalculators } from '../data/sortedCalculators'
import { useEffect, useState } from 'react'
import { getCategories } from '../utils/getCategories'
import SortButton from '../components/Buttons/SortButton'
import { calculators } from '../data/calculators'
import CalculatorCard from '../components/Cards/CalculatorCard'

export default function IndexPage() {
  const sortingStorageKey = 'sort-homepage'

  const [sortingType, setSortingType] = useState<string>(() => {
    let initial = localStorage.getItem(sortingStorageKey)
    if (initial == null) initial = 'alphabetically'
    return initial
  })

  useEffect(() => {
    localStorage.setItem(sortingStorageKey, sortingType)
  }, [sortingType])

  const categories: string[] = getCategories(calculators)

  return (
    <>
      <Flex justify='space-between' gap={2}>
        <Heading as='h1'>
          <Text>Kalkulatory</Text>
        </Heading>
        <SortButton sortingType={sortingType} setSortingType={setSortingType} />
      </Flex>

      {sortingType === 'alphabetically' && (
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
