import { Alert, AlertTitle, Button } from '@chakra-ui/react';
import { IconError404 } from '@tabler/icons-react';
import { Link as RouterLink } from 'react-router-dom';

import ResponsiveButtonGroup from '../components/other/ResponsiveButtonGroup';
import ROUTES from '../data/routes';
import STRINGS from '../data/strings';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Error404Page = () => {
    useDocumentTitle(STRINGS.PAGES.ERROR404.TITLE);

    return (
        <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            borderRadius="base"
        >
            <IconError404 size={100} stroke={1.5} />

            <AlertTitle as="h1">{STRINGS.PAGES.ERROR404.TITLE}</AlertTitle>

            <ResponsiveButtonGroup w="100%" my={3}>
                <Button colorScheme="red" as={RouterLink} to={ROUTES.HOME}>
                    {STRINGS.BUTTONS.HOMEPAGE}
                </Button>
            </ResponsiveButtonGroup>
        </Alert>
    );
};

export default Error404Page;
