import { Avatar, Box, Button, Center, Container, Divider, 
    Flex, Image, FormControl, FormLabel, Heading, Input, 
    Stack, Textarea, useToast, VStack,
    Modal, ModalBody, ModalCloseButton, ModalOverlay, 
    ModalContent, Text, useDisclosure, ModalHeader} from '@chakra-ui/react';
import { useRef, useState, useEffect } from 'react';
import HomePageFooter from '../../../components/HomePageFooter/HomePageFooter';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import usePreviewImage from '../../../hooks/usePreviewImage';
import useEditProject from '../../../hooks/useEditProject';
import useAuthStore from '../../../store/authStore';
import 'react-phone-input-2/lib/style.css';
import useGetMissionaryProject from '../../../hooks/useGetMissionaryProject';
import useDeleteProject from '../../../hooks/useDeleteProject';

function EditProject({username, errorMessage, setErrorMessage}) {

  const userStore = useAuthStore((state) => state.user);

  const {isLoading, userProject} = useGetMissionaryProject();

  const {isDeleting, deleteProject} = useDeleteProject(userStore);

  const toast = useToast();

  const {isOpen, onOpen, onClose} = useDisclosure();

  const navigate = useNavigate();

  const {selectedFile, handleImageChange, setSelectedFile} = usePreviewImage();

  const fileRef = useRef(null);

  const {editProject, isUpdating} = useEditProject();

  const [imageLoaded, setImageLoaded] = useState(false);
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };


  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    publicYoutubeLink: "",
    publicPhoto: "",
  });


  useEffect(() => {
    if(userProject) {
      setInputs({
        title: userProject.title || "",
        description: userProject.description || "",
        publicYoutubeLink: userProject.publicYoutubeLink || "",
        publicPhoto: userProject.publicPhoto || "",
      });
    }
  }, [userProject]);


  const [charLimitReached, setCharLimitReached] = useState(false);

  useEffect(() => {
    if(charLimitReached) {
      const timer = setTimeout(() => {
        setCharLimitReached(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [charLimitReached]);


  const [titleCharLimit, setTitleCharLimit] = useState(false);

  useEffect(() => {
    if(titleCharLimit) {
      const timer = setTimeout(() => {
        setTitleCharLimit(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [titleCharLimit]);


  const handleEditProject = async () => {
    try{
      await editProject(inputs, selectedFile);
      setSelectedFile(null);
    } catch(error) {
      if(!toast.isActive("editProjectError")) {
        toast({
          id: "editProjectError",
          title: "Erro ao editar projeto",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      
    }
  };

  const handleDeleteProject = async () => {
    try{
      await deleteProject(userStore);
    } catch(error) {
      if(!toast.isActive("deleteProjectError")) {
        toast({
          id: "deleteProjectError",
          title: "Erro ao deletar projeto",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
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
              boxShadow="md"
              direction={"column"}
              mx={"auto"}
            >
              <Stack
              spacing={4}
              w={"full"}
              p={6}
              my={0}
              >
                <Heading 
                lineHeight={1.1}
                fontSize={{base: "2xl", sm: "3xl", lg: "4xl"}}  
                >
                  Editar Projeto
                </Heading>

                <FormControl>
                  <FormControl>
                    <FormLabel>Título</FormLabel>
                    <Input 
                    placeholder='Título' 
                    size={"sm"} 
                    type='text'
                    value={inputs.title}
                    onChange={(e) => {
                      if(e.target.value.length <= 50) {
                        setInputs({...inputs, title: e.target.value});
                        setTitleCharLimit(false);
                      } else {
                        setTitleCharLimit(true);
                        if(!toast.isActive("titleCharLimitToast")) {
                          toast({
                            id: "titleCharLimitToast",
                            title: "Limite de caracteres excedido",
                            description: "O título deve ter no máximo 50 caracteres.",
                            status: "warning",
                            duration: 5000,
                            isClosable: true,
                            position: "top"
                          });
                        }
                      }
                    }}
                    />
                    {titleCharLimit && <span>Limite de caracteres atingido (até 50 caracteres)</span>}
                  </FormControl>
                </FormControl>

                <FormControl>
                  <FormControl>
                    <FormLabel>Link de vídeo para o Youtube</FormLabel>
                    <FormLabel>(copie e cole o link)</FormLabel>
                    <Input 
                    placeholder='Link' 
                    size={"sm"} 
                    type='text'
                    value={inputs.publicYoutubeLink}
                    onChange={(e) => setInputs({...inputs, publicYoutubeLink: e.target.value})}
                    />
                  </FormControl>
                </FormControl>

                <FormControl>
                  <FormControl>
                    <FormLabel>Descrição</FormLabel>
                    <Textarea 
                    placeholder='Descrição' 
                    size={"sm"} 
                    type='text'
                    resize="vertical"
                    width={"100%"}
                    minHeight="300px"
                    maxHeight="500px"
                    value={inputs.description}
                    onChange={(e) => {
                      if(e.target.value.length <= 1000) {
                        setInputs({...inputs, description: e.target.value});
                        setCharLimitReached(false);
                      } else {
                        setCharLimitReached(true);
                        if(!toast.isActive("charLimitToast")) {
                          toast({
                            id: "charLimitToast",
                            title: "Limite de caracteres excedido",
                            description: "A minibiografia deve ter no máximo 1000 caracteres.",
                            status: "warning",
                            duration: 5000,
                            isClosable: true,
                            position: "top"
                          });
                        }
                      }
                    }}
                    />
                    {charLimitReached && <span>Limite de caracteres atingido (até 1000 caracteres)</span>}
                  </FormControl>
                </FormControl>

                <FormControl>
                  <Stack direction={"column"} spacing={6}>
                  <Center>
                      <Button w={"100%"} onClick={() => fileRef.current.click()}>
                        Selecionar foto para o Projeto
                      </Button>
                    </Center>
                    <Input 
                      type='file'
                      hidden
                      ref={fileRef}
                      onChange={handleImageChange}
                    />

                    <Center>

                      {selectedFile ? 
                      <Image 
                      src={selectedFile}
                      alt="Foto de Projeto"
                      width={"50%"}
                      height={"auto"}
                      /> : null}

                    </Center>
                    
                  </Stack>
                </FormControl>

                <Stack spacing={6} direction={["column", "row"]} >
                  <Button
                  bg={"red.400"}
                  color={"white"}
                  w={"full"}
                  size={"sm"}
                  _hover={{bg: "red.500"}}
                  onClick={() => navigate(`/${userStore.username}`)}
                  >
                    Voltar
                  </Button>

                  <Button
                  bg={"red.400"}
                  color={"white"}
                  w={"full"}
                  size={"sm"}
                  _hover={{bg: "red.500"}}
                  onClick={onOpen}
                  >
                    Deletar projeto
                  </Button>

                  <Button
                  background={"orange.400"}
                  color={"white"}
                  w={"full"}
                  size={"sm"}
                  _hover={{ background: "orange.500" }}
                  onClick={handleEditProject}
                  isLoading={isUpdating}
                  >
                    Submeter
                  </Button>
                </Stack>

              </Stack>
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
                      <Center>
                        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                          Deletar o Projeto?
                        </Heading>
                      </Center>
                          
                      <VStack mt={2} gap={1}>
                        <Text fontSize={"lg"} fontWeight={"bold"}>A ação é irreversível.</Text>
                        <Text fontSize={"lg"} fontWeight={"bold"}>Tem certeza disso?</Text>
                      </VStack>

                      <Button
                      bg={"blue.400"}
                      color={"white"}
                      size='sm'
                      w='full'
                      _hover={{ bg: "blue.500" }}
                      onClick={onClose}
                      >
                        Não
                      </Button>
                      <Button
                      bg={"red.400"}
                      color={"white"}
                      size='sm'
                      w='full'
                      _hover={{ bg: "red.500" }}
                      onClick={handleDeleteProject}
                      isLoading={isDeleting}
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
        <Divider w={"full"} h={"2px"} bg={"gray"} mt={10} />
          <HomePageFooter />
      </Flex>
    </Flex>
  );
}

export default EditProject;