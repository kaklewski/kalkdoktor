import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { Container, Stack } from '@chakra-ui/react'
import { useEffect } from 'react'

export default function RootLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

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
