import {
	Button,
	CloseButton,
	Divider,
	Flex,
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
	Tooltip,
	useDisclosure,
} from '@chakra-ui/react'
import {
	IconBackspaceFilled,
	IconSearch,
	IconZoomQuestion,
} from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'
import { sortedCalculators } from '../data/sortedCalculators'
import SearchResultButton from './SearchResultButton'

export default function SearchModal() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const inputRef = useRef<HTMLInputElement>(null)
	const [searchValue, setSearchValue] = useState<string>('')

	useEffect(() => setSearchValue(''), [isOpen])

	useEffect(() => {
		function toggleModal(event: any) {
			if (event.ctrlKey && event.key === 'k') {
				event.preventDefault()
				if (isOpen) {
					onClose()
				} else {
					onOpen()
				}
			}
		}

		document.addEventListener('keydown', toggleModal)
		return () => document.removeEventListener('keydown', toggleModal)
	}, [isOpen])

	const filteredCalculators = sortedCalculators.filter(value =>
		value.name.toLowerCase().includes(searchValue.toLowerCase())
	)

	return (
		<>
			<Tooltip label='ctrl + k'>
				<Button
					onClick={onOpen}
					id='search-icon-big'
					leftIcon={<IconSearch stroke={1.5} />}
					colorScheme='teal'
					aria-label='Wyszukaj kalkulator'
					_focus={{
						borderColor: 'teal',
						boxShadow: '0 0 0 3px teal',
					}}>
					Wyszukaj
				</Button>
			</Tooltip>

			<IconButton
				onClick={onOpen}
				id='search-icon-small'
				colorScheme='teal'
				variant='solid'
				aria-label='Wyszukaj kalkulator'>
				<IconSearch stroke={1.5} />
			</IconButton>

			<Modal
				isOpen={isOpen}
				onClose={onClose}
				initialFocusRef={inputRef}
				size='xl'
				scrollBehavior='inside'>
				<ModalOverlay />
				<ModalContent py={4} m={2}>
					<ModalHeader>
						<Flex align='center' gap={2}>
							<InputGroup>
								<InputLeftElement pointerEvents='none'>
									<IconSearch stroke={1.5} />
								</InputLeftElement>

								<Input
									variant='filled'
									placeholder='Wyszukaj kalkulator'
									ref={inputRef}
									value={searchValue}
									onChange={event =>
										setSearchValue(event.target.value)
									}
								/>

								{searchValue && (
									<InputRightElement>
										<Button
											variant='ghost'
											size='sm'
											p={0}
											onClick={() => {
												setSearchValue('')
												if (inputRef.current !== null)
													inputRef.current.focus()
											}}
											aria-label='Wyczyść tekst'>
											<IconBackspaceFilled stroke={1.5} />
										</Button>
									</InputRightElement>
								)}
							</InputGroup>

							<CloseButton size='lg' onClick={onClose} />
						</Flex>
					</ModalHeader>

					{searchValue && (
						<ModalBody pt={1}>
							<Divider mb={4} />
							<Stack>
								{filteredCalculators.map(calc => {
									return (
										<SearchResultButton
											key={calc.id}
											link={calc.urlPath}
											name={calc.name}
										/>
									)
								})}
								{filteredCalculators.length === 0 && (
									<Flex
										flexDirection='column'
										alignItems='center'
										justifyContent='center'
										textAlign='center'
										py={4}>
										<IconZoomQuestion
											size={100}
											stroke={1.5}
										/>
										<Text fontSize='lg'>
											Nie znaleziono kalkulatora
										</Text>
									</Flex>
								)}
							</Stack>
						</ModalBody>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
