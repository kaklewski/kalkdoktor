import {
	Box,
	Flex,
	useColorMode,
	Divider,
	IconButton,
	Link,
	Button,
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
					gap={3}
					wrap='wrap'>
					<Box>
						<a href='/' id='navLogo'>
							<Flex align='center' gap={0}>
								<IconMedicalCross />
								<span>kalkdoktor</span>
							</Flex>
						</a>
					</Box>

					<Flex align='center' gap={3} wrap='wrap'>
						<Button leftIcon={<IconSearch stroke={1.5} />}>
							Search
						</Button>
						<Link href='/favorites'>
							<Button leftIcon={<IconHearts stroke={1.5} />}>
								Favorites
							</Button>
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
