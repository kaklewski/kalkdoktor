import STORAGE_KEYS from '../data/storageKeys';

// Set up the theme before React loads the Virtual-DOM to remove the flashing effect.
export default function setThemeAttribute() {
  const theme = localStorage.getItem(STORAGE_KEYS.COLOR_THEME.CHAKRA);
  const htmlElement = document.querySelector('html');

  if (!htmlElement || !theme) return;

  htmlElement.setAttribute('data-theme', theme);
}
