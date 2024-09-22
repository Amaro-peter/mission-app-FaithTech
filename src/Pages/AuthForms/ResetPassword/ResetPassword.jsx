import { Box, Flex, VStack, Text, Image, Container, Input, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function ResetPassword() {
    const [isLogin, setIsLogin] = useState(true)
    const[inputs, setInputs] = useState({
        email: "",
    })

    return (
        <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
            <Container maxW={"container.md"} padding={0}>
                <VStack justifyContent={"center"} alignItems={"center"}>
                    <Box
                        width={["100%", "75%", "50%"]}
                        height={"auto"}
                        margin={"0 auto"}
                        >
                        <Image src="./Mission.png" 
                        width={"100%"}
                        height={"auto"}
                        alt="Mission img"
                        my={35}
                        />
                    </Box>
                    <VStack align={"stretch"}>
                        <Box border={"1px solid black"}
                        borderRadius={4}
                        padding={5}
                        marginBottom={10}
                        >
                            <Box justifyContent={"center"} alignItems={"center"} gap={2} my={2} w={"full"}>
                                <Text textAlign={"center"} fontSize="2xl" fontWeight={"bold"} fontFamily={"Inter, sans-serif"}>
                                    Reset your password
                                </Text>
                            </Box>

                            <Box
                            alignItems={"center"}
                            justifyContent={"center"} 
                            gap={2} 
                            my={1} 
                            w="300px"
                            h={"auto"}
                            display="flex" 
                            flexDirection="column"
                            >
                                <Text justifyContent={"center"} textAlign={"center"} fontSize="17px" fontFamily={"Inter, sans-serif"}>
                                    Insert your email address below and we will send a link to your email.
                                </Text>
                            </Box>

                            <VStack spacing={4} >
                                <Input
                                placeholder='Email'
                                sx={{
                                    '::placeholder': {
                                    color: 'rgba(0, 0, 0, 0.5)', // Gray blended with black
                                    },
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Softer shadow
                                }}
                                border={"1px solid #b0b0b0"}
                                width="100%" // Responsive width
                                height= '40px' // Fixed height
                                borderRadius= '4px' // Rounded corners
                                _hover={{border: "1px solid black"}}
                                _focus={{border: "1px solid black", outline: "none"}}
                                fontSize={20}
                                type='email'
                                value={inputs.email}
                                size={"sm"}
                                color={"black"}
                                onChange={(e) => setInputs({...inputs, email: e.target.value})}
                                />

                                <Button
                                w={"full"}
                                background={"#FFA888"}
                                color={"black"}
                                size={"sm"}
                                fontSize={"17"}
                                fontFamily={"Inter, sans-serif"}
                                _hover={{ background: "#FF8866" }}
                                >
                                    Send Link to Login
                                </Button>
                            </VStack>
                        </Box>
                        
                        <Link to={"/donorSignPage"}>
                            <Button 
                            w={"full"}
                            background={"#FFA888"}
                            color={"black"}
                            size={"sm"}
                            fontSize={"14"}
                            fontFamily={"Inter, sans-serif"}
                            _hover={{ background: "#FF8866" }}
                            border={"2px solid black"}
                            borderRadius={4}
                            padding={5}
                            >
                                
                                    <Text
                                    color={"black"}
                                    fontSize="20px"
                                    fontFamily={"Inter, sans-serif"}
                                    cursor={"pointer"}
                                    >
                                        Voltar para o login
                                    </Text>      
                            </Button>
                        </Link>
                    </VStack>
                </VStack>
            </Container>
        </Flex>
    )  
}

export default ResetPassword