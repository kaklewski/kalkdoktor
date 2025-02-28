import { Box, Flex, IconButton, Link, Button, Text, Badge, Tooltip } from '@chakra-ui/react'
import { IconHeart, IconMedicalCross } from '@tabler/icons-react'
import ThemeButton from '../components/Buttons/ThemeButton'
import SearchBox from '../components/Modals/SearchBox/SearchBox'

export default function Navbar() {
  return (
    <Box p={4} borderBottomWidth='1px'>
      <Flex align='center' justify='space-between' gap={4} wrap='wrap'>
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

        <Flex align='center' gap={{ base: 3, md: 2 }} wrap='wrap'>
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
  )
}
