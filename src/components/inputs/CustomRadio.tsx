import { Flex, Radio } from '@chakra-ui/react';

import { RadioType } from '../../types/calculatorTypes';
import CustomBadge from './CustomBadge';

type CustomRadioProps = RadioType;

export default function CustomRadio({ id, value, hideBadge, text }: CustomRadioProps) {
  return (
    <Radio value={value.toString()} id={id.toString()} isRequired>
      <Flex align="center" gap={2}>
        {text}
        {hideBadge !== true && typeof value === 'number' && <CustomBadge value={value} />}
      </Flex>
    </Radio>
  );
}
