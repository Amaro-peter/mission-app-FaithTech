import { Box, Button, Flex, VStack, Text, Avatar, Divider, Container, useMediaQuery, useDisclosure,
  useClipboard, Modal, ModalBody, ModalCloseButton, ModalContent, Input, ModalHeader, 
  ModalOverlay, Stack, Heading, Center} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useAuthStore from '../../../store/authStore';
import useUserProfileStore from '../../../store/useProfileStore';
import LogOut from '../../NavBarItems/LogOut';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useFollowUser from '../../../hooks/useFollowUser';
import useUnfollowUser from '../../../hooks/useUnfollowUser';
import { useUserProfile } from '../../../context/UserProfileContext';

function  MissionaryHeader({unauthenticated, activeTab, handleTabClick}) {
  const[fontSize, setFontSize] = useState("16px");
  const [isLargerThan360] = useMediaQuery("(min-width: 371px)");
  const responsiveFontSize = { base: '10px', sm: '12px', md: '14px', lg: '16px', xl: '18px' };

  const userProfile = useUserProfile();
  
  const {followStatus} = useUserProfileStore();

  const authUser = useAuth();

  const {isUpdatingFollow, handleFollowUser} = useFollowUser();
  const {isUpdatingUnfollow, handleUnfollowUser} = useUnfollowUser();

  const isFollowing = followStatus ? followStatus.isFollowed : false;

  const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username;
  const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;
  
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {isOpen: isLinkOpen, onOpen: onLinkOpen, onClose: onLinkClose} = useDisclosure();
  const {isOpen: isUnauthDonateOpen, onOpen: onUnauthDonateOpen, onClose: onUnauthDonateClose} = useDisclosure();

  const [linkValue, setLinkValue] = useState('');

  const {hasCopied: hasCopiedLink, onCopy: onCopyLink} = useClipboard(linkValue);

  const [value, setValue] = useState(userProfile.publicEmail);
  const [phoneValue, setPhoneValue] = useState(userProfile.publicPhone);

  const {hasCopied: hasCopiedEmail, onCopy: onCopyEmail} = useClipboard(value);
  const {hasCopied: hasCopiedPhone, onCopy: onCopyPhone} = useClipboard(phoneValue);

  const navigate = useNavigate();

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleEditClick = () => {
    navigate(`/${authUser.username}/EditHeader`);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    const img = new Image();
    img.src = userProfile?.profilePicture;
    img.onload = handleImageLoad;
  }, [userProfile?.profilePicture]);


  const handleLinkClick = () => {
    setLinkValue(window.location.href);
    onLinkOpen();
  };

  const handleFollowUnfollow = () => {
    if(isFollowing) {
      handleUnfollowUser(userProfile.uid);
    } else {
      handleFollowUser(userProfile.uid);
    }
  };

  const handleFollowersClick = () => {
    navigate(`/${authUser.username}/Followers`);
  };

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
    };

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
          
          <Avatar 
          src={userProfile?.profilePicture} 
          alt="Missionary" 
          size={{base: "md", md: "lg"}}
          style={{
            backgroundColor: imageLoaded ? 'transparent' : 'rgb(250, 192, 121)',
            animation: imageLoaded || !userProfile?.profilePicture ? 'none' : 'spin 1s linear infinite',
          }}
          />
          <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
          </style>
          
          {/*<Avatar 
            src={userProfile?.profilePicture} 
            alt="Missionary" 
            size={{base: "md", md: "lg"}} 
            style={{
              filter: imageLoaded ? 'blur(0px)' : 'blur(20px)',
              transition: 'filter 0.5s ease-out',
              backgroundColor: imageLoaded ? 'transparent' : 'rgb(247, 200, 112)',
            }}
          />*/}

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
                onClick={handleFollowersClick}
                >
                  <Text fontSize={fontSize}>
                    Seguidores
                  </Text>
                </Button>

                <Button
                width={"auto"}
                height={["30px", "35px", "35px", "35px", "35px"]}
                border={"2px solid black"}
                borderRadius={50}
                backgroundColor={"#FFEFE7"}
                _hover={{background: "#FFB999"}}
                onClick={handleEditClick}
                >
                  <Text fontSize={fontSize}>
                    Editar
                  </Text>
                </Button>
              
              </>
            ) : !unauthenticated ? (
              <>
                <Button
                width={"auto"}
                height={["30px", "35px", "35px", "35px", "35px"]}
                border={"2px solid black"}
                borderRadius={50}
                backgroundColor={"#FFEFE7"}
                _hover={{background: "#FFB999"}}
                onClick={handleFollowUnfollow}
                isLoading={isUpdatingFollow || isUpdatingUnfollow}
                >
                  <Text fontSize={fontSize}>
                    {isFollowing ? "Seguindo" : "Seguir"}
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
            ): (
              <>
                <Button
                width={"auto"}
                height={["30px", "35px", "35px", "35px", "35px"]}
                border={"2px solid black"}
                borderRadius={50}
                backgroundColor={"#FFEFE7"}
                _hover={{background: "#FFB999"}}
                onClick={onUnauthDonateOpen}
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
          wordSpacing={["1px", "1.5px", "2px", "2.5px"]} // Responsive word spacing
          >
            {userProfile.fullName}
          </Text>

          <Text
          fontFamily={"Inter, sans-serif"}
          fontWeight={"bold"}
          fontSize={"auto"}
          >
            (missionário)
          </Text>

          <Text
          fontFamily={"Inter, sans-serif"}
          fontWeight={"bold"}
          fontSize={"15px"}
          >
            {userProfile.username}
          </Text>
          <Text
          fontSize={"sm"}
          fontFamily={"Inter, sans-serif"}
          >
            {userProfile.bio}
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
            onClick={handleLinkClick}
            >
            <Text fontSize={fontSize}>
              Compartilhar
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
            onClick={onOpen}
            >
              <Text fontSize={fontSize}>
                Contato
              </Text>
            </Button>

            {visitingOwnProfileAndAuth ? (
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
          {['Projeto', 'Campanha', 'Postagens'].map((tab) => (
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"white"} boxShadow={"xl"} border={"1px solid gray"} mx={3}>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody>
              {/* Container Flex */}
            <Flex bg={"black"}>
              <Stack spacing={4} w={"full"} maxW={"md"} bg={"white"} p={6} my={0}>
                    <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                      Contato
                    </Heading>
      
                    <Box>
                      <Input 
                        value={value}
                        isReadOnly
                        placeholder="Email"
                        size="sm"
                        w="full"
                        border={"2px solid black"}
                      />
                  </Box>
                  <Button
                    bg={"orange.400"}
                    color={"white"}
                    size='sm'
                    w='full'
                    _hover={{ bg: "orange.500" }}
                    onClick={onCopyEmail}
                  >
                    {hasCopiedEmail ? 'Copiado' : 'Copiar Email'}
                  </Button>

                  <Box>
                    <Input 
                      value={phoneValue}
                      isReadOnly
                      placeholder="Phone"
                      size="sm"
                      w="full"
                      border={"2px solid black"}
                    />
                  </Box>
                  <Button
                    bg={"orange.400"}
                    color={"white"}
                    size='sm'
                    w='full'
                    _hover={{ bg: "orange.500" }}
                    onClick={onCopyPhone}
                  >
                    {hasCopiedPhone ? 'Copiado' : 'Copiar Telefone'}
                  </Button>

                </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isLinkOpen} onClose={onLinkClose}>
        <ModalOverlay />
        <ModalContent bg={"white"} boxShadow={"xl"} border={"1px solid gray"} mx={3}>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody>
              {/* Container Flex */}
            <Flex bg={"black"}>
              <Stack spacing={4} w={"full"} maxW={"md"} bg={"white"} p={6} my={0}>
                    <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                      Compartilhar página
                    </Heading>
      
                    <Box>
                      <Input 
                        value={linkValue}
                        isReadOnly
                        placeholder="Link"
                        size="sm"
                        w="full"
                        border={"2px solid black"}
                      />
                  </Box>
                  <Button
                    bg={"orange.400"}
                    color={"white"}
                    size='sm'
                    w='full'
                    _hover={{ bg: "orange.500" }}
                    onClick={onCopyLink}
                  >
                    {hasCopiedLink ? 'Copiado' : 'Copiar Link'}
                  </Button>
                </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isUnauthDonateOpen} onClose={onUnauthDonateClose}>
        <ModalOverlay />
        <ModalContent bg={"white"} boxShadow={"xl"} border={"1px solid gray"} mx={3}>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody>
            {/* Container Flex */}
            <Flex bg={"black"}>
              <Stack spacing={4} w={"full"} maxW={"md"} bg={"white"} p={6} my={0}>
                <Center>
                  <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                    Deseja doar?
                  </Heading>
                </Center>
                                
                <VStack mt={2} gap={1}>
                  <Text fontSize={"xl"} fontWeight={"bold"}>Cadastre-se primeiro!</Text>
                </VStack>
      
                <Button
                color={"black"}
                size='sm'
                w='full'
                backgroundColor={"#E6B89C"}
                _hover={{background: "#FFB999"}}
                onClick={() => navigate('/donorSignPage')}
                >
                  Cadastre-se
                </Button>
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  )
}

export default MissionaryHeader;

