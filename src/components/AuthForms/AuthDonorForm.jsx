import { Box, Flex, VStack, Text, Image, Container } from '@chakra-ui/react'
import React, { useState } from 'react'
import Login from './Login'
import SignUp from './SignUp'

function AuthDonorForm() {
  const [isLogin, setisLogin] = useState(true)
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
        <Container maxW={"container.md"} padding={0}>
            <VStack justifyContent={"center"} alignItems={"center"} gap={10}>
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
                <Box border={"1px solid black"}
                borderRadius={4}
                padding={5}
                >
                    <VStack spacing={4}>
                        {isLogin ? <Login /> : <SignUp />}
                    </VStack>

                    {/* OR text */ }
                    <Flex 
                    alignItems={"center"} 
                    justifyContent={"center"}
                    my={4}
                    gap={1}
                    w={"full"}
                    >
                        <Box flex={2} h={"1px"} bg={"black"} />
                        <Text mx={1} color={"black"}
                        fontFamily={"Inter, sans-serif"}
                        fontWeight={"bold"}
                        >
                            OR
                        </Text>
                        <Box flex={2} h={"1px"} bg={"black"} />
                    </Flex>
                    <Flex 
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={2}
                    my={1}
                    w={"full"}
                    >
                        <Image src={"./googleLogo.png"} h={"10"} alt={"Google"} cursor={"pointer"} />
                        <Text color={"blue.500"}
                        fontSize="12px"
                        fontFamily={"Inter, sans-serif"}
                        cursor={"pointer"}
                        >
                            Sign in with Google
                        </Text>
                    </Flex>
                </Box>
            </VStack>
        </Container>
    </Flex>
  )
}

export default AuthDonorForm