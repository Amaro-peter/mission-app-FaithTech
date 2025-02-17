import { Avatar, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { useUserProfile } from '../../../../context/UserProfileContext';

function PostHeader() {
  const userProfile = useUserProfile();

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
            <Avatar src={userProfile.profilePicture} alt="user profile pic" size={"md"} />

            <Flex
            direction={"column"}
            gap={1}
            >
                <Text
                fontFamily={"Inter, sans-serif"}
                fontWeight={"bold"}
                fontSize={"auto"}
                >
                    {userProfile.fullName}
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
    </Flex>
  )
}

export default PostHeader
