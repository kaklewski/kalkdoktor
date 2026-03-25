import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Heading,
    ListItem,
    Text,
    UnorderedList,
    VStack,
} from '@chakra-ui/react';
import { IconHeartPlus } from '@tabler/icons-react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import ResponsiveButtonGroup from '../components/other/ResponsiveButtonGroup';
import { sortedCalculators } from '../data/calculators';
import ROUTES from '../data/routes';
import STORAGE_KEYS from '../data/storageKeys';
import STRINGS from '../data/strings';
import useDocumentTitle from '../hooks/useDocumentTitle';

const ImportFavoritesPage = () => {
    useDocumentTitle(STRINGS.PAGES.IMPORT_FAVORITES.TITLE);

    const urlParams = new URLSearchParams(window.location.search);
    const favCalcIdString = urlParams.get('id');
    let favCalcIds: number[];

    const navigate = useNavigate();

    const isEachIdValid = (() => {
        if (!favCalcIdString) return false;
        try {
            favCalcIds = JSON.parse(favCalcIdString);
            return (
                favCalcIds.length > 0 &&
                favCalcIds.every((id: number) => typeof id === 'number')
            );
        } catch {
            return false;
        }
    })();

    if (!isEachIdValid) navigate(ROUTES.HOME);

    const favsToImport = favCalcIdString
        ? sortedCalculators.filter((calculator) =>
              favCalcIds.includes(calculator.id),
          )
        : [];

    const importFavorites = (favorites: string) => {
        localStorage.setItem(STORAGE_KEYS.FAVORITES, favorites);
        navigate(ROUTES.FAVORITES);
    };

    const handleClick = () => {
        if (favCalcIdString) importFavorites(favCalcIdString);
    };

    const favList = favsToImport.map((fav) => (
        <ListItem key={fav.id}>{fav.name}</ListItem>
    ));

    return (
        isEachIdValid && (
            <Card variant="outline">
                <CardBody>
                    <VStack mx="auto" maxW="80%">
                        <IconHeartPlus stroke={1.5} size={100} />
                        <Heading as="h1" mx="auto" size="md">
                            {STRINGS.PAGES.IMPORT_FAVORITES.TITLE}
                        </Heading>
                        <Text align="center">
                            {STRINGS.PAGES.IMPORT_FAVORITES.DESCRIPTION}
                        </Text>
                        <UnorderedList>{favList}</UnorderedList>
                    </VStack>
                </CardBody>

                <CardFooter mb={2}>
                    <ResponsiveButtonGroup w="100%">
                        <Button as={RouterLink} to={ROUTES.HOME}>
                            {STRINGS.BUTTONS.CANCEL}
                        </Button>
                        <Button colorScheme="teal" onClick={handleClick}>
                            {STRINGS.BUTTONS.IMPORT}
                        </Button>
                    </ResponsiveButtonGroup>
                </CardFooter>
            </Card>
        )
    );
};

export default ImportFavoritesPage;
