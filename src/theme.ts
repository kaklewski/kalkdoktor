// https://codesandbox.io/p/sandbox/chakra-change-focus-ring-color-c2yis?file=%2Fsrc%2Ftheme.ts%3A1%2C1-78%2C1

import { extendTheme } from '@chakra-ui/react'

const variantOutlined = () => ({
	field: {
		_focus: {
			borderColor: 'var(--chakra-ui-focus-ring-color)',
			boxShadow: '0 0 0 2px var(--chakra-ui-focus-ring-color)',
		},
	},
})

const variantFilled = () => ({
	field: {
		_focus: {
			borderColor: 'var(--chakra-ui-focus-ring-color)',
			boxShadow: '0 0 0 1px var(--chakra-ui-focus-ring-color)',
		},
	},
})

const variantFlushed = () => ({
	field: {
		_focus: {
			borderColor: 'var(--chakra-ui-focus-ring-color)',
			boxShadow: '0 1px 0 0 var(--chakra-ui-focus-ring-color)',
		},
	},
})

export const theme = extendTheme({
	config: {
		initialColorMode: 'system',
		useSystemColorMode: true,
	},
	styles: {
		global: {
			html: {
				'--chakra-ui-focus-ring-color': 'teal',
			},
		},
	},
	shadows: {
		outline: '0 0 0 3px var(--chakra-ui-focus-ring-color)',
	},
	components: {
		Input: {
			variants: {
				outline: variantOutlined,
				filled: variantFilled,
				flushed: variantFlushed,
			},
		},
		NumberInput: {
			variants: {
				outline: variantOutlined,
				filled: variantFilled,
				flushed: variantFlushed,
			},
		},
		Select: {
			variants: {
				outline: variantOutlined,
				filled: variantFilled,
				flushed: variantFlushed,
			},
		},
		Textarea: {
			variants: {
				outline: () => variantOutlined().field,
				filled: () => variantFilled().field,
				flushed: () => variantFlushed().field,
			},
		},
	},
})
