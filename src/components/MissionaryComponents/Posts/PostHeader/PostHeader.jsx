import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import useAuthStore from '../../../../store/authStore';
import useUserProfileStore from '../../../../store/useProfileStore';

function PostHeader() {
  const[isFollowing, setIsFollowing] = useState(false);
  const authUser = useAuth();

  const{userProfile} = useUserProfileStore();

  const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;

  return (
    <Flex
    justifyContent={"space-between"}
    alignItems={"center"}
    w={"full"}
    >
        <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={1}
        >
            <Avatar src='' alt="user profile pic" size={"md"} />

            <Flex
            direction={"column"}
            gap={1}
            >
                <Text
                fontFamily={"Inter, sans-serif"}
                fontWeight={"bold"}
                fontSize={"auto"}
                >
                    Samuel Mendonça
                </Text>

                <Text
                fontFamily={"Inter, sans-serif"}
                fontWeight={"bold"}
                fontSize={"auto"}
                >
                    (missionário)
                </Text>
            </Flex>
        </Flex>
        {visitingAnotherProfileAndAuth ? (
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
        ) : null}
    </Flex>
  )
}

export default PostHeader
