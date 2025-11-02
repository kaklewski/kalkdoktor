import { Flex, Radio, Text } from '@chakra-ui/react';

import { RadioType } from '../../types/calculatorTypes';
import CustomBadge from './CustomBadge';

type CustomRadioProps = RadioType;

export default function CustomRadio({
  id,
  value,
  hideBadge,
  text,
}: CustomRadioProps) {
  const isBadgeDisplayed = !hideBadge && typeof value === 'number';

  return (
    <Radio value={value.toString()} id={id.toString()} isRequired>
      <Flex align="center" gap={2}>
        <Text style={{ whiteSpace: 'pre-line' }}>{text}</Text>
        {isBadgeDisplayed && <CustomBadge value={value} />}
      </Flex>
    </Radio>
  );
}
