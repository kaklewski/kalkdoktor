import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Divider,
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
  Tooltip,
  useClipboard,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { IconShare } from '@tabler/icons-react';
import { useEffect } from 'react';
import STRINGS from '../../data/strings';
import ROUTES from '../../data/routes';
import STORAGE_KEYS from '../../data/storageKeys';

export default function ShareFavModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onCopy, value, setValue } = useClipboard('');

  useEffect(() => {
    const urlPath = ROUTES.IMPORT_FAVORITES;
    const urlHostname = window.location.toString().replace(window.location.pathname, urlPath);
    const favString = localStorage.getItem(STORAGE_KEYS.FAVORITES);

    setValue(urlHostname + '?id=' + favString);
  }, [setValue]);

  const toast = useToast();

  function showToast() {
    toast({
      title: STRINGS.TOASTS.COPIED,
      status: 'success',
      position: 'top',
      duration: 1500,
      isClosable: true,
    });
  }

  return (
    <>
      <Tooltip label={STRINGS.MODALS.SHARE_FAVORITES.TITLE}>
        <IconButton
          icon={<IconShare stroke={1.5} />}
          aria-label={STRINGS.MODALS.SHARE_FAVORITES.TITLE}
          onClick={onOpen}
        />
      </Tooltip>

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
                <Button
                  colorScheme="teal"
                  onClick={() => {
                    onCopy();
                    showToast();
                  }}
                >
                  {STRINGS.BUTTONS.COPY}
                </Button>
              </Flex>

              <Accordion allowMultiple>
                <AccordionItem border="none">
                  <AccordionButton
                    borderRadius="base"
                    px={0}
                    pt={0}
                    _hover={{ backgroundColor: 'none' }}
                  >
                    <Flex align="center">
                      <Button size="sm" variant="link" fontWeight="normal">
                        {STRINGS.MODALS.SHARE_FAVORITES.HOW_IT_WORKS.TITLE}
                      </Button>
                      <AccordionIcon />
                    </Flex>
                  </AccordionButton>

                  <AccordionPanel px={0}>
                    <Divider mb={3} />
                    <Text fontSize="sm">
                      {STRINGS.MODALS.SHARE_FAVORITES.HOW_IT_WORKS.DESCRIPTION}
                    </Text>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
