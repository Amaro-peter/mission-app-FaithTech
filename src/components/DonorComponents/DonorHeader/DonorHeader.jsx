import { Box, Button, Flex, VStack, Text, Spacer, Image, Avatar, AvatarGroup, Divider, Container, useMediaQuery } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { base } from 'framer-motion/client';
import useAuthStore from '../../../store/authStore';
import useGetUserProfileByUsername from '../../../hooks/useGetUserProfileByUsername';
import { useParams } from 'react-router-dom';

function MissionaryHeader({activeTab, handleTabClick}) {
  const[fontSize, setFontSize] = useState("16px");
  const [isLargerThan360] = useMediaQuery("(min-width: 371px)");
  const authUser = useAuth();
  const {username} = useParams();
  const {isLoading, userProfile} = useGetUserProfileByUsername(username);

  const visitingMyOwnProfileAndAuth = authUser && authUser.username === userProfile?.username;

  useEffect(() => {
    const handleResize = () => {
      const zoomLevel = 1;
      const width = window.innerWidth;
      let newFontSize;

      if(width <= 320){
        newFontSize = 10 * zoomLevel + 'px'; 
      } else if (width < 480) {
        newFontSize = 12 * zoomLevel + 'px';
      } else if (width < 768) {
        newFontSize = 14 * zoomLevel + 'px';
      } else if (width < 1024) {
        newFontSize = 16 * zoomLevel + 'px';
      } else {
        newFontSize = 18 * zoomLevel + 'px';
      }

      setFontSize(newFontSize)
    }

    window.addEventListener('resize', handleResize);
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

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
      >
        <Flex 
          direction="row"
          alignItems="center"
          justifyContent={"space-between"}
          width={"full"}
          height="100%"
          gap={{base: 2, sm: 5}}
        >
          <Flex
          direction={{base: "column", sm: "row"}}
          width={"full"}
          alignItems={{base: "start", sm: "center"}}
          height={"100%"}
          gap={2}
          >
            <Avatar src='' alt="Missionary" size={{base: "md", md: "lg"}} />
            <Flex
            direction={"column"}
            alignItems={"start"}
            >
                {userProfile.role === "user" ? (
                  <Flex
                  alignItems={"center"}
                  gap={2}
                  >
                    <Text
                    fontFamily={"Inter, sans-serif"}
                    fontWeight={"bold"}
                    fontSize={["20px", "25px", "30px"]}
                    whiteSpace="normal" // Allow text to wrap
                    textAlign="justify" // Justify text
                    >
                      Samuel Mendonça
                    </Text>
                    <Text
                    fontFamily={"Inter, sans-serif"}
                    fontWeight={"bold"}
                    fontSize={"auto"}
                    whiteSpace="normal" // Allow text to wrap
                    textAlign="justify" // Justify text
                    >
                      (usuário)
                    </Text>
                  </Flex>

                ) : null}

                <Text
                fontFamily={"Inter, sans-serif"}
                fontWeight={"bold"}
                fontSize={"14px"}
                whiteSpace="normal" // Allow text to wrap
                textAlign="justify" // Justify text
                >
                    Centro Evangelístico Internacional
                </Text>
            </Flex>

          </Flex>
        </Flex>

        <Flex 
        direction={"column"}
        gap={2}
        >
         
          <Text
          fontFamily={"Inter, sans-serif"}
          fontWeight={"bold"}
          fontSize={"15px"}
          whiteSpace="normal" // Allow text to wrap
          textAlign="justify" // Justify text
          >
            @_SamiMendonça
          </Text>
          <Text
          fontSize={"sm"}
          fontFamily={"Inter, sans-serif"}
          whiteSpace="normal" // Allow text to wrap
          textAlign="justify" // Justify text
          >
            Vivendo para o Reino. Missionário na África do Sul.
          </Text>

          {visitingMyOwnProfileAndAuth ? (
              <>
                <Button
                width={"auto"}
                maxWidth={"30%"}
                height={"auto"}
                paddingY={2} // Add vertical padding
                paddingX={4} // Add horizontal padding
                border={"2px solid black"}
                borderRadius={50}
                backgroundColor={"#FFEFE7"}
                _hover={{background: "#FFB999"}}
                >
                  <Text fontSize={"auto"}>
                    Editar
                  </Text>
                </Button>
              </>
            ) : null}
        </Flex>

        <Divider my={3} mx={-4} width={"calc(100% + 32px)"} h={"1px"} bg={"black"} />
        
        {visitingMyOwnProfileAndAuth ? 
          <Flex
          direction={isLargerThan360 ? "row" : "column"}
          width={"full"}
          justifyContent={{ base: "center", md: "space-between" }}
          alignItems={"center"}
          gap={{ base: 4, md: 2 }}
          >
            {['Feed', 'Explore novos projetos'].map((tab) => (
              <VStack
                align={"stretch"}
                key={tab}
                width={{ base: "full", md: "auto" }}
              >
                <Button
                  onClick={() => handleTabClick(tab)}
                  cursor="pointer"
                  background={"transparent"}
                  width={{ base: "full", md: "auto" }}
                >
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight={activeTab === tab ? "bold" : "normal"}
                  >
                    {tab}
                  </Text>
                </Button>
                {activeTab === tab && (
                  <Box
                    height={"2px"}
                    bg={"#E89871"}
                    width="100%"
                    mt={1}
                  />
                )}
              </VStack>
            ))}
          </Flex> : null}
      </Flex>
    </Container>
  )
}

export default MissionaryHeader;