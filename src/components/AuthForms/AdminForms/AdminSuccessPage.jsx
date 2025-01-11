import { Box, Button, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import LogOutAdmin from '../../NavBarItems/LogOutAdmin';


function AdminMissionarySignUpSucess({authUser}) {
  const navigate = useNavigate();

  const handleSignUpMore = () => {
    navigate("/adminRegistrationPanel");
  };

  return (
    <Box textAlign="center" mt={10}>
      <Text fontSize="2xl" mb={4}>Missionário foi cadastrado com sucesso!</Text>
      <Button backgroundColor={"#FFAA85"} _hover={{background: "#FF6A00", color: "gray.200"}} onClick={handleSignUpMore} mr={4}>Sign Up More Users</Button>
      <LogOutAdmin />
    </Box>
  );
}

export default AdminMissionarySignUpSucess;