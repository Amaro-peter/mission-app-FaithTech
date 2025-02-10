import { Avatar, Box, Button, Center, Container, Divider, Flex, FormControl, FormLabel, Heading, Input, Skeleton, SkeletonCircle, Stack, Textarea, useToast, VStack } from '@chakra-ui/react';
import { useRef, useState, useEffect } from 'react';
import HomePageFooter from '../../../components/HomePageFooter/HomePageFooter';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import usePreviewImage from '../../../hooks/usePreviewImage';
import useEditHeader from '../../../hooks/useEditHeader';
import useAuthStore from '../../../store/authStore';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

function EditHeader({username, errorMessage, setErrorMessage}) {

  const userStore = useAuthStore((state) => state.user);

  const toast = useToast();

  const navigate = useNavigate();

  const authUser = useAuth();

  const {selectedFile, handleImageChange, setSelectedFile} = usePreviewImage();

  const fileRef = useRef(null);

  const {editHeader, isUpdating} = useEditHeader();

  const [imageLoaded, setImageLoaded] = useState(false);
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  useEffect(() => {
    const img = new Image();
    img.src = authUser.profilePicture;
    img.onload = handleImageLoad;
  }, [authUser?.profilePicture]);
  


  const [inputs, setInputs] = useState({
    username: "",
    fullName: "",
    publicEmail: "",
    publicPhone: "",
    bio: "",
  });


  useEffect(() => {
    if(authUser) {
      setInputs({
        username: authUser.username ? authUser.username.replace(/_missionary$/, '') : "",
        fullName: authUser.fullName || "",
        publicEmail: authUser.publicEmail || "",
        publicPhone: authUser.publicPhone || "",
        bio: authUser.bio || "",
      });
    }
  }, [authUser]);


  const [charLimitReached, setCharLimitReached] = useState(false);

  useEffect(() => {
    if(charLimitReached) {
      const timer = setTimeout(() => {
        setCharLimitReached(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [charLimitReached]);


  const handleEditHeader = async () => {
    try{
      await editHeader(inputs, selectedFile);
      setSelectedFile(null);
    } catch(error) {
      if(!toast.isActive("editHeaderError")) {
        toast({
          id: "editHeaderError",
          title: "Erro ao editar cabeçalho",
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
                  Editar Cabeçalho
                </Heading>

                <FormControl>
                  <Stack direction={["column", "row"]} spacing={6}>
                    <Center>

                      <Avatar 
                      size="lg" 
                      src={selectedFile || authUser.profilePicture} 
                      border={"2px solid black"}
                      style={{
                        backgroundColor: imageLoaded ? 'transparent' : 'rgb(250, 192, 121)',
                        animation: imageLoaded || !authUser?.profilePicture ? 'none' : 'spin 1s linear infinite',
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

                    </Center>
                    <Center>
                      <Button w={"full"} onClick={() => fileRef.current.click()}>
                        Editar Foto de Perfil
                      </Button>
                    </Center>
                    <Input 
                      type='file'
                      hidden
                      ref={fileRef}
                      onChange={handleImageChange}
                    />
                  </Stack>
                </FormControl>

                <FormControl>
                  <FormControl>
                    <FormLabel>Nome Completo</FormLabel>
                    <Input 
                    placeholder='Nome completo' 
                    size={"sm"} 
                    type='text'
                    value={inputs.fullName}
                    onChange={(e) => setInputs({...inputs, fullName: e.target.value})}
                    />
                  </FormControl>
                </FormControl>

                <FormControl>
                  <FormControl>
                    <FormLabel>Nome de Usuário</FormLabel>
                    <Input 
                    placeholder='Nome de usuário' 
                    size={"sm"} 
                    type='text'
                    value={inputs.username}
                    onChange={(e) => setInputs({...inputs, username: e.target.value})}
                    />
                  </FormControl>
                </FormControl>

                <FormControl>
                  <FormControl>
                    <FormLabel>Minibiografia</FormLabel>
                    <Textarea 
                    placeholder='Minibiografia' 
                    size={"sm"} 
                    type='text'
                    value={inputs.bio}
                    onChange={(e) => {
                      if(e.target.value.length <= 200) {
                        setInputs({...inputs, bio: e.target.value});
                        setCharLimitReached(false);
                      } else {
                        setCharLimitReached(true);
                        if(!toast.isActive("charLimitToast")) {
                          toast({
                            id: "charLimitToast",
                            title: "Limite de caracteres excedido",
                            description: "A minibiografia deve ter no máximo 200 caracteres.",
                            status: "warning",
                            duration: 5000,
                            isClosable: true,
                            position: "top"
                          });
                        }
                        
                      }
                    }}
                    />
                    {charLimitReached && <span>Limite de caracteres atingido (até 200 caracteres)</span>}
                  </FormControl>
                </FormControl>

                <FormControl>
                  <FormControl>
                    <FormLabel>Email para o público</FormLabel>
                    <Input 
                    placeholder='Email' 
                    size={"sm"} 
                    type='text'
                    value={inputs.publicEmail}
                    onChange={(e) => setInputs({...inputs, publicEmail: e.target.value})}
                    />
                  </FormControl>
                </FormControl>

                <FormControl>
                  <FormControl>
                    <FormLabel>Telefone para o público</FormLabel>
                    <PhoneInput 
                      country={"br"}
                      value={inputs.publicPhone}
                      onChange={(value) => setInputs({...inputs, publicPhone: value})}
                      inputStyle={{width: '100%'}}
                    />
                  </FormControl>
                </FormControl>

                <Stack spacing={6} direction={["column", "row"]} >
                  <Button
                  bg={"red.400"}
                  color={"white"}
                  w={"full"}
                  size={"sm"}
                  _hover={{bg: "red.500"}}
                  onClick={() => navigate(`/${userStore.username}`)}
                  isDisabled={isUpdating}
                  >
                    Cancelar
                  </Button>

                  <Button
                  background={"orange.400"}
                  color={"white"}
                  w={"full"}
                  size={"sm"}
                  _hover={{ background: "orange.500" }}
                  onClick={handleEditHeader}
                  isLoading={isUpdating}
                  >
                    Submeter
                  </Button>
                </Stack>

              </Stack>
            </Flex>
          </Container>
          </VStack>
        </Container>
        <Divider w={"full"} h={"2px"} bg={"gray"} mt={10} />
          <HomePageFooter />
      </Flex>
    </Flex>
  );
}

export default EditHeader;