import { Box, Button, Flex, VStack, Text, Spacer, Image, Avatar, AvatarGroup, Divider, Container, useMediaQuery, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useAuthStore from '../../../store/authStore';
import useUserProfileStore from '../../../store/useProfileStore';
import LogOut from '../../NavBarItems/LogOut';

function MissionaryHeader({activeTab, handleTabClick}) {
  const[fontSize, setFontSize] = useState("16px");
  const [isLargerThan360] = useMediaQuery("(min-width: 371px)");
  const authUser = useAuthStore(state => state.user);

  const {userProfile} = useUserProfileStore();
  const{isOpen, onOpen, onClose} = useDisclosure();

  const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username;
  const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;


  useEffect(() => {
    const handleResize = () => {
      const zoomLevel = 1;
      const width = window.innerWidth;
      let newFontSize;

      if(width <= 320){
        newFontSize = 10 * zoomLevel + 'px' 
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
          gap={{base: 4, sm: 7}}
        >
          <Avatar src='' alt="Missionary" size={{base: "md", md: "lg"}} />

          <Flex 
          gap={4}
          >
            { visitingOwnProfileAndAuth ? (
              <>
                <Button
              width={"auto"}
              height={["30px", "35px", "35px", "35px", "35px"]}
              border={"2px solid black"}
              borderRadius={50}
              backgroundColor={"#FFEFE7"}
              _hover={{background: "#FFB999"}}
              >
                <Text fontSize={fontSize}>
                  Seguidores
                </Text>
              </Button>
              </>
            ) : (
              <>
                <Button
                width={"auto"}
                height={["30px", "35px", "35px", "35px", "35px"]}
                border={"2px solid black"}
                borderRadius={50}
                backgroundColor={"#FFEFE7"}
                _hover={{background: "#FFB999"}}
                >
                  <Text fontSize={fontSize}>
                    Seguir
                  </Text>
                </Button>
                <Button
                width={"auto"}
                height={["30px", "35px", "35px", "35px", "35px"]}
                border={"2px solid black"}
                borderRadius={50}
                backgroundColor={"#FFEFE7"}
                _hover={{background: "#FFB999"}}
                >
                  <Text fontSize={fontSize}>
                    Doar
                  </Text>
                </Button>
              </>
            )}
          </Flex>
        </Flex>
        <Flex direction={"column"}
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
        </Flex>
        <Flex mt={2} gap={2}
        justifyContent={"flex-start"}
        alignIte ms={"center"}
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
            <Text fontSize={fontSize}>
              Editar Perfil
            </Text>
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
              <Text fontSize={fontSize}>
                Meu Contato
              </Text>
            </Button>

            {authUser && authUser.role === "missionary" ? (
              <>
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
                  <Text fontSize={fontSize}>
                    Área de doações
                  </Text>
                </Button>
              </>
            ) : null}

        </Flex>
        <Divider my={3} mx={-4} width={"calc(100% + 32px)"} h={"1px"} bg={"black"} />
        <Flex
        direction={isLargerThan360 ? "row" : "column"}
        width={"full"}
        justifyContent={{ base: "center", md: "space-between" }}
        alignItems={"center"}
        gap={{ base: 4, md: 2 }}
        >
          {['Meu projeto', 'Campanha', 'Postagens'].map((tab) => (
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
        </Flex>
      </Flex>
    </Container>
  )
}

export default MissionaryHeader;