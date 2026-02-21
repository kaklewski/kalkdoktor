// This component is a custom number input that allows users to enter comma as decimal separator, which is a workaround for Chakra's NumberInput limitations. Additionally it removes the bug with "home" and "end" buttons not working.

import {
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { forwardRef, KeyboardEvent } from 'react';

import STRINGS from '../../data/strings';
import { NumberInputType } from '../../types/calculatorTypes';

type AppNumberInputProps = NumberInputType & {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
};

const AppNumberInput = forwardRef<HTMLInputElement, AppNumberInputProps>(
  ({ name, label, min, max, value, onChange, onBlur }, ref) => {
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      // Chakra hack: replace a comma with a dot.
      if (event.key === ',') {
        event.preventDefault();

        const input = event.currentTarget;
        const { selectionStart, selectionEnd, value } = input;

        if (selectionStart !== null && selectionEnd !== null) {
          const newValue = `${value.slice(0, selectionStart)}.${value.slice(selectionEnd)}`;

          onChange?.(newValue);
        }
      }
    };

    return (
      <FormControl>
        <FormLabel htmlFor={name}>{label}</FormLabel>

        <NumberInput
          min={min}
          max={max}
          value={value ?? ''}
          onChange={(valueString, _valueNumber) => {
            onChange?.(valueString);
          }}
        >
          <NumberInputField
            ref={ref}
            id={name}
            name={name}
            onKeyDown={handleKeyDown}
            onBlur={onBlur}
            placeholder={STRINGS.FIELDS.NUMBER_INPUT.PLACEHOLDER}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    );
  },
);

AppNumberInput.displayName = 'AppNumberInput';

export default AppNumberInput;
