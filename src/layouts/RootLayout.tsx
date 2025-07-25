import { Container, Stack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Footer from './Footer';
import Navbar from './Navbar';

export default function RootLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Navbar />
      <Container my={8} maxW="container.sm">
        <Stack spacing={8}>
          <Outlet />
          <Footer />
        </Stack>
      </Container>
    </>
  );
}
