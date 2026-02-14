import { Button, Card, CardBody, Stack, StackDivider } from '@chakra-ui/react';
import { FormEvent } from 'react';
import { Form } from 'react-router-dom';

import STRINGS from '../../data/strings';
import { CalculatorType } from '../../types/calculatorTypes';
import AppCheckbox from '../inputs/AppCheckbox';
import AppNumberInput from '../inputs/AppNumberInput';
import AppRadioGroup from '../inputs/AppRadioGroup';
import AppRadioInput from '../inputs/AppRadioInput';

type FormCardProps = {
  numberInputs?: CalculatorType['fields']['numberInputs'];
  checkboxes?: CalculatorType['fields']['checkboxes'];
  radioGroups?: CalculatorType['fields']['radioGroups'];
  displayResultAndInterpretation: () => void;
};

const FormCard = ({
  numberInputs,
  checkboxes,
  radioGroups,
  displayResultAndInterpretation,
}: FormCardProps) => {
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    displayResultAndInterpretation();
  };

  return (
    <Card overflow="hidden" variant="outline">
      <Form onSubmit={handleFormSubmit}>
        <CardBody>
          <Stack spacing={4} divider={<StackDivider />}>
            {radioGroups &&
              radioGroups.map((radioGroup, index) => (
                <AppRadioGroup
                  key={`${radioGroup.id}-${index}`}
                  {...radioGroup}
                >
                  {radioGroup.radioInputs.map((radio, index) => (
                    <AppRadioInput key={`${radio.id}-${index}`} {...radio} />
                  ))}
                </AppRadioGroup>
              ))}

            {checkboxes &&
              checkboxes.map((checkbox, index) => (
                <AppCheckbox key={`${checkbox.id}-${index}`} {...checkbox} />
              ))}

            {numberInputs &&
              numberInputs.map((input, index) => (
                <AppNumberInput key={`${input.id}-${index}`} {...input} />
              ))}
          </Stack>
          <Stack mt={5}>
            <Button
              type="submit"
              colorScheme="teal"
              w="fit-content"
              mx="auto"
              _focus={{
                borderColor: 'teal',
                boxShadow: '0 0 0 3px teal',
              }}
            >
              {STRINGS.BUTTONS.CALCULATE}
            </Button>
          </Stack>
        </CardBody>
      </Form>
    </Card>
  );
};

export default FormCard;
