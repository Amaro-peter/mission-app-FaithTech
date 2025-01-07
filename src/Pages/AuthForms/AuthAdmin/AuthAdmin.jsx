import { Box, Flex, VStack, Text, Image, Container } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminLogin from '../../../components/AuthForms/AdminForms/AdminLogin'

function AuthAdmin() {
  const [isLogin, setIsLogin] = useState(true)
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
                                Login administrador
                            </Text>
                        </Box>
                        

                        <VStack spacing={4}>
                            <AdminLogin />
                        </VStack>

                        {isLogin ? (
                            <Flex justifyContent={"center"} alignItems={"center"} gap={2} marginTop={7} w={"full"}>
                                <Link to={"/resetForm"}>
                                    <Text color={"orange.700"} fontSize="20px" fontFamily={"Inter, sans-serif"} cursor={"pointer"}>
                                        Esqueceu a senha?
                                    </Text>
                                </Link>
                            </Flex>
                        ) :(null)}
                    </Box>

                    <Box border={"1px solid black"} borderRadius={4} padding={1}>
                        <VStack alignItems={"center"} justifyContent={"center"}>
                            <Text color={"black"} fontSize="20px" fontFamily={"Inter, sans-serif"} cursor={"pointer"}>
                                Usuário Comum?
                            </Text>
                            <Box mx={2}>
                                <Link to={"/landingPage"}>
                                    <Text color={"orange.600"} fontSize="20px" fontFamily={"Inter, sans-serif"} cursor={"pointer"}>
                                        Página inicial
                                    </Text>
                                </Link>
                            </Box>
                        </VStack>
                    </Box>
                </VStack>
            </VStack>
        </Container>
    </Flex>
  )
}

export default AuthAdmin;