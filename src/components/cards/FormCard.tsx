import {
  Button,
  Card,
  CardBody,
  Flex,
  Stack,
  StackDivider,
} from '@chakra-ui/react';
import { Controller, UseFormReturn } from 'react-hook-form';

import STRINGS from '../../data/strings';
import { CalculatorType } from '../../types/calculatorTypes';
import AppCheckbox from '../inputs/AppCheckbox';
import AppNumberInput from '../inputs/AppNumberInput';
import AppRadioInput from '../inputs/AppRadioInput';
import AppRadioOption from '../inputs/AppRadioOption';

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
                      name={input.name}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <AppNumberInput
                          {...input}
                          value={field.value ?? ''}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                        />
                      )}
                    />
                  );

                case 'checkbox':
                  return (
                    <Controller
                      name={input.name}
                      control={control}
                      render={({ field }) => (
                        <AppCheckbox
                          {...input}
                          ref={field.ref}
                          checked={field.value !== undefined}
                          onChange={(checked) =>
                            field.onChange(checked ? input.value : undefined)
                          }
                          onBlur={field.onBlur}
                        />
                      )}
                    />
                  );

                case 'radioInput':
                  return (
                    <Controller
                      name={input.name}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <AppRadioInput
                          {...input}
                          ref={field.ref}
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                        >
                          {input.options.map((radio: any, index: number) => (
                            <AppRadioOption key={index} {...radio} />
                          ))}
                        </AppRadioInput>
                      )}
                    />
                  );

                default:
                  return null;
              }
            })}
          </Stack>

          <Flex justify="center" gap={2} mt={5}>
            <Button type="submit" colorScheme="teal">
              {STRINGS.BUTTONS.CALCULATE}
            </Button>
          </Flex>
        </CardBody>
      </form>
    </Card>
  );
};

export default FormCard;
