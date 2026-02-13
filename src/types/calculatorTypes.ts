import { ReactNode } from 'react';

type CalculatorType = {
  id: number;
  name: string;
  urlPath: string;
  category: string;
  description: string;
  methodology?: ReactNode;
  sources?: SourceType[];
  fields: {
    numberInputs?: NumberInputType[];
    checkboxes?: CheckboxType[];
    radioGroups?: RadioGroupType[];
  };
  resultUnit?: string;
  getResult: () => number;
  getResultInterpretation: (result: number) => string;
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
