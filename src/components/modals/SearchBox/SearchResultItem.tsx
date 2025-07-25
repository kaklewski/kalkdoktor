import { Button, Flex } from '@chakra-ui/react';
import { IconCornerDownLeft } from '@tabler/icons-react';
import { Link as RouterLink } from 'react-router-dom';

import { CalculatorType } from '../../../types/calculatorTypes';

type SearchResultItemProps = {
  name: CalculatorType['name'];
  link: CalculatorType['urlPath'];
  index: number;
  isSelected: boolean;
  selectedItemRef: React.RefObject<HTMLButtonElement> | false;
  setSelectedItemIndex: (value: number) => void;
  closeSearchBox: () => void;
};

export default function SearchResultItem({
  name,
  link,
  index,
  isSelected,
  selectedItemRef,
  setSelectedItemIndex,
  closeSearchBox,
}: SearchResultItemProps) {
  return (
    <Button
      as={RouterLink}
      to={link}
      onClick={closeSearchBox}
      height="auto"
      p={4}
      fontSize="md"
      colorScheme={isSelected === true ? 'teal' : 'gray'}
      style={{
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        textAlign: 'left',
        display: 'flex',
        justifyContent: 'start',
        fontWeight: 'normal',
      }}
      // Remove the default shadow-outline of a focused element
      _focus={{ shadow: 'none' }}
      ref={selectedItemRef !== false ? selectedItemRef : null}
      onFocus={() => setSelectedItemIndex(index)}
      onMouseMove={() => {
        setSelectedItemIndex(index);
      }}
    >
      <Flex justifyContent="space-between" alignItems="stretch" gap={2} w="100%">
        {name}
        <Flex justifyContent="center" alignItems="center">
          <IconCornerDownLeft
            stroke={1.5}
            size={20}
            style={{
              opacity: '55%',
            }}
          />
        </Flex>
      </Flex>
    </Button>
  );
}
