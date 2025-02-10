import { Box, Flex, Button, Text } from '@chakra-ui/react'
import { IoIosLogOut } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import useLogOutAdmin from '../../hooks/useLogOutAdmin';

function LogOut({ sizeOfIcon, sizeOfText }) {

  const { handleLogout } = useLogOutAdmin();

  const navigate = useNavigate();

  const handleLogoutAndNavigate = async () => {
    await handleLogout();
    navigate("/landingPage");
  };


  return (
    <Flex
    display={"flex"}
    alignItems={"center"}
    justifyContent={"center"}
    >   
        <Button
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
        mb={1}
        onClick={handleLogoutAndNavigate}
        >
          <IoIosLogOut size={sizeOfIcon} />
          <Text fontSize={sizeOfText}>Sair</Text>
        </Button> 
    </Flex>
  )
}

export default LogOut;