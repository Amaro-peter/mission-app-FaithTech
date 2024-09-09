import { Box, Text } from '@chakra-ui/react'
import { IoIosLogOut } from 'react-icons/io'

function LogOut({ sizeOfIcon, sizeOfText }) {
  return (
    <Box
    display={"flex"}
    alignItems={"center"}
    flexDirection={"column"}
    _hover={{bg: "gray.100"}}
    borderRadius={4}
    p={2}
    w={{base: 10, md: "full"}}
    justifyContent={"center"}
    >
        <IoIosLogOut size={sizeOfIcon} />
        <Text fontSize={sizeOfText} color={"black"}>Sair</Text>
    </Box> 
  )
}

export default LogOut