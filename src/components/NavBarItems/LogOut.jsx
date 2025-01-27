import { Box, Flex, Button, Text } from '@chakra-ui/react'
import { IoIosLogOut } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import useLogout from '../../hooks/useLogOut'

function LogOut({ sizeOfIcon, sizeOfText }) {

  const { handleLogout } = useLogout();

  const navigate = useNavigate();

  const handleLogoutAndNavigate = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <Flex
    display={"flex"}
    alignItems={"center"}
    justifyContent={"center"}
    >   
        <Button
        onClick={handleLogoutAndNavigate}
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