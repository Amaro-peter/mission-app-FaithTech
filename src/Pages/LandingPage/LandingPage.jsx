import { Box, Flex, Container, VStack, Image, Button } from '@chakra-ui/react'
import React from 'react'
import LandingPageButtons from './LandingPageButtons';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <Flex minHeight={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
        <Container maxW={"container.md"} padding={0}>
            <VStack justifyContent={"center"} alignItems={"center"} gap={0}>
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
                    
                    <VStack gap={5} justifyContent={"center"}>
                        <LandingPageButtons />

                        <Link to={"/authAdmin"}>
                            <Button
                            width={{ base: "120px" }}
                            height={{ base: "35px" }}
                            backgroundColor="#E0E0E0"
                            border="1px solid #CCC"
                            borderRadius="5px"
                            fontSize="16px"
                            fontWeight="bold"
                            color="#333"
                            _hover={{ backgroundColor: "#BDBDBD" }}
                            >
                                Administrador
                            </Button>
                        </Link>

                        <Box textAlign={"center"} fontWeight={"bold"} fontFamily={"Inter, sans-serif"}>Obtenha o app.</Box>
                        <Flex gap={5} justifyContent={"center"}>
                            <Image src="./google.png" h={"10"} alt={"Play Store"} />
                            <Image src="./apple.png" h={"10"} alt={"App Store"} />
                        </Flex>
                    </VStack>
                </VStack>    
            </VStack> 
        </Container>
    </Flex>
  )
}

export default LandingPage;