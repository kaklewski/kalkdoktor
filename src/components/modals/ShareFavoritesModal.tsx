import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useClipboard,
  useDisclosure,
} from '@chakra-ui/react';
import { IconShare } from '@tabler/icons-react';
import QRCode from 'react-qr-code';

import STRINGS from '../../data/strings';
import useShowToast from '../../hooks/useShowToast';
import getImportFavoritesUrl from '../../utils/getImportFavoritesUrl';
import AppTooltip from '../other/AppTooltip';

const ShareFavoritesModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onCopy, value } = useClipboard(getImportFavoritesUrl());
  const showToast = useShowToast();

  const handleClick = () => {
    onCopy();
    showToast(STRINGS.TOASTS.COPIED, 'success', true);
  };

  return (
    <>
      <ShareButton onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent mx={2}>
          <ModalHeader>{STRINGS.MODALS.SHARE_FAVORITES.TITLE}</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Stack spacing={3}>
              <Text>{STRINGS.MODALS.SHARE_FAVORITES.DESCRIPTION}</Text>

              <Flex mb={2} gap={2}>
                <Input variant="filled" value={value} readOnly />
                <Button colorScheme="teal" onClick={handleClick}>
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
          </ModalBody>
        </ModalContent>
      </Modal>
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
          <Text fontSize="sm" _hover={{ textDecoration: 'underline' }}>
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
