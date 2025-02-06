import { Button, Container, Divider, Flex, VStack, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import { useRef, useEffect } from 'react';
import HomePageFooter from '../../../components/HomePageFooter/HomePageFooter';
import FollowersHeader from './FollowersHeader';
import Follower from './Follower';
import useGetFollowers from '../../../hooks/useGetFollowers';

function Followers({username, errorMessage, setErrorMessage}) {

  const {getFollowers, followers, isLoading, hasMore} = useGetFollowers();

  const didFetchRef = useRef(false);

  useEffect(() => {
    if(!didFetchRef.current) {
      getFollowers();
      didFetchRef.current = true;
    }
  }, [getFollowers]);

  return (
    <Flex
    direction={"column"}
    flex={1}
    width={"100%"}
    minHeight={0}
    mt={4}
    >
      <Flex
      bg={"#FFEFE759"}
      flex="1"
      width="100%"
      direction="column"
      minHeight={0} // Prevents overflow within this container
      >
        <Container
        maxW="container.lg"
        flex="1"
        p={0}
        overflow="hidden" // Remove unnecessary scrollbars
        minH="0" // Key: Prevents overflow from flex children
        >
          <VStack gap={5} width="100%" align={"strecht"} >
            <Container
            maxW={"container.lg"}
            mt={10}
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
                gap={1}
              >
                  <FollowersHeader />

                  <VStack gap={3} width={"100%"} alignItems={"stretch"}>
                    {followers.map((user, index) => (
                      <Follower key={index} user={user}/>
                    ))}
                  </VStack>

                  {isLoading && (
                    <>
                      <VStack gap={3} width={"100%"} alignItems={"stretch"}>
                        <Flex alignItems={"center"} justifyContent={"space-between"} gap={4} w={"full"}>
                          <SkeletonCircle size="10" />
                          <Skeleton height="20px" width="full" />
                        </Flex>
                        <Flex alignItems={"center"} justifyContent={"space-between"} gap={4} w={"full"}>
                          <SkeletonCircle size="10" />
                          <Skeleton height="20px" width="full" />
                        </Flex>
                        <Flex alignItems={"center"} justifyContent={"space-between"} gap={4} w={"full"}>
                          <SkeletonCircle size="10" />
                          <Skeleton height="20px" width="full" />
                        </Flex>
                        <Flex alignItems={"center"} justifyContent={"space-between"} gap={4} w={"full"}>
                          <SkeletonCircle size="10" />
                          <Skeleton height="20px" width="full" />
                        </Flex>
                      </VStack>
                    </>
                  )}

                  {hasMore && (
                    <Button
                    mt={4}
                    onClick={getFollowers}
                    isLoading={isLoading}
                    colorScheme='orange'
                    >
                      Carregar mais
                    </Button>
                  )}
              </Flex>
            </Container>
          </VStack>
        </Container>
        <Divider w={"full"} h={"2px"} bg={"gray"} mt={10} />
          <HomePageFooter />
      </Flex>
    </Flex>
  );
}

export default Followers;