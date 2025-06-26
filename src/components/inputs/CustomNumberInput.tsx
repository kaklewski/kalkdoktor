import {
  Box,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react'
import { NumberInputType } from '../../types/calculatorTypes'
import STRINGS from '../../data/strings'
import { useRef } from 'react'

type CustomNumberInputProps = NumberInputType

export default function CustomNumberInput({ id, text, min, max }: CustomNumberInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ',') {
      event.preventDefault()

      // Replace comma with dot at cursor position
      const input = event.currentTarget
      const { selectionStart, selectionEnd, value } = input

      if (selectionStart !== null && selectionEnd !== null) {
        const newValue = value.slice(0, selectionStart) + '.' + value.slice(selectionEnd)
        input.value = newValue
        input.setSelectionRange(selectionStart + 1, selectionStart + 1)

        // Manually trigger input event to let Chakra know about the change
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        )?.set
        nativeInputValueSetter?.call(input, newValue)

        const event = new Event('input', { bubbles: true })
        input.dispatchEvent(event)
      }
    }
  }

  return (
    <Box>
      <Text mb={2}>{text}</Text>
      <NumberInput min={min} max={max} id={`${id}`} isRequired>
        <NumberInputField
          ref={inputRef}
          onKeyDown={handleKeyDown}
          placeholder={STRINGS.FIELDS.NUMBER_INPUT.PLACEHOLDER}
        />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Box>
  )
}
