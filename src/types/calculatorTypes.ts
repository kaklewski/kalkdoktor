import { ReactNode } from 'react';

type CalculatorType = {
  id: number;
  name: string;
  urlPath: string;
  category: string;
  description: string;
  methodology?: null | ReactNode;
  sources?: null | SourceType[];
  fields: {
    numberInputs?: null | NumberInputType[];
    checkboxes?: null | CheckboxType[];
    radioGroups?: null | RadioGroupType[];
  };
  resultUnit?: null | string;
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
  text: string;
  min: number;
  max: number;
};

type CheckboxType = {
  id: string | number;
  value: number;
  name?: string;
  text: string;
  hideBadge?: boolean;
};

type RadioType = {
  id: string | number;
  value: number | string;
  hideBadge?: boolean;
  text: string;
};

type RadioGroupType = {
  id: string | number;
  text: string;
  radios: RadioType[];
};

export type {
  CalculatorType,
  CheckboxType,
  NumberInputType,
  RadioGroupType,
  RadioType,
  SourceType,
};
