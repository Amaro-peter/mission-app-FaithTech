import { Box, Flex, VStack, Text, Image, Container } from '@chakra-ui/react'
import React, { useState } from 'react'
import AdminRegistersMissionary from '../../../components/AuthForms/AdminForms/AdminMissionaryRegistrationForm'

function AuthRegistrationPanel() {
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
          </VStack>
        </VStack>
      </Container>
    </Flex>
  )
}

export default AuthRegistrationPanel;