import { Box, Checkbox, Flex, Text } from '@chakra-ui/react';

import { CheckboxType } from '../../types/calculatorTypes';
import AppBadge from './AppBadge';

type AppCheckboxProps = CheckboxType;

const AppCheckbox = ({
  id,
  name,
  value,
  label,
  hideBadge,
}: AppCheckboxProps) => {
  const isBadgeVisible = !hideBadge && typeof value === 'number';

  return (
    <Box>
      <Checkbox
        id={id.toString()}
        value={value}
        name={name || id.toString()}
        colorScheme="teal"
        w="100%"
      >
        <Flex align="center" gap={2}>
          <Text style={{ whiteSpace: 'pre-line' }}>{label}</Text>
          {isBadgeVisible && <AppBadge value={value} />}
        </Flex>
      </Checkbox>
    </Box>
  );
};

export default AppCheckbox;
