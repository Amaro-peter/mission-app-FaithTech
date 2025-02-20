import { 
    Container, 
    Flex,
    Input, 
    VStack, 
    Textarea, 
    Text,
    Image, 
    useToast, 
    FormControl,
    FormLabel, 
    Center,
    Button, 
    Stack, 
    useDisclosure, 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    Heading, 
 } from '@chakra-ui/react';
import React, { useContext, useRef, useState } from 'react'
import { BsFillImageFill } from 'react-icons/bs'
import { useAuth } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import usePreviewImage from '../../../../hooks/usePreviewImage';
import useCreatePost from '../../../../hooks/useCreatePost';
import { PostDataContext } from '../../../../context/PostDataContext';
import { useTab } from '../../../../context/TabContext';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import useFetchPostCount from '../../../../hooks/useFetchPostCount';

const POST_QUANTITY_LIMIT = 12;


function PostModal() {

    const authUser = useAuth();

    const navigate = useNavigate();

    const toast = useToast();

    const {isOpen, onOpen, onClose} = useDisclosure();

    const {selectedFile, handleImageChange, setSelectedFile} = usePreviewImage();

    const fileRef = useRef(null);

    const {createPost, isCreating} = useCreatePost();

    const {isFetching, fetchPostCount} = useFetchPostCount();

    const { addPost, postCount, setPostCount } = useContext(PostDataContext);

    const { setInitialTab, setShouldResetTabs } = useTab();

    const [replaceLast, setReplaceLast] = useState(false);


    const [inputs, setInputs] = useState({
        caption: "",
        link: "",
        imageURL: "",
    });

    {/*useEffect(() => {
        const fetchPost = async () => {
            if(!gotPostCount) {
                await fetchPostCount(setPostCount, setGotPostCount);
            }
        };
        fetchPost();
    }, []);*/}

    const [charLimitReached, setCharLimitReached] = useState(false);
    
      useEffect(() => {
        if(charLimitReached) {
          const timer = setTimeout(() => {
            setCharLimitReached(false);
          }, 10000);
          return () => clearTimeout(timer);
        }
      }, [charLimitReached]);


      const isValidURL = (string) => {
        try{
            new URL(string);
            return true;
        } catch(_) {
            return false;
        }
      };

      const handleCreatePost = async () => {

        if(postCount === POST_QUANTITY_LIMIT) {
            setReplaceLast(true);
            onOpen();
            return;
        }

        try{
            const success = await createPost(inputs, selectedFile, addPost, setPostCount, replaceLast);
            if(success) {
                setSelectedFile(null);
                setInitialTab('Postagens');
                setShouldResetTabs(false);
                navigate(`/${authUser.username}`);
            }
        } catch(error) {
            if(!toast.isActive("createPostError")) {
                toast({
                  id: "createPostError",
                  title: "Erro ao criar postagem",
                  description: error.message,
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
              }
        }
      };

      const handleCreatePostModal = async () => {

        try{
            const success = await createPost(inputs, selectedFile, addPost, setPostCount, replaceLast);
            if(success) {
                setSelectedFile(null);
                setInitialTab('Postagens');
                setShouldResetTabs(false);
                navigate(`/${authUser.username}`);
            }
        } catch(error) {
            if(!toast.isActive("createPostError")) {
                toast({
                  id: "createPostError",
                  title: "Erro ao criar postagem",
                  description: error.message,
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
              }
        }
      };

    return (
        <>
            <Flex
            direction={"column"}
            flex={1}
            width={"100%"}
            minHeight={0}
            mt={4}
            >
                <Flex
                bg={"#FFEFE759"}
                flex="1"
                width="100%"
                direction="column"
                minHeight={0} // Prevents overflow within this container
                >
                    <Container
                    maxW="container.lg"
                    flex="1"
                    p={0}
                    overflow="hidden" // Remove unnecessary scrollbars
                    minH="0" // Key: Prevents overflow from flex children
                    >
                        <VStack gap={5} width="100%" align={"strecht"} >
                            <Container
                            maxW={"container.lg"}
                            mt={10}
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
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    >
                                        <Heading>Crie uma postagem</Heading>
                                    </Flex>

                                    <FormControl>
                                        <FormLabel>Escreva sua legenda</FormLabel>
                                        <Textarea
                                        border={"1px solid black"}
                                        size={"sm"} 
                                        type='text'
                                        resize="vertical"
                                        width={"100%"}
                                        minHeight="200px"
                                        maxHeight="400px"
                                        value={inputs.caption}
                                        onChange={(e) => {
                                            if(e.target.value.length <= 600) {
                                            setInputs({...inputs, caption: e.target.value});
                                            setCharLimitReached(false);
                                            } else {
                                            setCharLimitReached(true);
                                            if(!toast.isActive("charLimitToast")) {
                                                toast({
                                                id: "charLimitToast",
                                                title: "Limite de caracteres excedido",
                                                description: "A minibiografia deve ter no máximo 600 caracteres.",
                                                status: "warning",
                                                duration: 5000,
                                                isClosable: true,
                                                position: "top-left",
                                                });
                                            }
                                            }
                                        }}
                                        />
                                    </FormControl>

                                    <Input type='file' hidden />

                                    <FormControl>
                                        <FormLabel>Coloque um link, se desejar</FormLabel>
                                        <Flex
                                        justifyContent={"flex-start"}
                                        alignItems={"center"}
                                        direction={"row"}
                                        mt={2}
                                        gap={3}
                                        
                                        >
                                            <Input 
                                            border={"1px solid black"}
                                            placeholder='Link para Youtube, Instagram, etc...' 
                                            width={"100%"} 
                                            value={inputs.link}
                                            onChange={(e) => {
                                                const data = e.target.value;
                                                if(isValidURL(data)) {
                                                    setInputs({ ...inputs, link: data});
                                                } else {
                                                    if(!toast.isActive("invalidLink")) {
                                                        toast({
                                                            id: "invalidLink",
                                                            title: "Link inválido",
                                                            description: "Por favor, insira um URL válido.",
                                                            status: "error",
                                                            duration: 5000,
                                                            isClosable: true,
                                                            position: "top-left",
                                                        });
                                                    }
                                                }
                                            }}
                                            />
                                        </Flex>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Selecionar Imagem</FormLabel>
                                        
                                        <Stack 
                                        direction={"column"}
                                        spacing={5}
                                        >   
                                            
                                            <Button
                                            mt={1}
                                            width={"full"}
                                            justifyContent={"space-betweem"}
                                            alignItems={"center"}
                                            cursor={"pointer"}
                                            backgroundColor={"#FFEFE7"}
                                            _hover={{ background: "#FFB999"}}
                                            border={"1px solid black"}
                                            onClick={() => fileRef.current.click()}
                                            >
                                                <Text
                                                fontSize={"md"}
                                                fontFamily={"Inter, sans-serif"}
                                                fontWeight={"bold"}
                                                >
                                                    Foto
                                                </Text>
                                            </Button>

                                            <Input 
                                            type='file'
                                            hidden
                                            ref={fileRef}
                                            onChange={handleImageChange}
                                            />
    
                                            <Center>
                                                {selectedFile ? (
                                                    <Zoom
                                                    zoomMargin={10} // Adjusts the margin around the zoomed image
                                                    overlayBgColorEnd="rgba(0, 0, 0, 0.85)" // Smooth dark overlay for better focus
                                                    transitionDuration={300} // Smooth zoom animation duration
                                                    >
                                                        <Image 
                                                        src={selectedFile}
                                                        alt="Foto de Projeto"
                                                        width={"100%"}
                                                        height={"auto"}
                                                        />
                                                    </Zoom>
                                                ) : null}
                                            </Center>
                                        </Stack>
                                    </FormControl>

                                    <Flex
                                    justifyContent={"space-between"}
                                    alignItems={"center"}
                                    mt={4}
                                    >
                                        <Button
                                        bg={"red.400"}
                                        color={"white"}
                                        _hover={{bg: "red.500"}}
                                        onClick={() => {
                                            setInitialTab('Postagens');
                                            setShouldResetTabs(false);
                                            navigate(`/${authUser.username}`);
                                        }}
                                        isDisabled={isCreating || isFetching}
                                        >
                                            Voltar
                                        </Button>

                                        <Button
                                        mr={3}
                                        backgroundColor={"#FFEFE7"}
                                        border={"1px solid black"}
                                        _hover={{ background: "#FFB999"}}
                                        onClick={handleCreatePost}
                                        isLoading={isCreating || isFetching}
                                        isDisabled={isFetching}
                                        >
                                            Postar
                                        </Button>
                                    </Flex>
                                </Flex>
                                <Modal isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <ModalContent bg={"white"} boxShadow={"xl"} border={"1px solid gray"} mx={3}>
                                        <ModalHeader />
                                        <ModalBody>
                                            <Flex bg={"black"}>
                                                <Stack spacing={4} w={"full"} maxW={"md"} bg={"white"} p={6} my={0}>
                                                    <Center>
                                                        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }} textAlign={"center"}>
                                                            Limite de 120 postagens atingido!
                                                        </Heading>
                                                    </Center>
                                                        
                                                    <VStack mt={2} gap={1} alignItems={"center"} textAlign={"center"}>
                                                        <Text fontSize={"lg"} fontWeight={"bold"}>A postagem mais antiga será apagada.</Text>
                                                        <Text fontSize={"lg"} fontWeight={"bold"}>A postagem atual ficará no lugar.</Text>
                                                        <Text fontSize={"lg"} fontWeight={"bold"}>Deseja prosseguir?</Text>
                                                    </VStack>

                                                    <Button
                                                    bg={"blue.400"}
                                                    color={"white"}
                                                    size='sm'
                                                    w='full'
                                                    _hover={{ bg: "blue.500" }}
                                                    onClick={onClose}
                                                    isDisabled={isCreating}
                                                    >
                                                        Não
                                                    </Button>
                                                    <Button
                                                    bg={"red.400"}
                                                    color={"white"}
                                                    size='sm'
                                                    w='full'
                                                    _hover={{ bg: "red.500" }}
                                                    onClick={handleCreatePostModal}
                                                    isLoading={isCreating}
                                                    >
                                                        Sim
                                                    </Button>
                                                </Stack>
                                            </Flex>
                                        </ModalBody>
                                    </ModalContent>
                                </Modal>
                            </Container>
                        </VStack>
                    </Container>
                </Flex>
            </Flex>
        </>
    );
}

export default PostModal;
