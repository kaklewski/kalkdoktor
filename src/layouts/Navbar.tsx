import {
  Box,
  Flex,
  Divider,
  IconButton,
  Link,
  Button,
  Text,
  Badge,
  Tooltip,
} from '@chakra-ui/react'
import { IconHeart, IconMedicalCross } from '@tabler/icons-react'
import SearchBox from '../components/SearchBox/SearchBox'
import ThemeButton from '../components/ThemeButton'

export default function Navbar() {
  return (
    <>
      <Box p={4}>
        <Flex align='center' justify='space-between' gap={6} wrap='wrap'>
          <Flex align='start'>
            <Link href='/' id='navLogo' borderRadius='md' _hover={{ textDecoration: 'none' }}>
              <Flex align='center'>
                <IconMedicalCross />
                <Text>kalkdoktor</Text>
              </Flex>
            </Link>
            <Badge colorScheme='teal' variant='outline' fontSize='0.6em' ml={1} mt={2}>
              beta
            </Badge>
          </Flex>

          <Flex align='center' gap={3} wrap='wrap'>
            <SearchBox />

            <Box display={{ base: 'none', md: 'initial' }}>
              <Button
                as='a'
                href='/ulubione'
                leftIcon={<IconHeart stroke={1.5} />}
                aria-label='Ulubione'>
                Ulubione
              </Button>
            </Box>
            <Box display={{ base: 'initial', md: 'none' }}>
              <Tooltip label='Zobacz ulubione kalkulatory'>
                <Link href='/ulubione'>
                  <IconButton aria-label='Ulubione'>
                    <IconHeart stroke={1.5} />
                  </IconButton>
                </Link>
              </Tooltip>
            </Box>

            <ThemeButton />
          </Flex>
        </Flex>
      </Box>
      <Divider />
    </>
  )
}
