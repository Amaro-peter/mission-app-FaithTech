import { Flex, Text, Box, Image, Button, Container } from '@chakra-ui/react';
import React from 'react';
import { useAuth } from '../../../context/AuthContext';

function MyWork() {
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
        justifyContent={"space-between"}
        alignItems={"center"}
        >
            <Flex 
            direction="row"
            alignItems="center"
            width={"full"}
            justifyContent={"space-between"}
            height="100%"
            gap={{base: 4, sm: 7}}
            >
                <Text
                fontFamily={"Inter, sans-serif"}
                fontWeight={"black"}
                fontSize={"25px"}
                >
                    Projeto de impacto
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
                    Meu nome é Samuel Mendonça e sou missionário em tempo integral. Desde minha infância tenho sido chamado por Deus para servir na África e na Ásia. Junte-se comigo e ajude a trazer luz para aqueles que estão em trevas !
                    Atuo na África do Sul juntamente com a base missionária da JOCUM. Realizamos evangelismo de impacto em escolas, hospitais e nos locais onde os mais marginalizados da sociedade se encontram.
                </Text>
            </Flex>

            <Flex
            mt={4}
            direction={"column"}
            gap={2}
            >
                <Image 
                src='./Video_Youtube.png' 
                alt="Missionary" 
                width={"full"}
                height={"auto"}
                cursor={"pointer"} 
                />

                <Image 
                src='./Kids.png' 
                alt="Missionary" 
                width={"full"}
                height={"auto"}
                cursor={"pointer"} 
                />
            </Flex>

            <Flex
            gap={4}
            m={4}
            width={"full"}
            justifyContent={"center"}
            alignItems={"center"}
            >
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
                    Apoiar a missão
                </Button>

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
                    Compartilhar
                </Button>
            </Flex>
        </Flex>
    </Container>
  )
}

export default MyWork
