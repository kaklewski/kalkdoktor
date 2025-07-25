import { Box, RadioGroup, Stack, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { RadioGroupType } from '../../types/calculatorTypes';

type CustomRadioGroupProps = Omit<RadioGroupType, 'radios'> & {
  children: ReactNode;
};

export default function CustomRadioGroup({ text, id, children }: CustomRadioGroupProps) {
  return (
    <Box>
      <RadioGroup colorScheme="teal" name={id.toString()}>
        <Stack>
          <Text>{text}</Text>
          {children}
        </Stack>
      </RadioGroup>
    </Box>
  );
}
