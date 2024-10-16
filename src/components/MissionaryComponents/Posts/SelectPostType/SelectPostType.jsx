import { Container, Flex, Box, Text } from '@chakra-ui/react'
import React from 'react'

function SelectPostType({myPosts, handleSelectionPostTabClick}) {
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
      direction={"column"}
      mx={"auto"}
      justifyContent={"space-between"}
      alignItems={"center"}
      >
        <Flex
        direction={"row"}
        width={"full"}
        justifyContent={"space-between"}
        gap={2}
        >
          {["Meu feed", "Feed de amigos"].map((tab) =>(
            <Box key={tab} onClick={() => handleSelectionPostTabClick(tab)} cursor="pointer">
              <Text 
              fontSize={"md"}
              fontWeight={myPosts === tab ? "bold" : "normal"}
              >
                {tab}
              </Text>
              {myPosts === tab && (
                <Box height={"2px"} bg={"#E89871"} mt={1} />
              )}
            </Box>
          ))}
        </Flex>
      </Flex>
    </Container>
  )
}

export default SelectPostType
