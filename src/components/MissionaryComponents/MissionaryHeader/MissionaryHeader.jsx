import { Box, Button, Flex, VStack, Text, Spacer, Image, Avatar, AvatarGroup } from '@chakra-ui/react'
import React from 'react'

function MissionaryHeader() {
  return (
    <Flex
      width={{ base: "100%", sm: "480px", md: "540px", lg: "600px", xl: "600px" }}
      height="80px"
      bg="white"
      color="black"
      border="1px solid gray.500"
      borderRadius={10}
      p={4}
      boxShadow="md"
      direction={"column"}
      mx={"auto"}
    >
      <Flex 
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
        gap={{base: 4, sm: 7}}
      >
        <Avatar src='' alt="Missionary" size={{base: "md", md: "lg"}} />
        <Flex gap={4}>
          <Button
          width={"100px"}
          height={"35px"}
          border={"1px solid black"}
          borderRadius={50}
          backgroundColor={"#FFEFE7"}
          _hover={{background: "#FFB999"}}
          >
            Seguir
          </Button>
          <Button
          width={"100px"}
          height={"35px"}
          border={"1px solid black"}
          borderRadius={50}
          backgroundColor={"#FFEFE7"}
          _hover={{background: "#FFB999"}}
          >
            Doar
          </Button>

          <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          _hover={{ background: "gray.400", borderRadius: "50%" }}
          width="50px"
          height="50px"
          >
            <Image 
            src='./pencil_editor.png' 
            alt="Missionary" 
            width="30px" 
            height="30px" 
            cursor={"pointer"} 
            />
          </Box>
        </Flex>
      </Flex>
      
    </Flex>
  )
}

export default MissionaryHeader