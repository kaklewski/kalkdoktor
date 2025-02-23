import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { Container, Stack } from '@chakra-ui/react'

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <Container my={8} maxW='container.sm'>
        <Stack spacing={8}>
          <Outlet />
          <Footer />
        </Stack>
      </Container>
    </>
  )
}
