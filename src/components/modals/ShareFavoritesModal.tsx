import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Hide,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Show,
    Stack,
    Text,
    useClipboard,
    useDisclosure,
} from '@chakra-ui/react';
import { IconShare } from '@tabler/icons-react';
import { ReactNode, useRef } from 'react';
import QRCode from 'react-qr-code';

import STRINGS from '../../data/strings';
import useShowToast from '../../hooks/useShowToast';
import { getImportFavoritesUrl } from '../../utils/helpers';
import AppTooltip from '../other/AppTooltip';

const ShareFavoritesModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { onCopy, value } = useClipboard(getImportFavoritesUrl());
    const showToast = useShowToast();
    const copyButtonRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
        onCopy();
        showToast(STRINGS.TOASTS.COPIED, 'success', true);
    };

    const modalContent: ReactNode = (
        <Stack spacing={3}>
            <Text>{STRINGS.MODALS.SHARE_FAVORITES.DESCRIPTION}</Text>

            <Flex mb={2} gap={2}>
                <Input variant="filled" value={value} readOnly />
                <Button
                    colorScheme="teal"
                    onClick={handleClick}
                    ref={copyButtonRef}
                >
                    {STRINGS.BUTTONS.COPY}
                </Button>
            </Flex>

            <Box
                width="fit-content"
                marginInline="auto"
                p={4}
                bg="white"
                rounded="lg"
            >
                <QRCode
                    value={value}
                    size={200}
                    style={{ marginInline: 'auto' }}
                />
            </Box>

            <ShareFavoritesHowItWorks />
        </Stack>
    );

    return (
        <>
            <ShareButton onClick={onOpen} />

            <Hide above="sm">
                <Drawer
                    placement={'bottom'}
                    onClose={onClose}
                    isOpen={isOpen}
                    initialFocusRef={copyButtonRef}
                >
                    <DrawerOverlay />
                    <DrawerContent roundedTopLeft="3xl" roundedTopRight="3xl">
                        <DrawerHeader borderBottomWidth="1px">
                            {STRINGS.MODALS.SHARE_FAVORITES.TITLE}
                        </DrawerHeader>
                        <ModalCloseButton />
                        <DrawerBody>{modalContent}</DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Hide>

            <Show above="sm">
                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                    size="xl"
                    initialFocusRef={copyButtonRef}
                >
                    <ModalOverlay />
                    <ModalContent mx={2}>
                        <ModalHeader>
                            {STRINGS.MODALS.SHARE_FAVORITES.TITLE}
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>{modalContent}</ModalBody>
                    </ModalContent>
                </Modal>
            </Show>
        </>
    );
};

type ShareButtonProps = {
    onClick: () => void;
};

const ShareButton = ({ onClick }: ShareButtonProps) => (
    <AppTooltip label={STRINGS.MODALS.SHARE_FAVORITES.TITLE}>
        <IconButton
            icon={<IconShare stroke={1.5} />}
            aria-label={STRINGS.MODALS.SHARE_FAVORITES.TITLE}
            onClick={onClick}
        />
    </AppTooltip>
);

const ShareFavoritesHowItWorks = () => (
    <Accordion allowMultiple>
        <AccordionItem border="none">
            <AccordionButton px={0} pt={0} _hover={{ backgroundColor: 'none' }}>
                <Flex>
                    <Text
                        fontSize="sm"
                        _hover={{ textDecoration: 'underline' }}
                    >
                        {STRINGS.MODALS.SHARE_FAVORITES.HOW_IT_WORKS.TITLE}
                    </Text>
                    <AccordionIcon />
                </Flex>
            </AccordionButton>

            <AccordionPanel px={0}>
                <Text fontSize="sm">
                    {STRINGS.MODALS.SHARE_FAVORITES.HOW_IT_WORKS.DESCRIPTION}
                </Text>
            </AccordionPanel>
        </AccordionItem>
    </Accordion>
);

export default ShareFavoritesModal;
