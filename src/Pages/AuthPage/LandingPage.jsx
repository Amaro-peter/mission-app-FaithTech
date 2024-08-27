import { Box, Flex, Container, VStack, Image } from '@chakra-ui/react'
import React from 'react'
import LandingPageButtons from './LandingPageButtons';

function LandingPage() {
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
                <VStack spacing={4} align={"stretch"}>
                    
                    <VStack gap={5} justifyContent={"center"}>
                        <LandingPageButtons />

                        <Box textAlign={"center"} fontWeight={"bold"} fontFamily={"Inter, sans-serif"}>Get the app.</Box>
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