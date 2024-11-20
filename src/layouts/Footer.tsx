import { Box, Divider, Flex, Link, Text } from '@chakra-ui/react'
import { IconBrandGithubFilled } from '@tabler/icons-react'

export default function Footer() {
  const GITHUB_LINK = 'https://github.com/kaklewski/kalkdoktor'
  const currentYear = new Date().getFullYear()

  return (
    <Box as='footer' id='footer' maxW='650px' mx='auto'>
      <Divider />
      <Flex
        p={4}
        fontSize='xs'
        direction='column'
        justify='center'
        align='center'
        gap={1}>
        <Text>
          &copy; {currentYear} Oskar Kąklewski - Opublikowano na licencji GPL
          3.0
        </Text>
        <Link href={GITHUB_LINK}>
          <IconBrandGithubFilled size={16} stroke={1.5} />
        </Link>
      </Flex>
    </Box>
  )
}
