import { ReactNode } from 'react';

type CalculatorModel = {
    id: number;
    name: string;
    urlPath: string;
    category: string;
    description: string;
    methodology?: ReactNode;
    sources: SourceModel[] | 'ownWork';
    form: FormFieldModel[];
    calculateResult: (
        formValues: Record<string, string>,
    ) => [ResultModel, InterpretationModel];
};

type SourceModel = {
    id: number;
    author: string;
    title: string;
    dateOfAccess: string;
    link: string;
};

type FormFieldModel = NumberInputModel | CheckboxModel | RadioInputModel;
type ResultModel = number | string | null;
type InterpretationModel = string | null;

type NumberInputModel = {
    type: 'numberInput';
    name: string;
    label: string;
    unit?: string;
    min: number;
    max: number;
};

type CheckboxModel = {
    type: 'checkbox';
    name: string;
    value: number;
    label: string;
    hideBadge?: boolean;
};

type RadioInputModel = {
    type: 'radioInput';
    name: string;
    label: string;
    options: RadioOptionModel[];
};

type RadioOptionModel = {
    value: number | string;
    label: string;
    hideBadge?: boolean;
};

export type {
    CalculatorModel,
    CheckboxModel,
    InterpretationModel,
    NumberInputModel,
    RadioInputModel,
    RadioOptionModel,
    ResultModel,
    SourceModel,
};
