import { Container, Flex, Box, VStack, Skeleton, SkeletonText } from '@chakra-ui/react';
import React from 'react';

function SelectPostTypeSkeleton() {
  return (
    <Container maxW={"container.lg"}>
      <Flex
        width={{ base: "100%", md: "80%" }}
        bg="white"
        color="black"
        border="1px solid gray.500"
        borderRadius={10}
        p={4}
        gap={3}
        boxShadow="md"
        direction={"column"}
        mx={"auto"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Flex
          direction={"row"}
          width={"full"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={2}
        >
          {["Meu feed", "Feed de amigos"].map((_, index) => (
            <VStack align={"stretch"} key={index}>
              <Skeleton height="40px" width="100%" borderRadius="md" />
              <Box height={"2px"} bg={"transparent"} width="100%" mt={1} />
            </VStack>
          ))}
        </Flex>
      </Flex>
    </Container>
  );
}

export default SelectPostTypeSkeleton;