import { Avatar, Box, Center, Container, Divider, Flex, FormControl, Heading, Skeleton, SkeletonCircle, Stack, useToast, VStack } from '@chakra-ui/react';
import MissionaryHeader from '../../../components/MissionaryComponents/MissionaryHeader/MissionaryHeader';
import { useState } from 'react';
import NewPost from '../../../components/MissionaryComponents/Posts/NewPost/NewPost';
import Campaign from '../../../components/MissionaryComponents/Campaign/Campaign';
import MyWork from '../../../components/MissionaryComponents/MyWork/MyWork';
import HomePageFooter from '../../../components/HomePageFooter/HomePageFooter';
import ProfilePosts from '../../../components/MissionaryComponents/Posts/ProfilePosts/ProfilePosts';
import SelectPostType from '../../../components/MissionaryComponents/Posts/SelectPostType/SelectPostType';
import FeedPosts from '../../../components/MissionaryComponents/Posts/FeedPosts/FeedPosts';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import useGetUserProfileByUsername from '../../../hooks/useGetUserProfileByUsername';
import MissionaryHeaderSkeleton from '../../../components/MissionaryComponents/Skeletons/MissionaryHeaderSkeleton';
import useAuthStore from '../../../store/authStore';

function EditHeader({username, errorMessage, setErrorMessage}) {

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
            >
              <Stack
              spacing={4}
              w={"full"}
              p={6}
              my={0}
              >
                <Heading 
                lineHeight={1.1}
                fontSize={{base: "2xl", sm: "3xl", lg: "4xl"}}  
                >
                  Editar Cabeçalho
                </Heading>

                <FormControl>
                  <Stack direction={["column", "row"]} spacing={6}>
                    <Center>
                      <Avatar size="lg" src={""} />
                    </Center>
                  </Stack>
                </FormControl>

              </Stack>
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

export default EditHeader;