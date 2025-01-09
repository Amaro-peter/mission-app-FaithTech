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
    justifyContent={"center"}
    >   
        <Button
        onClick={handleLogout}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
        mb={1}
        >
          <IoIosLogOut size={sizeOfIcon} />
          <Text fontSize={sizeOfText}>Sair</Text>
        </Button> 
    </Flex>
  )
}

export default LogOut;