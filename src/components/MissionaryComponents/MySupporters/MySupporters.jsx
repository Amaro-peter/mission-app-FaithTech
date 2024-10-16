import { Avatar, Container, Flex, Text } from '@chakra-ui/react'
import React from 'react'

function MySupporters() {
  return (
    <Container
    maxW={"container.lg"}
    >
        <Flex
        width={{base: "100%", md: "80%"}}
        
        bg="white"
        color="black"
        border="1px solid gray.500"
        borderRadius={10}
        p={4}
        gap={3}
        boxShadow="md"
        direction={"row"}
        mx={"auto"}
        >
            <Avatar src='' alt="Missionary" size={{base: "md", md: "lg"}} />
            <Flex
            mt={3}
            >
                <Text
                fontFamily={"Inter, sans-serif"}
                fontWeight={"bold"}
                fontSize={["20px", "25px", "30px"]}
                whiteSpace="normal" // Allow text to wrap
                textAlign="justify" // Justify text
                >
                    Samuel Mendonça
                </Text>
            </Flex>
        </Flex>
    </Container>
  )
}

export default MySupporters
