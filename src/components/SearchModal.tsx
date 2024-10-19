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
import { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { sortedCalculators } from '../data/sortedCalculators'
import SearchResultButton from './SearchResultButton'

export default function SearchModal() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const inputRef = useRef<HTMLInputElement>(null)
	const [searchValue, setSearchValue] = useState<string>('')
	const [selectedItem, setSelectedItem] = useState<number>(-1)
	const selectedItemRef = useRef<HTMLButtonElement>(null)

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

	useEffect(() => {
		if (selectedItemRef.current !== null)
			selectedItemRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
			})
	}, [selectedItem])

	const filteredCalculators = sortedCalculators.filter(value =>
		value.name.toLowerCase().includes(searchValue.toLowerCase())
	)

	function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
		if (event.key === 'ArrowUp' && selectedItem > 0) {
			event.preventDefault()
			setSelectedItem(prev => prev - 1)
			if (inputRef.current !== null) inputRef.current.focus()
		} else if (
			event.key === 'ArrowDown' &&
			selectedItem < filteredCalculators.length - 1
		) {
			event.preventDefault()
			setSelectedItem(prev => prev + 1)
			if (inputRef.current !== null) inputRef.current.focus()
		} else if (event.key === 'Enter') {
			window.location.href = filteredCalculators[selectedItem].urlPath
		} else if (
			event.key !== 'ArrowUp' &&
			event.key !== 'ArrowDown' &&
			event.key !== 'Enter'
		) {
			setSelectedItem(-1)
		}
	}

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
				<ModalContent py={4} m={2} onKeyDown={handleKeyDown}>
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
								{filteredCalculators.map((calc, index) => {
									return (
										<SearchResultButton
											key={calc.id}
											index={index}
											link={calc.urlPath}
											name={calc.name}
											isSelected={
												index === selectedItem && true
											}
											selectedItemRef={
												index === selectedItem &&
												selectedItemRef
											}
											setSelectedItem={setSelectedItem}
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
