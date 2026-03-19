import { Heading, Text, VStack } from '@chakra-ui/react';
import { IconHeartOff } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import SortButton from '../components/buttons/SortButton';
import ShareFavoritesModal from '../components/modals/ShareFavoritesModal';
import { sortedCalculators } from '../data/calculators';
import STORAGE_KEYS from '../data/storageKeys';
import STRINGS from '../data/strings';
import useDocumentTitle from '../hooks/useDocumentTitle';
import CalculatorCollectionLayout from '../layouts/CalculatorCollectionLayout';

const FavoritesPage = () => {
    useDocumentTitle(STRINGS.PAGES.FAVORITES.TITLE);

    const [sorting, setSorting] = useState<string>(
        localStorage.getItem(STORAGE_KEYS.SORT.FAVORITES) ||
            STORAGE_KEYS.SORT.ALPHABETICALLY,
    );

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.SORT.FAVORITES, sorting);
    }, [sorting]);

    const favIds = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]',
    );
    const favoriteCalculators = sortedCalculators.filter((calc) =>
        favIds.includes(calc.id),
    );
    const isNoCalculatorAdded = favoriteCalculators.length === 0;

    const buttons = (
        <>
            <ShareFavoritesModal />
            <SortButton sorting={sorting} setSorting={setSorting} />
        </>
    );

    return isNoCalculatorAdded ? (
        <NoFavoritesPlaceholder />
    ) : (
        <CalculatorCollectionLayout
            title={STRINGS.PAGES.FAVORITES.TITLE}
            actions={buttons}
            sorting={sorting}
            calculators={favoriteCalculators}
        />
    );
};

const NoFavoritesPlaceholder = () => (
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

export default FavoritesPage;
