import { Container, Flex, Skeleton, SkeletonCircle, Box, VStack } from "@chakra-ui/react";

function DonorHomePageSkeleton(isLoading) {
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
            boxShadow="md"
            direction={"column"}
            mx={"auto"}
            >
                <Flex
                gap={{base: 4, md: 8}}
                py={10}
                direction={{base: "column", sm: "row"}}
                justifyContent={"center"}
                alignItems={"center"}
                >
                    <SkeletonCircle size={"24"} />
                    <VStack 
                    alignItems={{base: "center", sm: "flex-start"}}
                    gap={2}
                    mx={"auto"}
                    flex={1}
                    >
                    <Skeleton height="12px" width="150px" />
                    <Skeleton height="12px" width="100px" />
                    </VStack> 
                </Flex>
            </Flex>

            <Flex
            width={{base: "100%", md: "80%"}}
            mt={4}
            bg="white"
            color="black"
            border="1px solid gray.500"
            borderRadius={10}
            p={4}
            boxShadow="md"
            direction={"column"}
            mx={"auto"}
            >
                {isLoading && 
                [0, 1, 2].map((_, idx) => (
                    <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
                    <Flex gap="2">
                        <SkeletonCircle size='10' />
                        <VStack gap={2} alignItems={"flex-start"} >
                        <Skeleton height='10px' w={"200px"} />
                        <Skeleton height='10px' w={"100px"} />
                        </VStack>
                    </Flex>
                    <Skeleton w={"full"}>
                        <Box h={"400px"}></Box>
                    </Skeleton>
                    </VStack>
                ))}
            </Flex>
        </Container>
    );
}

export default DonorHomePageSkeleton;