import {
	Box,
	Flex,
	Divider,
	IconButton,
	Link,
	Button,
	Text,
	Badge,
} from '@chakra-ui/react'
import { IconHearts, IconMedicalCross } from '@tabler/icons-react'
import SearchModal from './SearchModal'
import ThemeButton from './ThemeButton'

export default function Navbar() {
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
								<Badge
									ml='2'
									colorScheme='teal'
									variant='outline'>
									beta
								</Badge>
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

						<ThemeButton />
					</Flex>
				</Flex>
			</Box>
			<Divider />
		</>
	)
}
