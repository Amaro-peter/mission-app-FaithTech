import { Box, Flex, Button, Text } from '@chakra-ui/react'
import { IoIosLogOut } from 'react-icons/io'
import { Link } from 'react-router-dom'
import useLogout from '../../hooks/useLogOut'

function LogOut({ sizeOfIcon, sizeOfText }) {

  const { handleLogout } = useLogout()


  return (
    <Flex
    display={"flex"}
    alignItems={"center"}
    flexDirection={"column"}
    borderRadius={4}
    p={2}
    w={{base: 10, md: "80%"}}
    justifyContent={"center"}
    >   
        <Button
        onClick={handleLogout}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        
        >
          <IoIosLogOut size={sizeOfIcon} />
          <Text fontSize={sizeOfText}>Sair</Text>
        </Button>
    </Flex> 
  )
}

export default LogOut