import {
  Button,
  Flex,
  FormControl,
  FormLabel,
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
  useDisclosure,
} from '@chakra-ui/react'
import { IconFlag } from '@tabler/icons-react'
import { useRef } from 'react'
import { handleFormSubmit } from '../../utils/handleFormSubmit'

export default function BugReportModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef(null)

  return (
    <>
      <Button leftIcon={<IconFlag stroke={1.5} size={16} />} size='xs' onClick={onOpen}>
        Zgłoś błąd
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size='xl'>
        <form
          name='bug-report'
          method='POST'
          data-netlify='true'
          data-netlify-honeypot='bot-field'
          onSubmit={handleFormSubmit}>
          {/* Netlify requirement for JS rendered forms  */}
          <input type='hidden' name='form-name' value='bug-report' />

          <ModalOverlay />
          <ModalContent mx={2}>
            <ModalHeader>Zgłoś błąd w kalkulatorze</ModalHeader>
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
                  <FormLabel>Opis błędu</FormLabel>
                  <Textarea name='message' rows={5} minH='5rem' />
                </FormControl>

                <FormControl>
                  <FormLabel>Kalkulator, którego dotyczy błąd</FormLabel>
                  <Input readOnly name='calculator-link' variant='filled' value={location.href} />
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
