import { Avatar, Flex, Text, Button, Container } from "@chakra-ui/react";
import PostModal from "../PostModal/PostModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import { useEffect, useState } from "react";
import { PostDataProvider } from "../../../../context/PostDataContext";

function Posts() {

  const authUser = useAuth();

  const navigate = useNavigate();

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
      setImageLoaded(true);
    };
  
    useEffect(() => {
      const img = new Image();
      img.src = authUser?.profilePicture;
      img.onload = handleImageLoad;
    }, [authUser.profilePicture]);

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
      justifyContent={"space-between"}
      alignItems={"center"}
      >
        <Text
        fontFamily={"Inter, sans-serif"}
        fontWeight={"black"}
        fontSize={"25px"}
        >
            Nova Postagem
        </Text>

        <Flex 
        direction="row"
        alignItems="center"
        width={"100%"}
        justifyContent={"flex-start"}
        height="100%"
        gap={{base: 2, sm: 4}}
        >
          <Avatar 
          src={authUser.profilePicture} 
          alt="Missionary" 
          size={{base: "md", md: "md"}} 
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

          <Button
          flex={1}
          width={"auto"}
          height={["35px", "45px", "45px", "45px", "45px"]}
          border={"2px solid black"}
          borderRadius={50}
          backgroundColor={"#FFEFE7"}
          _hover={{background: "#FFB999"}}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          whiteSpace={"nowrap"}
          onClick={() => navigate(`/${authUser.username}/CreatePost`)}
          >
            <Text
            fontFamily={"Inter, sans-serif"}
            fontSize={"md"}
            >
              Faça uma postagem
            </Text>
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}

export default Posts;
