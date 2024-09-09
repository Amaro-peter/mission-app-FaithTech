import { Box, Link, VStack, Text, Avatar } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { IoHomeOutline } from 'react-icons/io5'

function Home({ sizeOfIcon, sizeOfText }) {
  return (
    <Link
    display={"flex"}
    to={"/"}
    as={RouterLink}
    alignItems={"center"}
    flexDirection={"column"}
    _hover={{bg: "gray.100"}}
    borderRadius={4}
    p={2}
    w={{base: 10, md: "full"}}
    justifyContent={"center"}
    >
        <Avatar size="xs" />
        <Text fontSize={sizeOfText} color={"black"}>Perfil</Text>
    </Link> 
  )
}

export default Home