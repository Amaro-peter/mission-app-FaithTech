import { AspectRatio, Container, Flex, SkeletonText, Skeleton } from "@chakra-ui/react";
import React from "react";

function MyWorkSkeleton () {
    return (
        <Flex
        width={{base: "100%", md: "80%"}}
        bg="white"
        color="black"
        border="1px solid gray.500"
        borderRadius={10}
        p={4}
        boxShadow="md"
        direction={"column"}
        mx={"auto"}
        gap={1}
        >
            <Flex 
            direction="row"
            alignItems="center"
            width={"full"}
            justifyContent={"space-between"}
            height="100%"
            gap={{base: 4, sm: 7}}
            >
                <SkeletonText noOfLines={1} width={"150px"} height={"40px"} />
            </Flex>
            <Flex
            direction={"column"}
            gap={1}
            >
                <SkeletonText noOfLines={1} width={"150px"} height={"25px"} />
                <SkeletonText noOfLines={5} spacing={4} />
            </Flex>

            <Flex
            mt={4}
            direction={"column"}
            gap={2}
            >
                <Skeleton height={"200px"} width={"full"}/>
                <AspectRatio ratio={16 / 9} width={"full"}>
                    <Skeleton />
                </AspectRatio>
            </Flex>

            <Flex
            mt={4}
            gap={4}
            width={"full"}
            justifyContent={"center"}
            alignItems={"center"}
            >
                <Skeleton height={"40px"} width={"150px"} />
                <Skeleton height={"40px"} width={"150px"} />
            </Flex>
        </Flex>
    );
}

export default MyWorkSkeleton;