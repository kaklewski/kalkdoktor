import {
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  useColorMode,
} from '@chakra-ui/react';
import { IconMoon, IconPercentage50, IconSun } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import STORAGE_KEYS from '../../data/storageKeys';
import STRINGS from '../../data/strings';
import AppTooltip from '../other/AppTooltip';

const ColorModeButton = () => {
  const [isAutoMode, setIsAutoMode] = useState<boolean>(
    () => localStorage.getItem(STORAGE_KEYS.COLOR_MODE.AUTO) === 'true',
  );
  const { colorMode, setColorMode } = useColorMode();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COLOR_MODE.AUTO, `${isAutoMode}`);

    if (!isAutoMode) return;

    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const changeColorMode = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setColorMode('dark');
      } else {
        setColorMode('light');
      }
    };

    prefersDarkScheme.addEventListener('change', changeColorMode);
    return () =>
      prefersDarkScheme.removeEventListener('change', changeColorMode);
  }, [isAutoMode, setColorMode]);

  type ColorMode = 'auto' | 'light' | 'dark';

  const currentMode = (isAutoMode ? 'auto' : colorMode) as ColorMode;
  const currentModeIcon = {
    auto: <IconPercentage50 stroke={1.5} />,
    light: <IconSun stroke={1.5} />,
    dark: <IconMoon stroke={1.5} />,
  };

  const handleColorModeChange = (mode: ColorMode) => {
    if (mode === 'auto') {
      setIsAutoMode(true);
      setColorMode('system');
    } else {
      setIsAutoMode(false);
      setColorMode(mode);
    }
  };

  return (
    <Menu closeOnSelect>
      <AppTooltip label={STRINGS.BUTTONS.CHANGE_COLOR_MODE.TITLE}>
        <MenuButton
          as={IconButton}
          aria-label={STRINGS.BUTTONS.CHANGE_COLOR_MODE.TITLE}
          icon={currentModeIcon[currentMode]}
        />
      </AppTooltip>
      <MenuList>
        <MenuOptionGroup
          value={currentMode}
          title={STRINGS.BUTTONS.CHANGE_COLOR_MODE.TITLE}
          type="radio"
        >
          <MenuItemOption
            value="auto"
            onClick={() => handleColorModeChange('auto')}
          >
            {STRINGS.BUTTONS.CHANGE_COLOR_MODE.AUTO}
          </MenuItemOption>
          <MenuItemOption
            value="light"
            onClick={() => handleColorModeChange('light')}
          >
            {STRINGS.BUTTONS.CHANGE_COLOR_MODE.LIGHT}
          </MenuItemOption>
          <MenuItemOption
            value="dark"
            onClick={() => handleColorModeChange('dark')}
          >
            {STRINGS.BUTTONS.CHANGE_COLOR_MODE.DARK}
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default ColorModeButton;
