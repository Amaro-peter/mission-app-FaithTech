import { Box, Flex, VStack, Text, Image, Container } from '@chakra-ui/react'
import React, { useState } from 'react'
import Login from '../../../components/AuthForms/MissionaryForms/MissionaryLogin'
import SignUp from '../../../components/AuthForms/MissionaryForms/MissionarySignUp'
import { Link } from 'react-router-dom'
import DonorSignUp from '../../../components/AuthForms/DonorForms/DonorSignUp'

function AuthDonorForm() {
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
                        {isLogin ? (null) : (
                            <Box 
                            justifyContent={"center"} 
                            alignItems={"center"} 
                            gap={2} 
                            my={2} 
                            w={"full"}
                            >
                                <Text textAlign={"center"} fontSize="2xl" fontWeight={"bold"} fontFamily={"Inter, sans-serif"}>
                                    Cadastro de apoiador
                                </Text>
                            </Box>
                        )}

                        <VStack spacing={4}>
                            {isLogin ? <Login /> : <DonorSignUp />}
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

                    <Box border={"1px solid black"} borderRadius={4} padding={5}>
                        <Flex alignItems={"center"} justifyContent={"center"}>
                            <Box mx={2} fontFamily={"Inter, sans-serif"} fontSize={20}>
                                {isLogin ? 
                                "Não tem conta?" : "Já tem uma conta?"}
                            </Box>
                            <Box onClick={() => setIsLogin(!isLogin)} fontSize={20} fontFamily={"Inter, sans-serif"} color={"orange.600"} cursor={"pointer"}>
                                {isLogin ? "Cadastre-se" : "Log in"}
                            </Box>
                        </Flex>
                        
                    </Box>

                    <Box border={"1px solid black"} borderRadius={4} padding={1}>
                        <VStack alignItems={"center"} justifyContent={"center"}>
                            <Text color={"black"} fontSize="20px" fontFamily={"Inter, sans-serif"} cursor={"pointer"}>
                                Missionário ou projeto social?
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

export default AuthDonorForm