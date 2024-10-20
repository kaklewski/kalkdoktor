import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { Box, Stack } from '@chakra-ui/react'

export default function RootLayout() {
	return (
		<>
			<Navbar />
			<Box maxW='650px' mx='auto' px={4} py={8}>
				<Stack spacing={8}>
					<Outlet />
				</Stack>
			</Box>
			<Footer />
		</>
	)
}
