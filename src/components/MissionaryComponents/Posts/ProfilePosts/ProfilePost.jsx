import {
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import PostHeader from "../PostHeader/PostHeader";
import PostFooter from "../PostFooter/PostFooter";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

function ProfilePost({ source }) {
  return (
    <Flex
      width={{ base: "100%", md: "80%" }}
      bg="white"
      color="black"
      border="1px solid gray.500"
      borderRadius={10}
      p={4}
      gap={1}
      boxShadow="md"
      direction={"column"}
      mx={"auto"}
      mb={4}
    >
      <PostHeader />
      <Flex mt={2} direction={"column"} gap={3}>
        <Text
          fontSize={"md"}
          fontFamily={"Inter, sans-serif"}
          whiteSpace="normal"
          textAlign="justify"
        >
          Hoje, fizemos uma leitura bíblica com as crianças sobre a vida de Jesus. Ensinamos a elas como manusear a bíblia e a diferença entre o novo e velho Testamento.
        </Text>

        <Box
          my={2}
          borderRadius={4}
          overflow={"hidden"}
          cursor={"pointer"}
        >
          <Zoom
            zoomMargin={10} // Adjusts the margin around the zoomed image
            overlayBgColorEnd="rgba(0, 0, 0, 0.85)" // Smooth dark overlay for better focus
            transitionDuration={300} // Smooth zoom animation duration
          >
            <img
              src={source}
              alt="Missionary"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '4px',
              }}
            />
          </Zoom>
        </Box>
      </Flex>
      <PostFooter />
    </Flex>
  );
}

export default ProfilePost;

