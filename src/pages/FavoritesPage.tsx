import { Box, Flex, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import { IconHeartOff } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import SortButton from '../components/buttons/SortButton';
import CalculatorCard from '../components/cards/CalculatorCard';
import ShareFavModal from '../components/modals/ShareFavModal';
import { sortedCalculators } from '../data/sortedCalculators';
import STORAGE_KEYS from '../data/storageKeys';
import STRINGS from '../data/strings';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { getCategories } from '../utils/getCategories';

export default function FavoritesPage() {
  useDocumentTitle(STRINGS.PAGES.FAVORITES.TITLE);

  const [sortingOrder, setSortingOrder] = useState<string>(
    localStorage.getItem(STORAGE_KEYS.SORT.FAVORITES) ||
      STORAGE_KEYS.SORT.ALPHABETICALLY,
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SORT.FAVORITES, sortingOrder);
  }, [sortingOrder]);

  const favIds = JSON.parse(
    localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]',
  );
  const favoriteCalculators = sortedCalculators.filter((calc) =>
    favIds.includes(calc.id),
  );
  const categories: string[] = getCategories(favoriteCalculators);

  return (
    <>
      <Flex justify="space-between" gap="2">
        <Heading as="h1">{STRINGS.PAGES.FAVORITES.TITLE}</Heading>
        {favoriteCalculators.length > 0 && (
          <Stack direction="row" gap={{ base: 3, md: 2 }}>
            <ShareFavModal />
            <SortButton
              sortingOrder={sortingOrder}
              setSortingOrder={setSortingOrder}
            />
          </Stack>
        )}
      </Flex>

      {sortingOrder === STORAGE_KEYS.SORT.ALPHABETICALLY && (
        <Stack spacing={4}>
          {favoriteCalculators.length === 0 ? (
            <NoFavoritesPlaceholder />
          ) : (
            favoriteCalculators.map((calculator) => (
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
                {favoriteCalculators
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

function NoFavoritesPlaceholder() {
  return (
    <VStack my={10} mx="auto">
      <IconHeartOff stroke={1.5} size={100} />
      <Heading as="h1" size="md" mx="auto">
        {STRINGS.PAGES.FAVORITES.NO_FAVORITES.TITLE}
      </Heading>
      <Text align="center">
        {STRINGS.PAGES.FAVORITES.NO_FAVORITES.DESCRIPTION}
      </Text>
    </VStack>
  );
}
