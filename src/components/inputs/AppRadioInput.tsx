import { RadioGroup, Stack, Text } from '@chakra-ui/react';
import { forwardRef, ReactNode } from 'react';

import { RadioGroupType } from '../../types/calculatorTypes';

type AppRadioGroupProps = Omit<RadioGroupType, 'options'> & {
  children: ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
};

const AppRadioInput = forwardRef<HTMLDivElement, AppRadioGroupProps>(
  ({ name, label, children, value, onChange, onBlur }, ref) => (
    <RadioGroup
      ref={ref}
      colorScheme="teal"
      name={name}
      value={value ?? ''}
      onChange={onChange}
      onBlur={onBlur}
    >
      <Stack>
        <Text as="legend">{label}</Text>
        {children}
      </Stack>
    </RadioGroup>
  ),
);

AppRadioInput.displayName = 'AppRadioGroup';

export default AppRadioInput;
