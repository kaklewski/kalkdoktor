import { Button, Card, CardBody, Stack, StackDivider } from '@chakra-ui/react'
import { Form } from 'react-router-dom'
import { FormEvent } from 'react'
import CustomRadioGroup from '../inputs/CustomRadioGroup'
import CustomRadio from '../inputs/CustomRadio'
import CustomCheckbox from '../inputs/CustomCheckbox'
import CustomNumberInput from '../inputs/CustomNumberInput'
import { CalculatorType } from '../../types/calculatorTypes'

type FormCardProps = {
  numberInputs?: CalculatorType['fields']['numberInputs']
  checkboxes?: CalculatorType['fields']['checkboxes']
  radioGroups?: CalculatorType['fields']['radioGroups']
  displayResultAndInterpretation: () => void
}

export default function FormCard({
  numberInputs,
  checkboxes,
  radioGroups,
  displayResultAndInterpretation,
}: FormCardProps) {
  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    displayResultAndInterpretation()
  }

  return (
    <Card overflow='hidden' variant='outline'>
      <Form onSubmit={handleFormSubmit}>
        <CardBody>
          <Stack spacing={4} divider={<StackDivider />}>
            {radioGroups &&
              radioGroups.map(radioGroup => (
                <CustomRadioGroup key={radioGroup.id} id={radioGroup.id} text={radioGroup.text}>
                  {radioGroup.radios.map(radio => (
                    <CustomRadio
                      key={radio.id}
                      id={radio.id}
                      value={radio.value}
                      hideBadge={radio.hideBadge}
                      text={radio.text}
                    />
                  ))}
                </CustomRadioGroup>
              ))}

            {checkboxes &&
              checkboxes.map(checkbox => (
                <CustomCheckbox
                  key={checkbox.id}
                  id={checkbox.id}
                  text={checkbox.text}
                  value={checkbox.value}
                />
              ))}

            {numberInputs &&
              numberInputs.map(input => (
                <CustomNumberInput
                  key={input.id}
                  id={input.id}
                  text={input.text}
                  min={input.min}
                  max={input.max}
                />
              ))}

            <Button
              type='submit'
              colorScheme='teal'
              w='fit-content'
              mx='auto'
              _focus={{
                borderColor: 'teal',
                boxShadow: '0 0 0 3px teal',
              }}>
              Oblicz
            </Button>
          </Stack>
        </CardBody>
      </Form>
    </Card>
  )
}
