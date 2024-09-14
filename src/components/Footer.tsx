import { Box, Divider, Flex, Link } from '@chakra-ui/react'

const currentYear = new Date().getFullYear()
const link = 'https://github.com/kaklewski/kalkdoktor'

export default function Footer() {
	return (
		<Box as='footer' id='footer' maxW='650px' mx='auto'>
			<Divider />
			<Flex
				p={4}
				fontSize='xs'
				direction='column'
				justify='center'
				align='center'>
				<p>
					&copy; {currentYear}{' '}
					<Link href={link}>Oskar Kąklewski</Link> – Opublikowano na
					licencji GNU
				</p>
			</Flex>
		</Box>
	)
}
