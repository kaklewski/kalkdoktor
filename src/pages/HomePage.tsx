import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { sortedCalculators } from '../data/sortedCalculators';
import { useEffect, useState } from 'react';
import { getCategories } from '../utils/getCategories';
import SortButton from '../components/buttons/SortButton';
import { calculators } from '../data/calculators';
import CalculatorCard from '../components/cards/CalculatorCard';
import STRINGS from '../data/strings';
import STORAGE_KEYS from '../data/storageKeys';

export default function HomePage() {
  const [sortingOrder, setSortingOrder] = useState<string>(
    localStorage.getItem(STORAGE_KEYS.SORT.HOMEPAGE) || STORAGE_KEYS.SORT.ALPHABETICALLY,
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SORT.HOMEPAGE, sortingOrder);
  }, [sortingOrder]);

  const categories: string[] = getCategories(calculators);

  return (
    <>
      <Flex justify="space-between" gap={2}>
        <Heading as="h1">
          <Text>{STRINGS.PAGES.HOME.TITLE}</Text>
        </Heading>
        <SortButton sortingOrder={sortingOrder} setSortingOrder={setSortingOrder} />
      </Flex>

      {sortingOrder === STORAGE_KEYS.SORT.ALPHABETICALLY && (
        <Stack spacing={4}>
          {sortedCalculators.map((calculator) => (
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

      {sortingOrder === STORAGE_KEYS.SORT.BY_SPECIALIZATION && (
        <Stack spacing={12}>
          {categories.map((category, categoryId) => (
            <Box key={categoryId}>
              <Box mb={4}>
                <Heading as="h2" fontSize="2xl" borderBottomWidth="1px">
                  {category.toUpperCase()}
                </Heading>
              </Box>
              <Stack spacing={4}>
                {sortedCalculators
                  .filter((calc) => calc.category === category)
                  .map((calculator) => (
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
  );
}
