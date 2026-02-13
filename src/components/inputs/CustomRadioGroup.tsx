import { RadioGroup, Stack, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { RadioGroupType } from '../../types/calculatorTypes';

type CustomRadioGroupProps = Omit<RadioGroupType, 'radioInputs'> & {
  children: ReactNode;
};

const CustomRadioGroup = ({
  id,
  name,
  label,
  children,
}: CustomRadioGroupProps) => (
  <RadioGroup colorScheme="teal" name={name || id.toString()}>
    <Stack>
      <Text as="legend">{label}</Text>
      {children}
    </Stack>
  </RadioGroup>
);

export default CustomRadioGroup;
