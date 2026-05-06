import { Box, Container } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useRegisterSW } from 'virtual:pwa-register/react';

import UpdateAlert from '../components/other/UpdateAlert';
import Footer from './Footer';
import Navbar from './Navbar';

const RootLayout = () => {
    const { pathname } = useLocation();

    const {
        needRefresh: [needRefresh],
        updateServiceWorker,
    } = useRegisterSW();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <Box minH="100vh" display="flex" flexDirection="column">
            <Navbar />
            <Container as="main" my={12} maxW="container.sm" flex="1">
                {needRefresh && (
                    <UpdateAlert onRefresh={() => updateServiceWorker(true)} />
                )}
                <Outlet />
                <Footer />
            </Container>
        </Box>
    );
};

export default RootLayout;
