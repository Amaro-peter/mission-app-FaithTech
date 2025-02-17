import { Box, Flex, Button, Text } from '@chakra-ui/react'
import { IoIosLogOut } from 'react-icons/io'
import { useLocation, useNavigate } from 'react-router-dom'
import useLogout from '../../hooks/useLogOut'
import { useContext } from 'react';
import { PostDataContext } from '../../context/PostDataContext';

function LogOut({ sizeOfIcon, sizeOfText }) {

  const { handleLogout } = useLogout();

  const {setPostsData} = useContext(PostDataContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoutAndNavigate = async () => {
    await handleLogout(setPostsData);
    navigate("/landingPage");
  };

  const isEditPage = location.pathname.includes('/EditHeader') || location.pathname.includes('/EditProject');

  if(isEditPage) {
    return null;
  }

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
        mt={1}
        >
          <IoIosLogOut size={sizeOfIcon} />
          <Text fontSize={sizeOfText}>Sair</Text>
        </Button> 
    </Flex>
  )
}

export default LogOut;