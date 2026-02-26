import { ChakraProvider } from '@chakra-ui/react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import STORAGE_KEYS from '../../data/storageKeys';
import STRINGS from '../../data/strings';
import ColorModeButton from './ColorModeButton';

describe('ColorModeButton', () => {
  const { setColorModeMock } = vi.hoisted(() => {
    return {
      setColorModeMock: vi.fn(),
    };
  });

  vi.mock('@chakra-ui/react', async () => {
    const actualChakra = await vi.importActual<any>('@chakra-ui/react');

    return {
      ...actualChakra,
      useColorMode: () => ({
        colorMode: 'dark',
        setColorMode: setColorModeMock,
        toggleColorMode: vi.fn(),
      }),
    };
  });

  beforeEach(() => {
    localStorage.clear();
    setColorModeMock.mockClear();
  });

  it('changes to light color mode when light option is clicked', () => {
    render(
      <ChakraProvider>
        <ColorModeButton />
      </ChakraProvider>,
    );

    const button = screen.getByRole('button', {
      name: STRINGS.BUTTONS.CHANGE_COLOR_MODE.TITLE,
    });

    fireEvent.click(button);

    const lightOption = screen.getByText(
      STRINGS.BUTTONS.CHANGE_COLOR_MODE.LIGHT,
    );

    fireEvent.click(lightOption);

    expect(setColorModeMock).toHaveBeenCalledWith('light');
    expect(localStorage.getItem(STORAGE_KEYS.COLOR_MODE.AUTO)).toBe('false');
  });

  it('sets color mode to auto when auto option is clicked', () => {
    render(
      <ChakraProvider>
        <ColorModeButton />
      </ChakraProvider>,
    );

    const button = screen.getByRole('button', {
      name: STRINGS.BUTTONS.CHANGE_COLOR_MODE.TITLE,
    });

    fireEvent.click(button);

    const autoOption = screen.getByText(STRINGS.BUTTONS.CHANGE_COLOR_MODE.AUTO);

    fireEvent.click(autoOption);

    expect(setColorModeMock).toHaveBeenCalledWith('system');
    expect(localStorage.getItem(STORAGE_KEYS.COLOR_MODE.AUTO)).toBe('true');
  });
});

afterEach(() => {
  cleanup();
});
