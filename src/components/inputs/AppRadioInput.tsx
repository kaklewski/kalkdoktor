import { Flex, Radio, Text } from '@chakra-ui/react';

import { RadioType } from '../../types/calculatorTypes';
import AppBadge from './AppBadge';

type AppRadioInputProps = RadioType;

const AppRadioInput = ({ value, label, hideBadge }: AppRadioInputProps) => {
  const isBadgeVisible = !hideBadge && typeof value === 'number';

  return (
    <Radio value={value.toString()} isRequired>
      <Flex align="center" gap={2}>
        <Text style={{ whiteSpace: 'pre-line' }}>{label}</Text>
        {isBadgeVisible && <AppBadge value={value} />}
      </Flex>
    </Radio>
  );
};

export default AppRadioInput;
