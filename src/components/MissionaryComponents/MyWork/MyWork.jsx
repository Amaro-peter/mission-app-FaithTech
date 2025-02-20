import { Flex, Text, Box, Button, Container, useDisclosure, useClipboard, 
    Modal, ModalBody, ModalCloseButton, ModalContent, Input, ModalHeader, 
    ModalOverlay, Stack, Heading,
    AspectRatio, Center, VStack
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useGetMissionaryProject from '../../../hooks/useGetMissionaryProject';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import MyWorkSkeleton from '../Skeletons/MyWorkSkeleton';
import { useUserProfile } from '../../../context/UserProfileContext';

function MyWork({unauthenticated}) {
    const authUser = useAuth();

    const navigate = useNavigate();

    const userProfile = useUserProfile();
    const [isUserProfileLoading, setIsUserProfileLoading] = useState(true);

    useEffect(() => {
        if(userProfile && typeof userProfile === 'object') {
            setIsUserProfileLoading(false);
        }
    }, [userProfile]);
    

    const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username;

    const {isLoadingProj, userProject} = useGetMissionaryProject(userProfile);

    const {isOpen: isLinkOpen, onOpen: onLinkOpen, onClose: onLinkClose} = useDisclosure();
    const {isOpen: isUnauthDonateOpen, onOpen: onUnauthDonateOpen, onClose: onUnauthDonateClose} = useDisclosure();
    
    const [linkValue, setLinkValue] = useState('');
    
    const {hasCopied: hasCopiedLink, onCopy: onCopyLink} = useClipboard(linkValue);

    const handleLinkClick = () => {
        setLinkValue(window.location.href);
        onLinkOpen();
    };

    const handleEditClick = () => {
        navigate(`/${authUser.username}/EditProject`);
    };

    const [isExpanded, setIsExpanded] = useState(false);
    const description =  userProject ? userProject.description : "Descrição ainda a ser definida";
    const truncatedDescription = description.length > 350 ? description.slice(0, 350) + "..." : description;

    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const hasImage = userProject?.publicPhoto?.trim();

    useEffect(() => {
        if (isLoadingProj) {
            setIsImageLoaded(false);
            return;
        }
    
        if (!userProject || !hasImage) {
            setIsImageLoaded(true); // No image case, show content immediately
            return;
        }
    
        setIsImageLoaded(false); // Show skeleton while image loads
        const img = new Image();
        img.src = userProject.publicPhoto;
        img.onload = () => setIsImageLoaded(true);
        img.onerror = () => setIsImageLoaded(true);

    }, [isLoadingProj, userProject?.publicPhoto]);

    if(isLoadingProj || isUserProfileLoading) {
        return (<>
            <Container
            maxW={"container.lg"}
            >
                <MyWorkSkeleton />
            </Container>
        </>);
    }

  return (
    <Container
    maxW={"container.lg"}
    >

        {(!isImageLoaded || isLoadingProj) ? (<MyWorkSkeleton />) : (
        <>
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
            gap={1}
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

                    {visitingOwnProfileAndAuth ? (
                        <>
                            <Button
                            height={["30px", "35px", "35px", "35px", "35px"]}
                            border={"2px solid black"}
                            borderRadius={50}
                            backgroundColor={"#FFEFE7"}
                            boxShadow={"0 0 10px rgba(255, 185, 153, 0.5)"}
                            _hover={{
                                background: "#FFB999",
                                boxShadow: "0 0 15px rgba(255, 185, 153, 0.8)",
                                transform: "scale(1.02)",
                            }}
                            transition="all 0.2s ease-in-out"
                            onClick={handleEditClick}
                            >
                                <Text fontSize={"auto"}>
                                    Editar
                                </Text>
                            </Button>
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
                        {userProject ? userProject.title  : "Projeto ainda a ser definido"}
                    </Text>
                    <Text
                    fontSize={"auto"}
                    fontFamily={"Inter, sans-serif"}
                    whiteSpace="normal" // Allow text to wrap
                    textAlign="justfied" // Justify text
                    >
                        {isExpanded ? description : truncatedDescription}
                        {description.length > 350 && (
                            <Link onClick={() => setIsExpanded(!isExpanded)}>
                                <Text color={"blue.500"} fontWeight={"bold"}>
                                    {isExpanded ? " Ler menos" : "Ler mais"}
                                </Text>
                            </Link>
                        )}
                    </Text>
                </Flex>

                <Flex
                mt={4}
                direction={"column"}
                gap={2}
                >
                    
                    {userProject && userProject.publicPhoto ?
                        <>
                            <Zoom
                            zoomMargin={10} // Adjusts the margin around the zoomed image
                            overlayBgColorEnd="rgba(0, 0, 0, 0.85)" // Smooth dark overlay for better focus
                            transitionDuration={300} // Smooth zoom animation duration
                            >
                                <img 
                                src={userProject.publicPhoto}
                                style={{ width: "100%", height: "auto" }}
                                loading='lazy'
                                onLoad={() => setIsImageLoaded(true)}
                                />
                            </Zoom>
                        </>
                    : null}

                    {userProject && userProject.publicYoutubeLink ? (
                        <AspectRatio ratio={16/9} width={"full"}>
                            <iframe 
                            width="942" 
                            height="530" 
                            src={userProject.publicYoutubeLink} 
                            title="Lista Mundial da Perseguição 2025" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerpolicy="strict-origin-when-cross-origin" 
                            allowFullScreen ></iframe>
                        </AspectRatio>
                    ) : null}

                </Flex>

                <Flex
                mt={4}
                gap={4}
                width={"full"}
                justifyContent={"center"}
                alignItems={"center"}
                >
                    
                    {!unauthenticated ? (
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
                    ) : (
                        <Button
                        height={["30px", "35px", "35px", "35px", "35px"]}
                        border={"2px solid black"}
                        borderRadius={50}
                        backgroundColor={"#FFEFE7"}
                        boxShadow={"0 0 10px rgba(255, 185, 153, 0.5)"}
                        _hover={{
                            background: "#FFB999",
                            boxShadow: "0 0 15px rgba(255, 185, 153, 0.8)",
                            transform: "scale(1.02)",
                        }}
                        transition="all 0.2s ease-in-out"
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        whiteSpace={"nowrap"}
                        onClick={onUnauthDonateOpen}
                        >
                            Apoiar a missão
                        </Button>
                    )}

                    <Button
                    height={["30px", "35px", "35px", "35px", "35px"]}
                    border={"2px solid black"}
                    borderRadius={50}
                    backgroundColor={"#FFEFE7"}
                    boxShadow={"0 0 10px rgba(255, 185, 153, 0.5)"}
                    _hover={{
                        background: "#FFB999",
                        boxShadow: "0 0 15px rgba(255, 185, 153, 0.8)",
                        transform: "scale(1.02)",
                    }}
                    transition="all 0.2s ease-in-out"
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    whiteSpace={"nowrap"}
                    onClick={handleLinkClick}
                    >
                        Link
                    </Button>
                </Flex>
            </Flex>
        </>)}

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

export default MyWork;
