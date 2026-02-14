import { RadioGroup, Stack, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { RadioGroupType } from '../../types/calculatorTypes';

type AppRadioGroupProps = Omit<RadioGroupType, 'radioInputs'> & {
  children: ReactNode;
};

const AppRadioGroup = ({ id, name, label, children }: AppRadioGroupProps) => (
  <RadioGroup colorScheme="teal" name={name || id.toString()}>
    <Stack>
      <Text as="legend">{label}</Text>
      {children}
    </Stack>
  </RadioGroup>
);

export default AppRadioGroup;
