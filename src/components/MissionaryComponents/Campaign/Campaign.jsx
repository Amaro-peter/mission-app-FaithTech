import { Flex, Box, Button, Text, Image, Container } from "@chakra-ui/react";
import { useAuth } from "../../../context/AuthContext";

function Campaign() {
  const authUser = useAuth();
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
      p={4}
      boxShadow="md"
      direction={"column"}
      mx={"auto"}
      >
        <Flex 
        direction="row"
        alignItems="center"
        width={"full"}
        justifyContent={"space-between"}
        height="100%"
        gap={{base: 3, sm: 5}}
        >
          <Text
          fontFamily={"Inter, sans-serif"}
          fontWeight={"black"}
          fontSize={"25px"}
          >
            Campanha
          </Text>

          {authUser && authUser.role === "missionary" ? (
            <>
              <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              _hover={{ background: "gray.400", borderRadius: "50%" }}
              width="50px"
              height="50px"
              >
                <Image 
                  src='./pencil_editor.png' 
                  alt="Missionary" 
                  width="30px" 
                  height="30px" 
                  cursor={"pointer"} 
                  />
              </Box>
            </>
          ) : null}
        </Flex>

        <Flex
        direction={"column"}
        gap={2}
        >
          <Text
            fontFamily={"Inter, sans-serif"}
            fontWeight={"semibold"}
            fontSize={"20px"}
            >
              Missões na África do Sul
          </Text>

          <Text
          fontSize={"md"}
          fontFamily={"Inter, sans-serif"}
          whiteSpace="normal" // Allow text to wrap
          textAlign="justfied" // Justify text
          >
            Ajude-nos a construir uma escola cristã em uma favela da África do Sul. Neste lugar, as crianças quase não tem acesso a materiais educativos cristãos. Ter uma escola confessional cristã em lugar tão carente pode revolucionar uma geração inteira. Precisamos de recursos para comprar tijolos, argamassa, cimento, areia, tinta, telhas, carteiras escolares, quadro, mesas, dentre outros.
          </Text>
        </Flex>
        <Flex
        mt={4}
        direction={"column"}
        gap={2}
        >
          <Image 
          src='./Escola.png' 
          alt="Missionary" 
          width={"full"}
          height={"auto"}
          cursor={"pointer"} 
          />
        </Flex>

        <Flex
        mt={4}
        direction={"column"}
        gap={2}
        >
          <Box
          width={"50%"}
          height={"25px"}
          border={"2px solid black"}
          borderRadius={50}
          bgGradient={"linear(to-r, #E89871 50%,  #FFEFE7 50%)"}
          justifyContent={"center"}
          alignItems={"center"}
          display={"flex"}
          >
            <Text
            fontFamily={"Inter, sans-serif"}
            fontWeight={"extrabold"}
            fontSize={"normal"}
            >
              50%
            </Text>
          </Box>

          <Text
          fontFamily={"Inter, sans-serif"}
          fontWeight={"semibold"}
          fontSize={"md"}
          >
            Meta
          </Text>
          <Text
          fontFamily={"Inter, sans-serif"}
          fontWeight={"semibold"}
          fontSize={"md"}
          >
            R$ 20.000,00
          </Text>
          <Text
          fontFamily={"Inter, sans-serif"}
          fontWeight={"semibold"}
          fontSize={"md"}
          >
            Arrecadado
          </Text>
          <Text
          fontFamily={"Inter, sans-serif"}
          fontWeight={"semibold"}
          fontSize={"md"}
          >
            R$ 10.312,25
          </Text>
          <Button
          width={"auto"}
          height={["30px", "35px", "35px", "35px", "35px"]}
          border={"2px solid black"}
          borderRadius={50}
          backgroundColor={"#FFEFE7"}
          _hover={{background: "#FFB999"}}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          whiteSpace={"nowrap"}
          >
            Apoiar campanha
          </Button>
        </Flex>
      </Flex>
    </Container>
  )
}

export default Campaign
