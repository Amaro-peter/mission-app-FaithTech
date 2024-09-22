import { Box, Container, Divider, Flex, VStack } from '@chakra-ui/react';
import MissionaryHeader from '../../../components/MissionaryComponents/MissionaryHeader/MissionaryHeader';
import { useState } from 'react';
import NewPost from '../../../components/MissionaryComponents/Posts/NewPost/NewPost';
import Campaign from '../../../components/MissionaryComponents/Campaign/Campaign';
import MyWork from '../../../components/MissionaryComponents/MyWork/MyWork';
import HomePageFooter from '../../../components/HomePageFooter/HomePageFooter';
import FeedPosts from '../../../components/MissionaryComponents/Posts/FeedPosts/FeedPosts';

function HomePage() {
  const[activeTab, setActiveTab] = useState('Meu projeto')

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
            <Box>
              {activeTab === 'Meu projeto' && <MyWork />}
              {activeTab === 'Campanha' && <Campaign />}
              {activeTab === 'Postagens' && <NewPost />}
            </Box>
            {activeTab === 'Postagens' ? (
              <Box>
                <FeedPosts />
              </Box>
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

