import { Flex, Box, Text, Button } from "@chakra-ui/react"

function HomePageFooter() {
  return (
    <Flex
    margin={5}
    justifyContent={"center"}
    alignItems={"center"}
    >
        <Button
        width={"auto"}
        height={["30px", "35px", "35px", "35px", "35px"]}
        borderRadius={50}
        backgroundColor={"black"}
        color={"white"}
        _hover={{background: "gray"}}
        overflow={"hidden"}
        textOverflow={"ellipsis"}
        whiteSpace={"nowrap"}
        >
        Entre em contato com o Mission App
        </Button>
    </Flex>
  )
}

export default HomePageFooter
