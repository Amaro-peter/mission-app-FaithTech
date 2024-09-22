import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'

function PostHeader() {
  const[isFollowing, setIsFollowing] = useState(false)
  return (
    <Flex
    justifyContent={"space-between"}
    alignItems={"center"}
    w={"full"}
    >
        <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={2}
        >
            <Avatar src='' alt="user profile pic" size={"sm"} />

            <Flex
            fontSize={12}
            fontWeight={"bold"}
            gap={2}
            >
                <Text
                fontFamily={"Inter, sans-serif"}
                fontWeight={"bold"}
                fontSize={"md"}
                >
                    Samuel Mendonça
                </Text>

                <Box color={"gray.500"}>
                    • 5h
                </Box>
            </Flex>
        </Flex>
        <Box
        cursor={"pointer"}
        >
            <Button
            size={"xs"}
            bg={"transparent"}
            fontSize={"16"}
            color={"orange.500"}
            fontWeight={"bold"}
            _hover={{color: "orange.700"}}
            transition={"0.2s in ease-in-out"}
            onClick={() => setIsFollowing(!isFollowing)}
            >
                {isFollowing ? "Seguindo" : "Seguir"}
            </Button>
        </Box>
    </Flex>
  )
}

export default PostHeader
