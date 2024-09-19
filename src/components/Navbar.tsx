import { Box, Flex, useColorMode, Divider, IconButton } from '@chakra-ui/react'
import { IconMedicalCross, IconMoon, IconSun } from '@tabler/icons-react'

export default function Navbar() {
	const { colorMode, toggleColorMode } = useColorMode()
	return (
		<>
			<Box p={4}>
				<Flex align='center' justify='space-between'>
					<Box>
						<a href='/' id='navLogo'>
							<Flex align='center' gap={0}>
								<IconMedicalCross />
								<span>kalkdoktor</span>
							</Flex>
						</a>
					</Box>

					<Flex align='center'>
						<IconButton
							onClick={toggleColorMode}
							aria-label={`Zmień motyw na ${
								colorMode === 'light' ? 'ciemny' : 'jasny'
							}`}>
							{colorMode === 'light' ? (
								<IconMoon stroke={1.5} />
							) : (
								<IconSun stroke={1.5} />
							)}
						</IconButton>
					</Flex>
				</Flex>
			</Box>
			<Divider />
		</>
	)
}
