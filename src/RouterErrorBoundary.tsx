import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Flex,
  HStack,
} from '@chakra-ui/react';
import { IconExclamationCircle } from '@tabler/icons-react';
import { useRouteError } from 'react-router-dom';

import ROUTES from './data/routes';
import STRINGS from './data/strings';

const RouterErrorBoundary = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        borderRadius="base"
        maxWidth="sm"
      >
        <IconExclamationCircle size={70} stroke={1.5} />

        <AlertTitle fontSize="lg" mt={4} mb={1}>
          {STRINGS.PAGES.ERROR_BOUNDARY.TITLE}
        </AlertTitle>
        <AlertDescription>
          {STRINGS.PAGES.ERROR_BOUNDARY.DESCRIPTION}
        </AlertDescription>

        <HStack mt={4} mb={4}>
          <Button onClick={() => window.location.reload()} colorScheme="teal">
            {STRINGS.BUTTONS.REFRESH}
          </Button>
          <Button as="a" href={ROUTES.HOME}>
            {STRINGS.BUTTONS.HOMEPAGE}
          </Button>
        </HStack>
      </Alert>
    </Flex>
  );
};

export default RouterErrorBoundary;
