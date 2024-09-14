import { Box, Container, Flex, VStack } from '@chakra-ui/react';
import MissionaryHeader from '../../../components/MissionaryComponents/MissionaryHeader/MissionaryHeader';

function HomePage() {
  return (
    <Flex
    direction={"column"}
    flex={1}
    width={"100%"}
    minHeight={0}
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
          <VStack gap={5} width="100%">
            <Box flex={2} py={10}>
              <MissionaryHeader />
            </Box>
          </VStack>
        </Container>
      </Flex>
    </Flex>
  );
}

export default HomePage;

