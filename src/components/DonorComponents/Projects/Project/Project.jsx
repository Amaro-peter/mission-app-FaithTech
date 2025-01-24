import { Flex, Box, Button, Text, Image, Container } from "@chakra-ui/react";

function Project({source}) {
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
      borderColor={"black"}
      p={4}
      boxShadow="md"
      direction={"column"}
      alignItems={"center"}
      justifyContent={"start-end"}
      mx={"auto"}

      >
        <Flex 
        direction="row"
        alignItems="center"
        width={"full"}
        justifyContent={"center"}
        height="100%"
        gap={{base: 3, sm: 5}}
        >
          <Text
          fontFamily={"Inter, sans-serif"}
          fontWeight={"black"}
          fontSize={{ base: "18px", sm: "16px", md: "18px", lg: "20px" }}
          alignItems={"center"}
          >
            Missões na África do Sul
          </Text>
        </Flex>

        <Flex
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
        >
          <Text
            fontFamily={"Inter, sans-serif"}
            fontWeight={"semibold"}
            fontSize={{ base: "18px", sm: "16px", md: "18px", lg: "20px" }}
            >
                Samuel Mendonça
          </Text>

          <Text
          fontSize={{ base: "16px", sm: "18px", md: "20px", lg: "22px" }}
          fontFamily={"Inter, sans-serif"}
          whiteSpace="normal" // Allow text to wrap
          textAlign="justfied" // Justify text
          >
            Vivendo para o Reino. Missionário na África do Sul.
          </Text>
        </Flex>
        <Flex
        mt={4}
        direction={"column"}
        alignItems={"center"}
        gap={2}
        >
          <Image 
          src = {source} 
          alt="Missionary" 
          width={"full"}
          height={"auto"}
          cursor={"pointer"} 
          />
        </Flex>
      </Flex>
    </Container>
  )
}

export default Project;