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
        justifyContent="flex-start"
        height="100%"
        gap={{base: 4, sm: 7}}
      >
        <Avatar src='' alt="Missionary" size={{base: "md", md: "lg"}} />
        <Flex gap={4}>
          <Text fontSize="sm" fontWeight="bold"
          fontFamily={"Inter, sans-serif"}
          >
            @_SamiMendonça
          </Text>
          <Button
          border={"1px solid black"}
          borderRadius={50}
          backgroundColor={"#FFEFE7BF"}
          _hover={{background: "#FFB999"}}
          >
            Seguir
          </Button>
          <Button
          border={"1px solid black"}
          borderRadius={50}
          backgroundColor={"#FFEFE7BF"}
          _hover={{background: "#FFB999"}}
          >
            Doar
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default MissionaryHeader