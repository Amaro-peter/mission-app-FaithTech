import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react"
import { useState } from "react"
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../../../assets/constants"

function PostFooter() {
  const[isLiked, setIsLiked] = useState(false)

  return (
    <Box
    mb={10}
    marginTop={"auto"}
    >
        <Flex
        alignItems={"center"}
        gap={4}
        w={"full"}
        pt={0}
        mb={2}
        my={4}
        >
            <Box
            cursor={"pointer"}
            fontSize={18}
            onClick={() => setIsLiked(!isLiked)}
            >
                {!isLiked ? (<NotificationsLogo />) : (<UnlikeLogo />)}
            </Box>
            <Box
            cursor={"pointer"}
            fontSize={"18"}
            >
                <CommentLogo />
            </Box>
        </Flex>
        <Text
        fontSize={12}
        color={"gray.600"}
        >
            Postado 5 horas atrás
        </Text>
        <Text fontSize={"sm"}
        color={"gray.700"}
        cursor={"pointer"}
        >
            Veja todos os 10 comentários
        </Text>
        <Flex
        alignItems={"center"}
        gap={2}
        justifyContent={"space-between"}
        w={"full"}
        >
            <InputGroup>
                <Input 
                variant={"flushed"}
                placeholder={"Escreva um comentário..."}
                fontSize={"14"}
                />
                <InputRightElement>
                    <Button
                    fontSize={"14"}
                    color={"orange.500"}
                    fontWeight={"600"}
                    cursor={"pointer"}
                    _hover={{color: "orange.800"}}
                    bg={"transparent"}
                    >
                        Postar
                    </Button>
                </InputRightElement>
            </InputGroup>
        </Flex>
    </Box>
  )
}

export default PostFooter
