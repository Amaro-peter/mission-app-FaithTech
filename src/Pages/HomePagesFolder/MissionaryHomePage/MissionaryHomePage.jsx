import { Box, Container, Divider, Flex, Skeleton, SkeletonCircle, useToast, VStack } from '@chakra-ui/react';
import MissionaryHeader from '../../../components/MissionaryComponents/MissionaryHeader/MissionaryHeader';
import { useContext, useEffect } from 'react';
import NewPost from '../../../components/MissionaryComponents/Posts/NewPost/NewPost';
import Campaign from '../../../components/MissionaryComponents/Campaign/Campaign';
import MyWork from '../../../components/MissionaryComponents/MyWork/MyWork';
import HomePageFooter from '../../../components/HomePageFooter/HomePageFooter';
import ProfilePosts from '../../../components/MissionaryComponents/Posts/ProfilePosts/ProfilePosts';
import SelectPostType from '../../../components/MissionaryComponents/Posts/SelectPostType/SelectPostType';
import FeedPosts from '../../../components/MissionaryComponents/Posts/FeedPosts/FeedPosts';
import { useAuth } from '../../../context/AuthContext';
import useGetUserProfileByUsername from '../../../hooks/useGetUserProfileByUsername';
import MissionaryHeaderSkeleton from '../../../components/MissionaryComponents/Skeletons/MissionaryHeaderSkeleton';
import { UserProfileProvider } from '../../../context/UserProfileContext';
import { useTab } from '../../../context/TabContext';
import { PostDataContext } from '../../../context/PostDataContext';


function HomePage({unauthenticated, username, errorMessage, setErrorMessage}) {
  const toastId = 'error-toast';
  const {isLoading, userProfile} = useGetUserProfileByUsername(username);
  const {activeTab, setActiveTab, myPosts, setMyPosts, resetTabs, setInitialTab, shouldResetTabs, setShouldResetTabs} = useTab();
  const toast = useToast();
  const authUser = useAuth();
  const userNotFound = !isLoading && !userProfile;
  const { setPostsData } = useContext(PostDataContext);

  useEffect(() =>{
    setPostsData([]);
    localStorage.removeItem("hasVisitedMeuFeed");
    localStorage.removeItem("loadMoreData");
    localStorage.removeItem("hasMore");
    localStorage.removeItem("noPosts");
    localStorage.removeItem("lastDocId");
  }, []);

  useEffect(() => {
    if(shouldResetTabs) {
      setInitialTab('Projeto');
      resetTabs();
    }
    setShouldResetTabs(true);
  }, [shouldResetTabs]);

  if(userNotFound) {
    return <UserNotFound />;
  }

  const visitingOwnProfileAndAuth = authUser && authUser.uid === userProfile.uid;

  const handleSelectionPostTabClick = (tab) => {
    setMyPosts(tab);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  if(errorMessage !== null) {
    if(!toast.isActive(toastId)) {
      toast({
        id: toastId,
        title: "Erro",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top"
      });
    }
  }


  return (
    <>
      <UserProfileProvider userProfile={userProfile}>
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
                <Box flex={2} mt={10}>
                  {!isLoading && unauthenticated && <MissionaryHeader unauthenticated={unauthenticated}
                  activeTab={activeTab} handleTabClick={handleTabClick} />}
                  {!isLoading && userProfile && !unauthenticated && <MissionaryHeader activeTab={activeTab} handleTabClick={handleTabClick} />}
                  {isLoading && <MissionaryHeaderSkeleton />}
                </Box>
                { activeTab === 'Postagens' && visitingOwnProfileAndAuth ? (
                  <Box>
                    <SelectPostType myPosts={myPosts} handleSelectionPostTabClick={handleSelectionPostTabClick} />
                  </Box>
                ) : (null)
                }
                <Box>
                  {activeTab === 'Projeto' && unauthenticated && <MyWork unauthenticated={unauthenticated}/>}
                  {activeTab === 'Projeto' && !unauthenticated && <MyWork />}
                  {activeTab === 'Campanha' && <Campaign />}
                  {activeTab === 'Postagens' && visitingOwnProfileAndAuth && <NewPost />}
                </Box>
                {activeTab === 'Postagens' && visitingOwnProfileAndAuth ? (
                  <>
                  {myPosts === 'Meu feed' && 
                  
                    <Box>
                      <ProfilePosts userProfile={userProfile} />
                    </Box>
                  }
                  {myPosts === 'Feed de amigos' && 
                    <Box>
                      <FeedPosts />
                    </Box>
                  }

                  </>
                  
                ) : (
                  <>
                    {activeTab === 'Postagens' && <ProfilePosts />}
                  </>
                )}
              </VStack>
            </Container>
            <Divider w={"full"} h={"2px"} bg={"gray"} mt={10} />
              <HomePageFooter />
          </Flex>
        </Flex>
      </UserProfileProvider>
    </>
  );
}

export default HomePage;

const UserNotFound = () => {
  return (
    <Flex flexDir={"column"} textAlign={"center"} mx={"auto"}>
      <Text fontSize={"2x1"}>
        User Not Found
      </Text>
      <Link as={RouterLink} to={`${authUser.username}`} color={"blue.500"}>
        Go back to Home
      </Link>
    </Flex>
  );
}

