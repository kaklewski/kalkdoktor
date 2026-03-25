import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    Textarea,
    useDisclosure,
} from '@chakra-ui/react';
import { IconFlag } from '@tabler/icons-react';
import { useRef } from 'react';

import STRINGS from '../../data/strings';
import { handleFormSubmit } from '../../utils/handleFormSubmit';
import ResponsiveButtonGroup from '../other/ResponsiveButtonGroup';

type BugReportModalProps = {
    calculatorName: string;
};

const BugReportModal = ({ calculatorName }: BugReportModalProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef(null);

    return (
        <>
            <Button
                leftIcon={<IconFlag stroke={1.5} size={16} />}
                size="xs"
                onClick={onOpen}
                borderWidth="1px"
            >
                {STRINGS.BUTTONS.REPORT_BUG}
            </Button>

            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
                size={{ base: 'full', md: 'xl' }}
            >
                <form
                    name="bug-report"
                    method="POST"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={handleFormSubmit}
                >
                    {/* Netlify requirement for JS rendered forms  */}
                    <input type="hidden" name="form-name" value="bug-report" />

                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            {STRINGS.MODALS.BUG_REPORT.TITLE}
                        </ModalHeader>
                        <ModalCloseButton />

                        <ModalBody>
                            <Stack gap={4}>
                                <FormControl isRequired>
                                    <FormLabel>{STRINGS.FORM.NAME}</FormLabel>
                                    <Input ref={initialRef} name="name" />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>{STRINGS.FORM.EMAIL}</FormLabel>
                                    <Input type="email" name="email" />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>
                                        {
                                            STRINGS.MODALS.BUG_REPORT.FORM
                                                .BUG_DESCRIPTION
                                        }
                                    </FormLabel>
                                    <Textarea
                                        name="message"
                                        rows={5}
                                        minH="5rem"
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>
                                        {
                                            STRINGS.MODALS.BUG_REPORT.FORM
                                                .RELATED_CALCULATOR
                                        }
                                    </FormLabel>
                                    <Input
                                        readOnly
                                        name="calculator-name"
                                        variant="filled"
                                        value={calculatorName}
                                    />
                                </FormControl>
                            </Stack>
                            <Input
                                name="bot-field"
                                visibility="collapse"
                                maxH={0}
                                maxW={0}
                            />
                            <ResponsiveButtonGroup mb={2}>
                                <Button colorScheme="teal" type="submit">
                                    {STRINGS.BUTTONS.SEND}
                                </Button>
                            </ResponsiveButtonGroup>
                        </ModalBody>
                    </ModalContent>
                </form>
            </Modal>
        </>
    );
};

export default BugReportModal;
