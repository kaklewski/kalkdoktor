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
		const urlPath = '/dodaj-ulubione'
		const urlHostname = window.location
			.toString()
			.replace(window.location.pathname, urlPath)
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
			<Tooltip label='Udostępnij ulubione'>
				<IconButton
					icon={<IconShare stroke={1.5} />}
					aria-label='Udostępnij ulubione'
					onClick={onOpen}
				/>
			</Tooltip>

			<Modal isOpen={isOpen} onClose={onClose} size='xl'>
				<ModalOverlay />
				<ModalContent m={2}>
					<ModalHeader>Udostępnij ulubione</ModalHeader>
					<ModalCloseButton />

					<ModalBody>
						<Stack spacing={3}>
							<Text>
								Skopiuj poniższy link i otwórz go na innym
								urządzeniu, aby udostępnić swoje ulubione
								kalkulatory.
							</Text>

							<Flex mb={2} gap={2}>
								<Input
									variant='filled'
									value={value}
									readOnly
								/>
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
											<Text
												fontSize='sm'
												mr={1}
												_hover={{
													textDecor: 'underline',
												}}>
												Jak to działa?
											</Text>
											<AccordionIcon />
										</Flex>
									</AccordionButton>

									<AccordionPanel px={0}>
										<Divider mb={3} />
										<Text fontSize='sm'>
											Kalkdoktor zapisuje listę ulubionych
											kalkulatorów w lokalnej pamięci
											przeglądarki na danym urządzeniu.
											Oznacza to, że aby aby móc korzystać
											z tych samych ulubionych na
											smartfonie lub innym komputerze,
											trzeba je uprzednio udostępnić.
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
