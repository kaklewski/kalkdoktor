import { ReactNode } from 'react';

type CalculatorType = {
  id: number;
  name: string;
  urlPath: string;
  category: string;
  description: string;
  methodology?: ReactNode;
  sources?: SourceType[];
  form: FormFieldType[];
  calculateResult: (formValues: {
    [key: string]: string;
  }) => [number | string, string];
};

type SourceType = {
  id: number;
  author: string;
  title: string;
  dateOfAccess: string;
  link: string;
};

type FormFieldType = NumberInputType | CheckboxType | RadioGroupType;

type NumberInputType = {
  type: 'numberInput';
  name: string;
  label: string;
  min: number;
  max: number;
};

type CheckboxType = {
  type: 'checkbox';
  name: string;
  value: number;
  label: string;
  hideBadge?: boolean;
};

type RadioGroupType = {
  type: 'radioGroup';
  name: string;
  label: string;
  radioInputs: RadioType[];
};

type RadioType = {
  value: number | string;
  label: string;
  hideBadge?: boolean;
};

export type {
  CalculatorType,
  CheckboxType,
  NumberInputType,
  RadioGroupType,
  RadioType,
  SourceType,
};
