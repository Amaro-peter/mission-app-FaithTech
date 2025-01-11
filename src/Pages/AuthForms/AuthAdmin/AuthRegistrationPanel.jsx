import { Box, Flex, VStack, Text, Image, useToast, Container } from '@chakra-ui/react'
import React, { useState } from 'react'
import AdminRegistersMissionary from '../../../components/AuthForms/AdminForms/AdminMissionaryRegistrationForm'
import LogOutAdmin from '../../../components/NavBarItems/LogOutAdmin';

function AuthRegistrationPanel({errorMessage, setErrorMessage}) {

  const toast = useToast();
  const toastId = 'error-toast';

  if(errorMessage !== null) {
    if(!toast.isActive(toastId)) {
      toast({
        id: toastId,
        title: "Erro",
        description: "Usuário não encontrado",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top"
      })
      setErrorMessage(null);
    }
  }

  return (
    <Flex minHeight={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
      <Container maxW={"container.md"} padding={0}>
        <VStack justifyContent={"center"} alignItems={"center"} gap={4}>
          <Box
          width={["100%", "75%", "50%"]}
          height={"auto"}
          margin={"0 auto"}
          >
            <Image src="./Mission.png" 
            width={"100%"}
            height={"auto"}
            alt="Telefone img"
            />
          </Box>


          <VStack spacing={4} align={"stretch"}>

            <Box border={"1px solid black"}
            borderRadius={4}
            padding={5}
            >
                <Box 
                justifyContent={"center"} 
                alignItems={"center"} 
                gap={2} 
                my={2} 
                w={"full"}
                >
                  <Text textAlign={"center"} fontSize="2xl" fontWeight={"bold"} fontFamily={"Inter, sans-serif"}>
                    Painel de Registro
                  </Text>
                </Box>

              <VStack spacing={4}>
                <AdminRegistersMissionary />
              </VStack>
            </Box>
            <Box
            my={2}
            backgroundColor={"#FFFFF"}
            justifyContent={"center"}
            alignItems={"center"}
            padding={4}
            borderRadius={10}
            boxShadow={"0 4px 6px rgba(0, 0, 0, 0.1)"}
            >
              <LogOutAdmin />
            </Box>
            
          </VStack>
        </VStack>
      </Container>
    </Flex>
  )
}

export default AuthRegistrationPanel;