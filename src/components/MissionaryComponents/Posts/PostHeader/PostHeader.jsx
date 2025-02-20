import { 
    Avatar,
    Flex,
    Text,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalHeader,
    VStack,
    Stack,
    Center,
    Heading,
} from '@chakra-ui/react';
import React from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { useUserProfile } from '../../../../context/UserProfileContext';
import { IoTrash } from "react-icons/io5";
import { useContext } from 'react';
import { PostDataContext } from '../../../../context/PostDataContext';

function PostHeader({ deletePost, isDeleting, index, post }) {

    const { setPostCount } = useContext(PostDataContext);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const userProfile = useUserProfile();

    const authUser = useAuth();

    const visitingMyOwnProfileAndAuth = authUser && userProfile && authUser.uid === userProfile.uid;

    const handleDeletePost = async () => {
        await deletePost(post, index, setPostCount);
        onClose();
    }

    return (
    <Flex
    justifyContent={"space-between"}
    alignItems={"center"}
    w={"full"}
    >
        <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={1}
        >
            <Avatar src={userProfile.profilePicture} alt="user profile pic" size={"md"} />

            <Flex
            direction={"column"}
            gap={1}
            >
                <Text
                fontFamily={"Inter, sans-serif"}
                fontWeight={"bold"}
                fontSize={"auto"}
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
            </Flex>
        </Flex>
        {!visitingMyOwnProfileAndAuth ? (
            <Button
            width={"auto"}
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
            >
                <Text fontSize={"auto"}>
                    Doar
                </Text>
            </Button>
        ) : (
            <Button
            width={"auto"}
            height={["30px", "35px", "35px", "35px", "35px"]}
            borderRadius={20}
            border={"1px solid black"}
            boxShadow={"0 0 10px rgba(0, 0, 0, 0.2)"}
            _hover={{
                boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
                transform: "scale(1.02)",
            }}
            transition="all 0.2s ease-in-out"
            onClick={onOpen}
            >
                <IoTrash />
            </Button>
        )}


    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"white"} boxShadow={"xl"} border={"1px solid gray"} mx={3}>
            <ModalHeader />
                <ModalBody>
                    <Flex bg={"black"}>
                        <Stack spacing={4} w={"full"} maxW={"md"} bg={"white"} p={6} my={0}>
                            <Center>
                                <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                                Deletar a postagem?
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
                            isDisabled={isDeleting}
                            >
                                Não
                            </Button>
                            <Button
                            bg={"red.400"}
                            color={"white"}
                            size='sm'
                            w='full'
                            _hover={{ bg: "red.500" }}
                            onClick={handleDeletePost}
                            isLoading={isDeleting}
                            >
                                Sim
                            </Button>
                        </Stack>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    </Flex>
    );
}

export default PostHeader;
