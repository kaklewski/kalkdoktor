import { ReactNode } from 'react';

type CalculatorType = {
  id: number;
  name: string;
  urlPath: string;
  category: string;
  description: string;
  methodology?: ReactNode;
  sources?: SourceType[];
  form: any; // todo - define form type
  calculateResult: any; // todo - define calculateResult type
  resultUnit?: string;
};

type SourceType = {
  id: number;
  author: string;
  title: string;
  dateOfAccess: string;
  link: string;
};

type NumberInputType = {
  id: string | number;
  name?: string;
  label: string;
  min: number;
  max: number;
};

type CheckboxType = {
  id: string | number;
  value: number;
  name?: string;
  label: string;
  hideBadge?: boolean;
};

type RadioType = {
  id: string | number;
  value: number | string;
  hideBadge?: boolean;
  label: string;
};

type RadioGroupType = {
  id: string | number;
  name?: string;
  label: string;
  radioInputs: RadioType[];
};

export type {
  CalculatorType,
  CheckboxType,
  NumberInputType,
  RadioGroupType,
  RadioType,
  SourceType,
};
