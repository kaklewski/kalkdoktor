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
import { ChangeEvent, KeyboardEvent, useState } from 'react';

import STRINGS from '../../data/strings';
import { NumberInputType } from '../../types/calculatorTypes';

type AppNumberInputProps = NumberInputType;

const AppNumberInput = ({ id, label, min, max }: AppNumberInputProps) => {
  const [value, setValue] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val: string = e.target.value.replace(/,/g, '.');

    if (!/^\d*\.?\d*$/.test(val)) return;

    setValue(val);
  };

  const handleBlur = () => {
    if (value === '') return;

    const numeric = parseFloat(value.replace(/,/g, '.'));

    if (isNaN(numeric)) {
      setValue('');
      return;
    }

    if (min !== undefined && numeric < min) {
      setValue(min.toString());
    }

    if (max !== undefined && numeric > max) {
      setValue(max.toString());
    }
  };

  const updateValueByStep = (action: 'increment' | 'decrement') => {
    const current = parseFloat(value.replace(/,/g, '.')) || 0;
    let next = action === 'increment' ? current + 1 : current - 1;

    if (min !== undefined && next < min) next = min;
    if (max !== undefined && next > max) next = max;

    setValue(next.toString());
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
          id={id.toString()}
          placeholder={STRINGS.FIELDS.NUMBER_INPUT.PLACEHOLDER}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={value}
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
};

export default AppNumberInput;
