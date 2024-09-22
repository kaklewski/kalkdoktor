import {
	Box,
	Flex,
	useColorMode,
	Divider,
	IconButton,
	Link,
	Button,
	Text,
	Tooltip,
} from '@chakra-ui/react'
import {
	IconHearts,
	IconMedicalCross,
	IconMoon,
	IconSun,
} from '@tabler/icons-react'
import SearchModal from './SearchModal'

export default function Navbar() {
	const { colorMode, toggleColorMode } = useColorMode()
	return (
		<>
			<Box p={4}>
				<Flex
					align='center'
					justify='space-between'
					gap={6}
					wrap='wrap'>
					<Box>
						<Link href='/' id='navLogo'>
							<Flex align='center'>
								<IconMedicalCross />
								<Text>kalkdoktor</Text>
							</Flex>
						</Link>
					</Box>

					<Flex align='center' gap={3} wrap='wrap'>
						<SearchModal />

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

						<Tooltip
							label={`Zmień motyw na ${
								colorMode === 'light' ? 'ciemny' : 'jasny'
							}`}>
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
						</Tooltip>
					</Flex>
				</Flex>
			</Box>
			<Divider />
		</>
	)
}
