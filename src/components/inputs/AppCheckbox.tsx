import { Checkbox, Text } from '@chakra-ui/react';
import { forwardRef } from 'react';

import { CheckboxType } from '../../types/calculatorTypes';
import AppBadge from './AppBadge';

type AppCheckboxProps = CheckboxType & {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  onBlur?: () => void;
};

const AppCheckbox = forwardRef<HTMLInputElement, AppCheckboxProps>(
  (
    {
      name,
      label,
      hideBadge,
      value: badgeValue,
      checked = false,
      onChange,
      onBlur,
    },
    ref,
  ) => {
    const isBadgeVisible = !hideBadge && typeof badgeValue === 'number';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.checked);
    };

    return (
      <Checkbox
        ref={ref}
        name={name}
        isChecked={checked}
        onChange={handleChange}
        onBlur={onBlur}
        colorScheme="teal"
        w="100%"
      >
        <Text as="span" mr={isBadgeVisible ? 2 : 0} whiteSpace="pre-line">
          {label}
        </Text>
        {isBadgeVisible && <AppBadge value={badgeValue} />}
      </Checkbox>
    );
  },
);

AppCheckbox.displayName = 'AppCheckbox';

export default AppCheckbox;
