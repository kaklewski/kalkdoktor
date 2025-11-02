import { Box, Checkbox, Flex, Text } from '@chakra-ui/react';

import { CheckboxType } from '../../types/calculatorTypes';
import CustomBadge from './CustomBadge';

type CustomCheckboxProps = CheckboxType;

export default function CustomCheckbox({
  id,
  value,
  hideBadge,
  text,
}: CustomCheckboxProps) {
  const isBadgeDisplayed = !hideBadge && typeof value === 'number';

  return (
    <Box>
      <Checkbox value={value} name={id.toString()} colorScheme="teal" w="100%">
        <Flex align="center" gap={2}>
          <Text style={{ whiteSpace: 'pre-line' }}>{text}</Text>
          {isBadgeDisplayed && <CustomBadge value={value} />}
        </Flex>
      </Checkbox>
    </Box>
  );
}
