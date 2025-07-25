import { Button, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { IconBackspaceFilled, IconSearch } from '@tabler/icons-react';
import STRINGS from '../../../data/strings';

type SearchBarProps = {
  searchBarRef: React.RefObject<HTMLInputElement>;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  focusOnSearchBar: () => void;
};

export default function SearchBar({
  searchBarRef,
  searchQuery,
  setSearchQuery,
  focusOnSearchBar,
}: SearchBarProps) {
  return (
    <InputGroup>
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
}
