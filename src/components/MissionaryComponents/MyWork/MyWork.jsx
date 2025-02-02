import { Flex, Text, Box, Image, Button, Container, useDisclosure, useClipboard, 
    Modal, ModalBody, ModalCloseButton, ModalContent, Input, ModalHeader, 
    ModalOverlay, Stack, Heading,
    AspectRatio
} from '@chakra-ui/react';
import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import useAuthStore from '../../../store/authStore';
import useUserProfileStore from '../../../store/useProfileStore';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useGetMissionaryProject from '../../../hooks/useGetMissionaryProject';
import useUserProjectStore from '../../../store/useProjectStore';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

function MyWork() {
    const authUser = useAuth();

    const {userProfile} = useUserProfileStore();

    const navigate = useNavigate();

    const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username;

    const {isLoading, userProject} = useGetMissionaryProject(userProfile);


    const {isOpen: isLinkOpen, onOpen: onLinkOpen, onClose: onLinkClose} = useDisclosure();
    
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
    const truncatedDescription = description.length > 350 ? description.slice(0, 350) + "..." : description

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
                        width={"auto"}
                        height={["30px", "35px", "35px", "35px", "35px"]}
                        border={"2px solid black"}
                        borderRadius={50}
                        backgroundColor={"#FFEFE7"}
                        _hover={{background: "#FFB999"}}
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
                        allowFullScreen></iframe>
                    </AspectRatio>
                ) : null}

                {userProject && userProject.publicPhoto ?
                    <>
                        <Zoom
                        zoomMargin={10} // Adjusts the margin around the zoomed image
                        overlayBgColorEnd="rgba(0, 0, 0, 0.85)" // Smooth dark overlay for better focus
                        transitionDuration={300} // Smooth zoom animation duration
                        >
                            <Image 
                            src={userProject.publicPhoto}
                            width={"full"}
                            height={"auto"}
                            />
                        </Zoom>
                    </>
                : null}
            </Flex>

            <Flex
            mt={4}
            gap={4}
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
                onClick={handleLinkClick}
                >
                    Compartilhar
                </Button>
            </Flex>
        </Flex>

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
    </Container>
  )
}

export default MyWork;
