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
} from '@chakra-ui/react'
import { IconShare } from '@tabler/icons-react'
import { useEffect } from 'react'

export default function ShareFavModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { onCopy, value, setValue } = useClipboard('')
  useEffect(() => {
    const urlPath = '/importuj-ulubione'
    const urlHostname = window.location.toString().replace(window.location.pathname, urlPath)
    const favString = localStorage.getItem('favorites')

    setValue(urlHostname + '?id=' + favString)
  }, [])

  const toast = useToast()

  function showToast() {
    toast({
      title: 'Skopiowano link',
      status: 'success',
      position: 'top',
      duration: 1500,
      isClosable: true,
    })
  }

  return (
    <>
      <Tooltip label='Udostępnij ulubione kalkulatory'>
        <IconButton
          icon={<IconShare stroke={1.5} />}
          aria-label='Udostępnij ulubione kalkulatory'
          onClick={onOpen}
        />
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent m={2}>
          <ModalHeader>Udostępnij ulubione kalkulatory</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Stack spacing={3}>
              <Text>
                Skopiuj poniższy link i otwórz go na innym urządzeniu, aby zaimportować ulubione
                kalkulatory.
              </Text>

              <Flex mb={2} gap={2}>
                <Input variant='filled' value={value} readOnly />
                <Button
                  colorScheme='teal'
                  onClick={() => {
                    onCopy()
                    showToast()
                  }}>
                  Skopiuj
                </Button>
              </Flex>

              <Accordion allowMultiple>
                <AccordionItem border='none'>
                  <AccordionButton
                    borderRadius='base'
                    px={0}
                    pt={0}
                    _hover={{ backgroundColor: 'none' }}>
                    <Flex align='center'>
                      <Button size='sm' variant='link' fontWeight='normal'>
                        Jak to działa?
                      </Button>
                      <AccordionIcon />
                    </Flex>
                  </AccordionButton>

                  <AccordionPanel px={0}>
                    <Divider mb={3} />
                    <Text fontSize='sm'>
                      Kalkdoktor zapisuje listę ulubionych kalkulatorów w pamięci lokalnej
                      przeglądarki na danym urządzeniu. Oznacza to, że aby móc korzystać z tych
                      samych ulubionych na innym urządzeniu, trzeba je najpierw udostępnić.
                    </Text>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
