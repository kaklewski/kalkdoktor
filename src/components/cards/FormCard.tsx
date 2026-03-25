import { Button, Card, CardBody, Stack, StackDivider } from '@chakra-ui/react';
import { Controller, UseFormReturn } from 'react-hook-form';

import STRINGS from '../../data/strings';
import { CalculatorModel } from '../../types/calculatorModels';
import AppCheckbox from '../inputs/AppCheckbox';
import AppNumberInput from '../inputs/AppNumberInput';
import AppRadioInput from '../inputs/AppRadioInput';
import AppRadioOption from '../inputs/AppRadioOption';
import ResponsiveButtonGroup from '../other/ResponsiveButtonGroup';

type FormCardProps = {
    form: CalculatorModel['form'];
    formMethods: UseFormReturn;
    onSubmit: (values: Record<string, string>) => void;
};

const FormCard = ({ form, formMethods, onSubmit }: FormCardProps) => {
    const { control, handleSubmit } = formMethods;

    return (
        <Card overflow="hidden" variant="outline" rounded="lg">
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardBody>
                    <Stack spacing={4} divider={<StackDivider />}>
                        {form.map((input) => {
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
                                                    ref={field.ref}
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
                                                    checked={
                                                        field.value !==
                                                        undefined
                                                    }
                                                    onChange={(checked) =>
                                                        field.onChange(
                                                            checked
                                                                ? input.value
                                                                : undefined,
                                                        )
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
                                                    {input.options.map(
                                                        (
                                                            radio,
                                                            index: number,
                                                        ) => (
                                                            <AppRadioOption
                                                                key={index}
                                                                {...radio}
                                                            />
                                                        ),
                                                    )}
                                                </AppRadioInput>
                                            )}
                                        />
                                    );

                                default:
                                    return null;
                            }
                        })}
                    </Stack>

                    <ResponsiveButtonGroup mt={5}>
                        <Button type="submit" colorScheme="teal">
                            {STRINGS.BUTTONS.CALCULATE}
                        </Button>
                    </ResponsiveButtonGroup>
                </CardBody>
            </form>
        </Card>
    );
};

export default FormCard;
