import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'
import { useRef } from 'react'
import { handleFormSubmit } from '../../utils/handleFormSubmit'
import { IconMail } from '@tabler/icons-react'

export default function ContactModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef(null)

  return (
    <>
      <Tooltip label='Skontaktuj się ze mną'>
        <IconButton aria-label='Skontaktuj się ze mną' variant='ghost' size='sm' onClick={onOpen}>
          <IconMail size={20} stroke={1.8} />
        </IconButton>
      </Tooltip>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size='xl'>
        <form
          name='contact-form'
          method='POST'
          data-netlify='true'
          data-netlify-honeypot='bot-field'
          onSubmit={handleFormSubmit}>
          {/* Netlify requirement for JS rendered forms  */}
          <input type='hidden' name='form-name' value='contact-form' />

          <ModalOverlay />
          <ModalContent mx={2}>
            <ModalHeader>Skontaktuj się ze mną</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <Stack gap={4}>
                <FormControl isRequired>
                  <FormLabel>Twoje imię</FormLabel>
                  <Input ref={initialRef} name='name' />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Twój adres mejlowy</FormLabel>
                  <Input type='email' name='email' />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Wiadomość</FormLabel>
                  <Textarea name='message' rows={5} minH='5rem' />
                </FormControl>
              </Stack>
            </ModalBody>

            <Input name='bot-field' visibility='collapse' maxH={0} maxW={0} />

            <ModalFooter>
              <Flex justify='center' w='100%'>
                <Button colorScheme='teal' type='submit'>
                  Wyślij
                </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  )
}
