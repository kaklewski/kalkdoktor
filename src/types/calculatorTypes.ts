export type SourceType = {
  id: number
  name: string
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
  methodology?: string | null
  sources: SourceType[] | null
  fields: {
    numberInputs?: NumberInputType[] | null
    checkboxes?: CheckboxType[] | null
    radioGroups?: RadioGroupType[] | null
  }
  resultUnit?: string | null
  getResult: () => number
  getResultInterpretation: (result: number) => string
}
