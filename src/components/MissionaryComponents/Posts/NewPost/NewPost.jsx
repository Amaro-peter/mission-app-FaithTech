import { Avatar, Flex, Text, Button, Image, Container, Box, useDisclosure } from "@chakra-ui/react"
import PostModal from "../PostModal/PostModal"

function Posts() {
  const {isOpen, onOpen, onClose} = useDisclosure()

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
      gap={3}
      boxShadow="md"
      direction={"column"}
      mx={"auto"}
      justifyContent={"space-between"}
      alignItems={"center"}
      >
        <Text
        fontFamily={"Inter, sans-serif"}
        fontWeight={"black"}
        fontSize={"25px"}
        >
            Nova Postagem
        </Text>

        <Flex 
        direction="row"
        alignItems="center"
        width={"100%"}
        justifyContent={"flex-start"}
        height="100%"
        gap={{base: 2, sm: 4}}
        >
          <Avatar src='' alt="Missionary" size={{base: "md", md: "md"}} />

          <Button
          flex={1}
          width={"auto"}
          height={["35px", "45px", "45px", "45px", "45px"]}
          border={"2px solid black"}
          borderRadius={50}
          backgroundColor={"#FFEFE7"}
          _hover={{background: "#FFB999"}}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          whiteSpace={"nowrap"}
          onClick={onOpen}
          >
            <Text
            fontFamily={"Inter, sans-serif"}
            fontSize={"md"}
            >
              Faça uma postagem
            </Text>
          </Button>
        </Flex>
        {isOpen && (<PostModal isOpen={isOpen} onClose={onClose} />)}
      </Flex>
    </Container>
  )
}

export default Posts
