import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    Flex,
    Icon,
    useColorModeValue,
} from '@chakra-ui/react';
import { IconRefresh } from '@tabler/icons-react';

import STRINGS from '../../data/strings';

type UpdateAlertProps = {
    onRefresh: () => void;
};

const UpdateAlert = ({ onRefresh }: UpdateAlertProps) => {
    const bg = useColorModeValue('blue.50', 'blue.900');
    const border = useColorModeValue('blue.200', 'blue.700');

    return (
        <Alert
            status="info"
            variant="subtle"
            borderRadius="xl"
            mb={8}
            px={4}
            py={4}
            bg={bg}
            border="1px solid"
            borderColor={border}
            boxShadow="sm"
        >
            <Flex
                w="100%"
                direction={{ base: 'column', md: 'row' }}
                align={{ base: 'flex-start', md: 'center' }}
                justify="space-between"
                gap={4}
            >
                <Flex align="flex-start" gap={3}>
                    <AlertIcon boxSize={5} mt="2px" />
                    <Box>
                        <AlertTitle fontSize="md" mb={1}>
                            {STRINGS.PWA.UPDATE_ALERT.TITLE}
                        </AlertTitle>
                        <AlertDescription fontSize="sm" opacity={0.9}>
                            {STRINGS.PWA.UPDATE_ALERT.DESCRIPTION}
                        </AlertDescription>
                    </Box>
                </Flex>

                <Button
                    colorScheme="blue"
                    size="sm"
                    borderRadius="lg"
                    leftIcon={<Icon as={IconRefresh} boxSize={4} />}
                    onClick={onRefresh}
                    alignSelf={{ base: 'stretch', md: 'center' }}
                >
                    {STRINGS.PWA.UPDATE_ALERT.BUTTON}
                </Button>
            </Flex>
        </Alert>
    );
};

export default UpdateAlert;
