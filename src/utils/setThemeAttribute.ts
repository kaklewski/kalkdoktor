// Set up the theme before React loads the Virtual-DOM to remove the flashing effect.
export default function setThemeAttribute() {
  const theme = localStorage.getItem('chakra-ui-color-mode')
  const htmlElement = document.querySelector('html')

  if (htmlElement === null || theme === null) return

  htmlElement.setAttribute('data-theme', theme)
}
