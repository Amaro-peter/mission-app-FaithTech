import { Flex, Text, Container } from '@chakra-ui/react';
import React from 'react';

function NoPostsFound() {
  return (
    <Container
    maxW={"container.lg"}
    >
        <Flex
        width={{ base: "100%", md: "80%" }}
        bg="white"
        color="black"
        border="1px solid gray.500"
        borderRadius={10}
        p={4}
        gap={1}
        boxShadow="md"
        direction={"column"}
        mx={"auto"}
        mb={4}
        >
            <Flex flexDir={"column"} textAlign={"center"} mx={"auto"}>
                <Text fontSize={"2xl"} fontWeight={"bold"}>
                    Nenhum postagem encontrada
                </Text>
            </Flex>
        </Flex>
    </Container>
  );
}

export default NoPostsFound;