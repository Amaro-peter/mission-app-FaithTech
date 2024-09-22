import { Box, Flex, Image, Text } from "@chakra-ui/react"
import PostHeader from "../PostHeader/PostHeader"
import PostFooter from "../PostFooter/PostFooter"

function FeedPost({source}) {
  return (
    <Flex
    width={{base: "100%", md: "80%"}}
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
        <Flex
        mt={2}
        direction={"column"}
        gap={3}
        >
            <Text
            fontSize={"md"}
            fontFamily={"Inter, sans-serif"}
            whiteSpace="normal" // Allow text to wrap
            textAlign="justfied" // Justify text
            >
                Hoje, fizemos uma leitura bíblica com as crianças sobre a vida de Jesus. Ensinamos a elas como manusear a bíblia e a diferença entre o novo e velho Testamento.
            </Text>

            <Box
            my={2}
            borderRadius={"4"}
            overflow={"hidden"}
            >
                <Image 
                src= {source}
                alt="Missionary" 
                width="100%" 
                height="100%" 
                />
            </Box>
        </Flex>
        <PostFooter />    
    </Flex>
  )
}

export default FeedPost
