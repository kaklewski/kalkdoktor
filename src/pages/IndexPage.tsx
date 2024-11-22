import { Box, Divider, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { sortedCalculators } from '../data/sortedCalculators'
import CalculatorCard from '../components/CalculatorCard'
import { useEffect, useState } from 'react'
import { categories } from '../data/categories'
import SortButton from '../components/SortButton'

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

  return (
    <>
      <Flex justify='space-between' gap={2}>
        <Heading as='h1'>
          <Text>Kalkulatory</Text>
        </Heading>
        <SortButton sortingType={sortingType} setSortingType={setSortingType} />
      </Flex>

      {sortingType === 'alphabetically' && (
        <Stack spacing={6}>
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
              <Box mb={6}>
                <Heading as='h2' fontSize='2xl'>
                  {category.toUpperCase()}
                </Heading>
                <Divider mt={2} />
              </Box>
              <Stack spacing={6}>
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
