import { Box, Container, Divider, Flex, Select, useToast, VStack } from '@chakra-ui/react';
import DonorHeader from '../../../components/DonorComponents/DonorHeader/DonorHeader';
import { useState } from 'react';
import Projects from '../../../components/DonorComponents/Projects/Projects.jsx';
import DonorFeedPosts from '../../../components/DonorComponents/DonorFeedPosts/DonorFeedPosts';
import HomePageFooter from '../../../components/HomePageFooter/HomePageFooter';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import useAuthStore from '../../../store/authStore.js';
import useGetUserProfileByUsername from '../../../hooks/useGetUserProfileByUsername';
import DonorHomePageSkeleton from '../../../components/DonorComponents/DonorSkeletons/DonorHomePageSkeleton.jsx';
import { UserProfileProvider } from '../../../context/UserProfileContext.jsx';

function DonorHomePage({username, errorMessage, setErrorMessage}) {
  const[activeTab, setActiveTab] = useState('Feed');
  const toast = useToast();
  const toastId = 'error-toast';
  const authUser = useAuth();
  const {isLoading, userProfile} = useGetUserProfileByUsername(username);
  

  if(isLoading || !userProfile) {
    return (
      <DonorHomePageSkeleton isLoading={isLoading} />
    );
  }

  const handleSelectionPostTabClick = (tab) => {
    setMyPosts(tab);
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  if(errorMessage !== null) {
    if(!toast.isActive(toastId)) {
      toast({
        id: toastId,
        title: "Erro",
        description: "Usuário não encontrado",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top"
      })
      setErrorMessage(null);
    }
  }


  return (
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
                <DonorHeader activeTab={activeTab} userProfile={userProfile} handleTabClick={handleTabClick} />
              </Box>
              <Box>
                {activeTab === 'Feed' && <DonorFeedPosts />}
                {activeTab === 'Explore novos projetos' && <Projects />}
              </Box>
            </VStack>
          </Container>
          <Divider w={"full"} h={"2px"} bg={"gray"} mt={10} />
            <HomePageFooter />
        </Flex>
      </Flex>
    </UserProfileProvider>
  );
}

export default DonorHomePage;