import { Box, Button, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


function MissionarySignUpSucess() {
  const navigate = useNavigate();

  const handleSignUpMore = () => {
    navigate("/landingPage");
  };

  return (
    <Box textAlign="center" mt={10}>
      <Text fontSize="2xl" mb={4}>Pedido para entrar no Mission App feita com sucesso!</Text>
      <Text fontSize="2xl" mb={4}>A administração vai entrar em contato pelo telefone e email cadastrado!</Text>
      <Text fontSize="2xl" mb={4}>Portanto, fique atento.</Text>
      <Text fontSize="2xl" mb={4}>Até breve!</Text>
      <Button backgroundColor={"#FFAA85"} _hover={{background: "#FF6A00", color: "gray.200"}} onClick={handleSignUpMore} mr={4}>Voltar a tela inicial</Button>
    </Box>
  );
}

export default MissionarySignUpSucess;