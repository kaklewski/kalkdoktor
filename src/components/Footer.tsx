import { Box, Divider, Flex, Link } from '@chakra-ui/react'

export default function Footer() {
	const currentYear = new Date().getFullYear()
	const link = 'https://github.com/kaklewski/kalkdoktor'

	return (
		<Box as='footer' maxW='650px' mx='auto' px={4}>
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
