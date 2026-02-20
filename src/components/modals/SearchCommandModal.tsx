import {
  Button,
  CloseButton,
  Divider,
  Flex,
  Hide,
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
  Show,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {
  IconBackspaceFilled,
  IconCornerDownLeft,
  IconSearch,
  IconZoomQuestion,
} from '@tabler/icons-react';
import {
  KeyboardEvent,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { sortedCalculators } from '../../data/sortedCalculators';
import STRINGS from '../../data/strings';
import { CalculatorType } from '../../types/calculatorTypes';
import AppTooltip from '../other/AppTooltip';

const INITIAL_SELECTED_ITEM_INDEX = 0;

const SearchCommandModal = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(
    INITIAL_SELECTED_ITEM_INDEX,
  );
  const {
    isOpen: isSearchModalOpen,
    onOpen: openSearchModal,
    onClose: closeSearchModal,
  } = useDisclosure();
  const searchBarRef = useRef<HTMLInputElement>(null);
  const selectedItemRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const handleSearchModalClose = useCallback(() => {
    setSearchQuery('');
    setSelectedItemIndex(INITIAL_SELECTED_ITEM_INDEX);
    closeSearchModal();
  }, [closeSearchModal]);

  const navigateAndClose = useCallback(
    (path: string) => {
      setPendingPath(path);
      handleSearchModalClose();
    },
    [handleSearchModalClose],
  );

  useEffect(() => {
    const handleKeyboardShortcut = (event: globalThis.KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();

        if (isSearchModalOpen) {
          handleSearchModalClose();
        } else {
          openSearchModal();
        }
      }
    };

    document.addEventListener('keydown', handleKeyboardShortcut);
    return () =>
      document.removeEventListener('keydown', handleKeyboardShortcut);
  }, [
    isSearchModalOpen,
    openSearchModal,
    closeSearchModal,
    handleSearchModalClose,
  ]);

  useEffect(() => {
    selectedItemRef.current?.scrollIntoView({
      block: 'nearest',
      behavior: 'smooth',
    });
  }, [selectedItemIndex]);

  const filteredCalculators = sortedCalculators.filter((value) =>
    value.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        setSelectedItemIndex((currentItem) => Math.max(currentItem - 1, 0));
        break;

      case 'ArrowDown':
        event.preventDefault();
        setSelectedItemIndex((currentItem) =>
          Math.min(currentItem + 1, filteredCalculators.length - 1),
        );
        break;

      case 'Enter':
        if (selectedItemIndex >= 0) {
          event.preventDefault();
          navigateAndClose(filteredCalculators[selectedItemIndex].urlPath);
        }
        break;

      case 'Tab':
        break;

      case 'Shift':
        break;

      default:
        setSelectedItemIndex(INITIAL_SELECTED_ITEM_INDEX);
    }
  };

  const focusOnSearchBar = () => {
    searchBarRef.current?.focus();
  };

  return (
    <>
      <SearchButton onClick={openSearchModal} />

      <Modal
        isOpen={isSearchModalOpen}
        onClose={handleSearchModalClose}
        onCloseComplete={() => {
          if (pendingPath) {
            if (!pendingPath) return;
            navigate(pendingPath);
            setPendingPath(null);
          }
        }}
        initialFocusRef={searchBarRef}
        size="xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent py={4} mx={2} onKeyDown={handleKeyDown}>
          <ModalHeader>
            <Flex align="center" gap={2}>
              <SearchBar
                searchBarRef={searchBarRef}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                focusOnSearchBar={focusOnSearchBar}
              />
              <CloseButton size="lg" onClick={handleSearchModalClose} />
            </Flex>
          </ModalHeader>

          <ModalBody pt={1} tabIndex={-1}>
            <Divider mb={4} />
            <Stack>
              {filteredCalculators.map((calc, index) => (
                <SearchResultItem
                  key={calc.id}
                  index={index}
                  name={calc.name}
                  isSelected={index === selectedItemIndex}
                  selectedItemRef={selectedItemRef}
                  setSelectedItemIndex={setSelectedItemIndex}
                  handleClick={() => navigateAndClose(calc.urlPath)}
                />
              ))}
              {filteredCalculators.length === 0 && <NoResultsMessage />}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

type SearchButtonProps = {
  onClick: () => void;
};

const SearchButton = ({ onClick }: SearchButtonProps) => (
  <>
    <Hide above="md">
      <AppTooltip label={STRINGS.MODALS.SEARCH.TITLE}>
        <IconButton
          onClick={onClick}
          colorScheme="teal"
          variant="solid"
          aria-label={STRINGS.MODALS.SEARCH.TITLE}
        >
          <IconSearch stroke={1.5} />
        </IconButton>
      </AppTooltip>
    </Hide>

    <Show above="md">
      <AppTooltip label="Ctrl+K">
        <Button
          onClick={onClick}
          leftIcon={<IconSearch stroke={1.5} />}
          colorScheme="teal"
          aria-label={STRINGS.MODALS.SEARCH.TITLE}
        >
          Szukaj
        </Button>
      </AppTooltip>
    </Show>
  </>
);

type SearchBarProps = {
  searchBarRef: RefObject<HTMLInputElement | null>;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  focusOnSearchBar: () => void;
};

const SearchBar = ({
  searchBarRef,
  searchQuery,
  setSearchQuery,
  focusOnSearchBar,
}: SearchBarProps) => (
  <InputGroup size="lg">
    <InputLeftElement pointerEvents="none">
      <IconSearch stroke={1.5} />
    </InputLeftElement>

    <Input
      variant="filled"
      placeholder={STRINGS.MODALS.SEARCH.TITLE}
      ref={searchBarRef}
      value={searchQuery}
      onChange={(event) => setSearchQuery(event.target.value)}
    />

    {searchQuery && (
      <InputRightElement>
        <Button
          variant="ghost"
          size="sm"
          p={0}
          onClick={() => {
            setSearchQuery('');
            focusOnSearchBar();
          }}
          aria-label={STRINGS.BUTTONS.CLEAR}
        >
          <IconBackspaceFilled stroke={1.5} />
        </Button>
      </InputRightElement>
    )}
  </InputGroup>
);

const NoResultsMessage = () => (
  <Flex
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    textAlign="center"
    py={4}
  >
    <IconZoomQuestion size={100} stroke={1.5} />
    <Text fontSize="lg">{STRINGS.MODALS.SEARCH.NO_RESULTS}</Text>
  </Flex>
);

type SearchResultItemProps = {
  name: CalculatorType['name'];
  index: number;
  isSelected: boolean;
  selectedItemRef?: RefObject<HTMLButtonElement | null>;
  setSelectedItemIndex: (value: number) => void;
  handleClick: () => void;
};

const SearchResultItem = ({
  name,
  index,
  isSelected,
  selectedItemRef,
  setSelectedItemIndex,
  handleClick,
}: SearchResultItemProps) => (
  <Button
    onClick={handleClick}
    height="auto"
    p={4}
    fontSize="md"
    colorScheme={isSelected ? 'teal' : 'gray'}
    justifyContent="start"
    textAlign="left"
    whiteSpace="normal"
    wordBreak="break-word"
    fontWeight="normal"
    _focus={{ shadow: 'none' }}
    ref={isSelected ? selectedItemRef : undefined}
    onFocus={() => setSelectedItemIndex(index)}
  >
    <Flex justifyContent="space-between" alignItems="stretch" gap={2} w="100%">
      {name}
      <Flex justifyContent="center" alignItems="center">
        <IconCornerDownLeft
          stroke={1.5}
          size={20}
          opacity={isSelected ? '75%' : '0%'}
          aria-selected={isSelected}
        />
      </Flex>
    </Flex>
  </Button>
);

export default SearchCommandModal;
