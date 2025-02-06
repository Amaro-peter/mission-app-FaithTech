import { Flex, VStack, Heading, Text, SkeletonText } from "@chakra-ui/react";
import useGetNumberOfFollowers from "../../../hooks/useGetNumberOfFollowers";

export default function FollowersHeader() {

    const {isLoading, followerCount} = useGetNumberOfFollowers();

    if(isLoading) {
        return(
            <>
                <VStack 
                justifyContent={"space-between"}
                width={"full"}>
                    <Flex
                    alignItems={"center"}
                    gap={2}
                    >
                        <SkeletonText width={"full"} height={"10px"} noOfLines={1} endColor={"gray.500"} startColor={"gray.200"}/>
                    </Flex>
                    <Flex>
                        <SkeletonText width={"full"} height={"100px"} noOfLines={1} endColor={"gray.500"} startColor={"gray.200"}/>
                    </Flex>
                </VStack>
            </>
        );
    }

    return (
        <VStack 
        justifyContent={"space-between"}
        width={"full"}>
            <Flex
            alignItems={"center"}
            gap={2}
            >
                <Heading size={"lg"}>Seus seguidores</Heading>
            </Flex>
            <Flex>
                <Text color={"black.500"} size={"auto"}>Número de seguidores: {followerCount}</Text>
            </Flex>
        </VStack>
    );
}