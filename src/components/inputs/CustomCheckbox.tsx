import { Box, Checkbox, Flex } from '@chakra-ui/react';
import CustomBadge from './CustomBadge';
import { CheckboxType } from '../../types/calculatorTypes';

type CustomCheckboxProps = CheckboxType;

export default function CustomCheckbox({ id, value, text }: CustomCheckboxProps) {
  return (
    <Box>
      <Checkbox value={value} name={id.toString()} colorScheme="teal" w="100%">
        <Flex align="center" gap={2}>
          {text}
          <CustomBadge value={value} />
        </Flex>
      </Checkbox>
    </Box>
  );
}
