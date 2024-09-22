import {
	Button,
	CloseButton,
	Divider,
	Flex,
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	LinkBox,
	LinkOverlay,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react'
import { IconSearch } from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'

import { sortedCalculators } from '../data/calculators-and-categories'

export default function SearchModal() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = useRef(null)
	const [searchValue, setSearchValue] = useState<string>('')

	useEffect(() => setSearchValue(''), [isOpen])

	return (
		<>
			<Button
				onClick={onOpen}
				id='search-icon-big'
				leftIcon={<IconSearch stroke={1.5} />}
				colorScheme='teal'
				variant='solid'
				aria-label='Wyszukaj kalkulator'>
				Wyszukaj
			</Button>

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
									focusBorderColor='teal.500'
									placeholder='Wyszukaj kalkulator'
									ref={initialRef}
									value={searchValue}
									onChange={event =>
										setSearchValue(event.target.value)
									}
								/>
							</InputGroup>

							<CloseButton
								size='lg'
								colorScheme='teal'
								onClick={onClose}
							/>
						</Flex>
						{searchValue === '' ? '' : <Divider mt={4} />}
					</ModalHeader>

					{searchValue === '' ? (
						''
					) : (
						<ModalBody pt={0}>
							{sortedCalculators
								.filter(value =>
									value.name
										.toLowerCase()
										.includes(searchValue.toLowerCase())
								)
								.map(calc => {
									return (
										<LinkBox
											key={calc.id}
											p={3}
											_hover={{
												backgroundColor: 'teal.400',
												color: 'black',
												borderRadius: 'base',
												transition:
													'background-color 0.25s, color 0.25s',
											}}>
											<LinkOverlay href={calc.link}>
												{calc.name}
											</LinkOverlay>
										</LinkBox>
									)
								})}
						</ModalBody>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
