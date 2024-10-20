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
import { sortedCalculators } from '../../data/sortedCalculators'
import SearchResultItem from './SearchResultItem'

export default function SearchBox() {
	const {
		isOpen: isSearchBoxOpen,
		onOpen: openSearchBox,
		onClose: closeSearchBox,
	} = useDisclosure()
	const searchBarRef = useRef<HTMLInputElement>(null)
	const [searchQuery, setSearchQuery] = useState<string>('')
	const INITIAL_SELECTED_ITEM_INDEX = 0
	const [selectedItemIndex, setSelectedItemIndex] = useState<number>(
		INITIAL_SELECTED_ITEM_INDEX
	)
	const selectedItemRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		if (!isSearchBoxOpen) setSearchQuery('')
	}, [isSearchBoxOpen])

	useEffect(() => {
		function toggleModal(event: any) {
			if (event.ctrlKey && event.key === 'k') {
				event.preventDefault()
				if (isSearchBoxOpen) {
					closeSearchBox()
				} else {
					openSearchBox()
				}
			}
		}
		document.addEventListener('keydown', toggleModal)
		return () => document.removeEventListener('keydown', toggleModal)
	}, [isSearchBoxOpen])

	useEffect(() => {
		setSelectedItemIndex(INITIAL_SELECTED_ITEM_INDEX)
	}, [searchQuery])

	useEffect(() => {
		if (selectedItemRef.current !== null)
			selectedItemRef.current.scrollIntoView({
				block: 'nearest',
				behavior: 'smooth',
			})
	}, [selectedItemIndex])

	const filteredCalculators = sortedCalculators.filter(value =>
		value.name.toLowerCase().includes(searchQuery.toLowerCase())
	)

	function focusOnSearchBar() {
		if (searchBarRef.current !== null) searchBarRef.current.focus()
	}

	function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
		if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
			// Block cursor from moving to start/end of the search bar input.
			event.preventDefault()
			focusOnSearchBar()
		}

		if (event.key === 'ArrowUp' && selectedItemIndex > 0) {
			setSelectedItemIndex(previousItem => previousItem - 1)
		} else if (
			event.key === 'ArrowDown' &&
			selectedItemIndex < filteredCalculators.length - 1
		) {
			setSelectedItemIndex(previousItem => previousItem + 1)
		} else if (event.key === 'Enter') {
			window.location.href =
				filteredCalculators[selectedItemIndex].urlPath
		}
	}

	return (
		<>
			<Tooltip label='ctrl + k'>
				<Button
					onClick={openSearchBox}
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
				onClick={openSearchBox}
				id='search-icon-small'
				colorScheme='teal'
				variant='solid'
				aria-label='Wyszukaj kalkulator'>
				<IconSearch stroke={1.5} />
			</IconButton>

			<Modal
				isOpen={isSearchBoxOpen}
				onClose={closeSearchBox}
				initialFocusRef={searchBarRef}
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
									ref={searchBarRef}
									value={searchQuery}
									onChange={event =>
										setSearchQuery(event.target.value)
									}
								/>

								{searchQuery && (
									<InputRightElement>
										<Button
											variant='ghost'
											size='sm'
											p={0}
											onClick={() => {
												setSearchQuery('')
												focusOnSearchBar()
											}}
											aria-label='Wyczyść tekst'>
											<IconBackspaceFilled stroke={1.5} />
										</Button>
									</InputRightElement>
								)}
							</InputGroup>

							<CloseButton size='lg' onClick={closeSearchBox} />
						</Flex>
					</ModalHeader>

					{searchQuery && (
						<ModalBody pt={1}>
							<Divider mb={4} />
							<Stack>
								{filteredCalculators.map((calc, index) => {
									return (
										<SearchResultItem
											key={calc.id}
											index={index}
											link={calc.urlPath}
											name={calc.name}
											isSelected={
												index === selectedItemIndex &&
												true
											}
											selectedItemRef={
												index === selectedItemIndex &&
												selectedItemRef
											}
											setSelectedItemIndex={
												setSelectedItemIndex
											}
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
