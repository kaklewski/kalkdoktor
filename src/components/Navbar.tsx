import {
	Box,
	Flex,
	useColorMode,
	Divider,
	IconButton,
	Link,
	Button,
	Text,
} from '@chakra-ui/react'
import {
	IconHearts,
	IconMedicalCross,
	IconMoon,
	IconSearch,
	IconSun,
} from '@tabler/icons-react'

export default function Navbar() {
	const { colorMode, toggleColorMode } = useColorMode()
	return (
		<>
			<Box p={4}>
				<Flex
					align='center'
					justify='space-between'
					gap={8}
					wrap='wrap'>
					<Box>
						<Link href='/' id='navLogo'>
							<Flex align='center' gap={0}>
								<IconMedicalCross />
								<Text>kalkdoktor</Text>
							</Flex>
						</Link>
					</Box>

					<Flex align='center' gap={3} wrap='wrap'>
						<Button
							id='search-icon-big'
							leftIcon={<IconSearch stroke={1.5} />}
							colorScheme='teal'
							variant='solid'
							aria-label='Wyszukaj kalkulator'>
							Wyszukaj
						</Button>

						<IconButton
							id='search-icon-small'
							colorScheme='teal'
							variant='solid'
							aria-label='Wyszukaj kalkulator'>
							<IconSearch stroke={1.5} />
						</IconButton>

						<Link href='/ulubione'>
							<Button
								id='favorites-icon-big'
								leftIcon={<IconHearts stroke={1.5} />}
								
								aria-label='Ulubione'>
								Ulubione
							</Button>

							<IconButton
								id='favorites-icon-small'
								
								aria-label='Ulubione'>
								<IconHearts stroke={1.5} />
							</IconButton>
						</Link>

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
