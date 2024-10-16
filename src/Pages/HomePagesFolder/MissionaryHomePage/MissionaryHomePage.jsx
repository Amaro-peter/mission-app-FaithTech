import { Box, Container, Divider, Flex, Select, VStack } from '@chakra-ui/react';
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

function HomePage() {
  const {username} = useParams();
  const[activeTab, setActiveTab] = useState('Meu projeto')
  const[myPosts, setMyPosts] = useState('Meu feed')

  const handleSelectionPostTabClick = (tab) => {
    setMyPosts(tab);
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }


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
            <Box flex={2} mt={10}>
              <MissionaryHeader activeTab={activeTab} handleTabClick={handleTabClick} />
            </Box>
            { activeTab === 'Postagens' ? (
              <Box>
                <SelectPostType myPosts={myPosts} handleSelectionPostTabClick={handleSelectionPostTabClick} />
              </Box>
            ) : (null)
            }
            <Box>
              {activeTab === 'Meu projeto' && <MyWork />}
              {activeTab === 'Campanha' && <Campaign />}
              {activeTab === 'Postagens' && <NewPost />}
            </Box>
            {activeTab === 'Postagens' ? (
              <>
              {myPosts === 'Meu feed' && 
              
                <Box>
                  <ProfilePosts />
                </Box>
              }
              {myPosts === 'Feed de amigos' && 
                <Box>
                  <FeedPosts />
                </Box>
              }

              </>
              
            ) : (null)}
          </VStack>
        </Container>
        <Divider w={"full"} h={"2px"} bg={"gray"} mt={10} />
          <HomePageFooter />
      </Flex>
    </Flex>
  );
}

export default HomePage;

