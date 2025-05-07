import {
  Box,
  Button,
  CloseButton,
  Divider,
  Flex,
  IconButton,
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
import { KeyboardEvent, useEffect, useRef, useState } from 'react'
import SearchResultItem from './SearchResultItem'
import SearchBar from './SearchBar'
import NoResultsMessage from './NoResultsMessage'
import { sortedCalculators } from '../../../data/sortedCalculators'

export default function SearchBox() {
  const {
    isOpen: isSearchBoxOpen,
    onOpen: openSearchBox,
    onClose: closeSearchBox,
  } = useDisclosure()
  const searchBarRef = useRef<HTMLInputElement>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const INITIAL_SELECTED_ITEM_INDEX = 0
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(INITIAL_SELECTED_ITEM_INDEX)
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
  }, [isSearchBoxOpen, openSearchBox, closeSearchBox])

  useEffect(() => {
    setSelectedItemIndex(INITIAL_SELECTED_ITEM_INDEX)
  }, [searchQuery])

  useEffect(() => {
    selectedItemRef.current?.scrollIntoView({
      block: 'nearest',
      behavior: 'smooth',
    })
  }, [selectedItemIndex])

  const filteredCalculators = sortedCalculators.filter(value =>
    value.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  function focusOnSearchBar() {
    searchBarRef.current?.focus()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      // Block cursor from moving to start/end of the search bar input.
      event.preventDefault()
      focusOnSearchBar()
    }

    if (event.key === 'ArrowUp' && selectedItemIndex > 0) {
      setSelectedItemIndex(previousItem => previousItem - 1)
    } else if (event.key === 'ArrowDown' && selectedItemIndex < filteredCalculators.length - 1) {
      setSelectedItemIndex(previousItem => previousItem + 1)
    } else if (event.key === 'Enter') {
      window.location.href = filteredCalculators[selectedItemIndex].urlPath
    }
  }

  return (
    <>
      <Box display={{ base: 'none', md: 'initial' }}>
        <Tooltip label='Ctrl + K'>
          <Button
            onClick={openSearchBox}
            leftIcon={<IconSearch stroke={1.5} />}
            colorScheme='teal'
            aria-label='Wyszukaj kalkulator'
            _focus={{
              borderColor: 'teal',
              boxShadow: '0 0 0 3px teal',
            }}>
            Szukaj
          </Button>
        </Tooltip>
      </Box>
      <Box display={{ base: 'initial', md: 'none' }}>
        <Tooltip label='Wyszukaj kalkulator'>
          <IconButton
            onClick={openSearchBox}
            colorScheme='teal'
            variant='solid'
            aria-label='Wyszukaj kalkulator'>
            <IconSearch stroke={1.5} />
          </IconButton>
        </Tooltip>
      </Box>

      <Modal
        isOpen={isSearchBoxOpen}
        onClose={closeSearchBox}
        initialFocusRef={searchBarRef}
        size='xl'
        scrollBehavior='inside'>
        <ModalOverlay />
        <ModalContent py={4} mx={2} onKeyDown={handleKeyDown}>
          <ModalHeader>
            <Flex align='center' gap={2}>
              <SearchBar
                searchBarRef={searchBarRef}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                focusOnSearchBar={focusOnSearchBar}
              />
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
                      isSelected={index === selectedItemIndex && true}
                      selectedItemRef={index === selectedItemIndex && selectedItemRef}
                      setSelectedItemIndex={setSelectedItemIndex}
                    />
                  )
                })}
                {filteredCalculators.length === 0 && <NoResultsMessage />}
              </Stack>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
