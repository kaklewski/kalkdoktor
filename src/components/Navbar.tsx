import {
	Box,
	Flex,
	useColorMode,
	Link,
	Divider,
	IconButton,
} from '@chakra-ui/react'

const moonIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='1.5'
		strokeLinecap='round'
		strokeLinejoin='round'>
		<path stroke='none' d='M0 0h24v24H0z' fill='none' />
		<path d='M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z' />
	</svg>
)

const sunIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='1.5'
		strokeLinecap='round'
		strokeLinejoin='round'>
		<path stroke='none' d='M0 0h24v24H0z' fill='none' />
		<path d='M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0' />
		<path d='M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7' />
	</svg>
)

export default function Navbar() {
	const { colorMode, toggleColorMode } = useColorMode()
	return (
		<>
			<Box p={4}>
				<Flex alignItems={'center'} justifyContent={'space-between'}>
					<Box>
						<Link href='/'>Kalkdoktor</Link>
					</Box>

					<Flex alignItems={'center'}>
						<IconButton
							onClick={toggleColorMode}
							aria-label={`Zmień motyw na ${
								colorMode === 'light' ? 'ciemny' : 'jasny'
							}`}>
							{colorMode === 'light' ? moonIcon : sunIcon}
						</IconButton>
					</Flex>
				</Flex>
			</Box>
			<Divider />
		</>
	)
}
