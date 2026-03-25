import { Alert, AlertTitle, Button } from '@chakra-ui/react';
import { IconMailCheck } from '@tabler/icons-react';
import { Link as RouterLink } from 'react-router-dom';

import ResponsiveButtonGroup from '../components/other/ResponsiveButtonGroup';
import ROUTES from '../data/routes';
import STRINGS from '../data/strings';
import useDocumentTitle from '../hooks/useDocumentTitle';

const SubmissionSuccessPage = () => {
    useDocumentTitle(STRINGS.PAGES.SUBMISSION_SUCCESS.TITLE);

    return (
        <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            borderRadius="base"
        >
            <IconMailCheck size={100} stroke={1.5} />

            <AlertTitle as="h1">
                {STRINGS.PAGES.SUBMISSION_SUCCESS.TITLE}
            </AlertTitle>

            <ResponsiveButtonGroup w="100%" my={3}>
                <Button colorScheme="green" as={RouterLink} to={ROUTES.HOME}>
                    {STRINGS.BUTTONS.HOMEPAGE}
                </Button>
            </ResponsiveButtonGroup>
        </Alert>
    );
};

export default SubmissionSuccessPage;
