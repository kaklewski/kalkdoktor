import {
	Button,
	CloseButton,
	Divider,
	Flex,
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack,
	Tooltip,
	useDisclosure,
} from '@chakra-ui/react'
import { IconSearch } from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'
import { sortedCalculators } from '../data/sortedCalculators'
import SearchResultButton from './SearchResultButton'

export default function SearchModal() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = useRef(null)
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

	return (
		<>
			<Tooltip label='ctrl + k'>
				<Button
					onClick={onOpen}
					id='search-icon-big'
					leftIcon={<IconSearch stroke={1.5} />}
					colorScheme='teal'
					variant='solid'
					aria-label='Wyszukaj kalkulator'>
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
				initialFocusRef={initialRef}
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
									ref={initialRef}
									value={searchValue}
									onChange={event =>
										setSearchValue(event.target.value)
									}
								/>
							</InputGroup>

							<CloseButton size='lg' onClick={onClose} />
						</Flex>
					</ModalHeader>

					{searchValue && (
						<ModalBody pt={1}>
							<Divider mb={4} />
							<Stack>
								{sortedCalculators
									.filter(value =>
										value.name
											.toLowerCase()
											.includes(searchValue.toLowerCase())
									)
									.map(calc => {
										return (
											<SearchResultButton
												key={calc.id}
												link={calc.urlPath}
												name={calc.name}
											/>
										)
									})}
							</Stack>
						</ModalBody>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
