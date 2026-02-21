import { ReactNode } from 'react';

type CalculatorType = {
  id: number;
  name: string;
  urlPath: string;
  category: string;
  description: string;
  methodology?: ReactNode;
  sources: SourceType[] | 'ownWork';
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

type FormFieldType = NumberInputType | CheckboxType | RadioInputType;

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

type RadioInputType = {
  type: 'radioInput';
  name: string;
  label: string;
  options: RadioOptionType[];
};

type RadioOptionType = {
  value: number | string;
  label: string;
  hideBadge?: boolean;
};

export type {
  CalculatorType,
  CheckboxType,
  NumberInputType,
  RadioInputType as RadioGroupType,
  RadioOptionType as RadioType,
  SourceType,
};
