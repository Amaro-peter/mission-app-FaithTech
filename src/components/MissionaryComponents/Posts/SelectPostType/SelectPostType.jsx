import { Container, Flex, Box, Text, VStack, Button } from '@chakra-ui/react'
import React from 'react'
import { useTab } from '../../../../context/TabContext'

function SelectPostType() {

  const { myPosts, setMyPosts } = useTab();

  const handleSelectionPostTabClick = (tab) => {
    setMyPosts(tab);
  }

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
        alignItems={"center"}
        gap={2}
        >
          {["Meu feed", "Feed de amigos"].map((tab) =>(
            <VStack
            align={"stretch"}
            >
              <Button 
              key={tab} 
              onClick={() => handleSelectionPostTabClick(tab)} 
              cursor="pointer" 
              background={"transparent"}
              >
                <Text 
                fontSize={"md"}
                fontWeight={myPosts === tab ? "bold" : "normal"}
                >
                  {tab}
                </Text>
              </Button>
              {myPosts === tab && (
                <Box 
                height={"2px"} 
                bg={"#E89871"} 
                width="100%" 
                mt={1} 
                /> 
              )}
            </VStack>
          ))}
        </Flex>
      </Flex>
    </Container>
  )
}

export default SelectPostType