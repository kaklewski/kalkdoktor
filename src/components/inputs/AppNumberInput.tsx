// This component is a custom number input that allows users to enter comma as decimal separator, which is a workaround for Chakra's NumberInput limitations. Additionally it removes the bug with "home" and "end" buttons not working.

import {
  Box,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react';
import { ChangeEvent, forwardRef, KeyboardEvent, useState } from 'react';

import STRINGS from '../../data/strings';
import { NumberInputType } from '../../types/calculatorTypes';

type AppNumberInputProps = NumberInputType & {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
};

const AppNumberInput = forwardRef(
  (
    {
      id,
      name,
      label,
      min,
      max,
      value: externalValue,
      onChange: externalOnChange,
      onBlur: externalOnBlur,
    }: AppNumberInputProps,
    ref: any,
  ) => {
    const [value, setValue] = useState<string>(externalValue ?? '');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.replace(/,/g, '.');

      if (!/^\d*\.?\d*$/.test(val)) return;

      setValue(val);

      externalOnChange?.(val);
    };

    const handleBlur = () => {
      if (value === '') {
        externalOnBlur?.();
        return;
      }

      const numeric = parseFloat(value);

      let nextValue = value;

      if (isNaN(numeric)) {
        nextValue = '';
      }

      if (min !== undefined && numeric < min) {
        nextValue = min.toString();
      }

      if (max !== undefined && numeric > max) {
        nextValue = max.toString();
      }

      setValue(nextValue);

      externalOnChange?.(nextValue);
      externalOnBlur?.();
    };

    const updateValueByStep = (action: 'increment' | 'decrement') => {
      const current = parseFloat(value) || 0;
      let next = action === 'increment' ? current + 1 : current - 1;

      if (min !== undefined && next < min) next = min;
      if (max !== undefined && next > max) next = max;

      const nextValue = next.toString();

      setValue(nextValue);
      externalOnChange?.(nextValue);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;

      e.preventDefault();

      e.key === 'ArrowUp'
        ? updateValueByStep('increment')
        : updateValueByStep('decrement');
    };

    return (
      <Box>
        <Text as="label" htmlFor={id.toString()} mb={2}>
          {label}
        </Text>
        <NumberInput>
          <Input
            ref={ref}
            id={id.toString()}
            name={name}
            placeholder={STRINGS.FIELDS.NUMBER_INPUT.PLACEHOLDER}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={value ?? ''}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            isRequired
          />
          <NumberInputStepper>
            <NumberIncrementStepper
              onClick={() => updateValueByStep('increment')}
            />
            <NumberDecrementStepper
              onClick={() => updateValueByStep('decrement')}
            />
          </NumberInputStepper>
        </NumberInput>
      </Box>
    );
  },
);

AppNumberInput.displayName = 'AppNumberInput';

export default AppNumberInput;
