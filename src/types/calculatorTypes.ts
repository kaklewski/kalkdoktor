import { ReactNode } from 'react'

export type SourceType = {
  id: number
  author: string
  title: string
  dateOfAccess: string
  link: string
}

export type NumberInputType = {
  id: string | number
  text: string
  min: number
  max: number
}

export type CheckboxType = {
  id: string | number
  value: number
  text: string
}

export type RadioType = {
  id: string | number
  value: number | string
  hideBadge?: boolean
  text: string
}

export type RadioGroupType = {
  id: string | number
  text: string
  radios: RadioType[]
}

export type CalculatorType = {
  id: number
  name: string
  urlPath: string
  category: string
  description: string
  methodology?: null | ReactNode
  sources?: null | SourceType[]
  fields: {
    numberInputs?: null | NumberInputType[]
    checkboxes?: null | CheckboxType[]
    radioGroups?: null | RadioGroupType[]
  }
  resultUnit?: null | string
  getResult: () => number
  getResultInterpretation: (result: number) => string
}
