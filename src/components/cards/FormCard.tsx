import { Button, Card, CardBody, Stack, StackDivider } from '@chakra-ui/react';
import { Controller, UseFormReturn } from 'react-hook-form';

import STRINGS from '../../data/strings';
import { CalculatorType } from '../../types/calculatorTypes';
import AppCheckbox from '../inputs/AppCheckbox';
import AppNumberInput from '../inputs/AppNumberInput';
import AppRadioGroup from '../inputs/AppRadioGroup';
import AppRadioInput from '../inputs/AppRadioInput';

type FormCardProps = {
  form: CalculatorType['form'];
  formMethods: UseFormReturn;
  onSubmit: (values: any) => void;
};

const FormCard = ({ form, formMethods, onSubmit }: FormCardProps) => {
  const { control, handleSubmit } = formMethods;

  return (
    <Card overflow="hidden" variant="outline">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody>
          <Stack spacing={4} divider={<StackDivider />}>
            {form.map((input: any) => {
              switch (input.type) {
                case 'numberInput':
                  return (
                    <Controller
                      key={input.id}
                      name={input.name}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <AppNumberInput
                          id={input.id}
                          name={input.name}
                          label={input.label}
                          min={input.min}
                          max={input.max}
                          value={field.value ?? ''}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                        />
                      )}
                    />
                  );

                case 'radioGroup':
                  return (
                    <Controller
                      key={input.id}
                      name={input.name}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <AppRadioGroup
                          id={input.id}
                          name={input.name}
                          label={input.label}
                          value={field.value}
                          onChange={field.onChange}
                        >
                          {input.options.map((option: any) => (
                            <AppRadioInput
                              key={option.id}
                              id={option.id}
                              value={option.value}
                              label={option.label}
                              hideBadge={option.hideBadge}
                            />
                          ))}
                        </AppRadioGroup>
                      )}
                    />
                  );

                case 'checkbox':
                  return (
                    <Controller
                      key={input.id}
                      name={input.name}
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <AppCheckbox
                          id={input.id}
                          name={input.name}
                          value={field.value}
                          onChange={field.onChange}
                          label={input.label}
                          hideBadge={input.hideBadge}
                        />
                      )}
                    />
                  );

                default:
                  return null;
              }
            })}
          </Stack>

          <Stack mt={5}>
            <Button type="submit" colorScheme="teal" w="fit-content" mx="auto">
              {STRINGS.BUTTONS.CALCULATE}
            </Button>
          </Stack>
        </CardBody>
      </form>
    </Card>
  );
};

export default FormCard;
