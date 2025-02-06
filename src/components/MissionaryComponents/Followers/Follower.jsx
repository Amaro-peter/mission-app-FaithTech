import { Avatar, Box, Flex, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function Follower({user}) {

    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoaded = () => {
        setImageLoaded(true);
    };

    useEffect (() => {
        const img = new Image();
        img.src = user?.profilePicture;
        img.onload = handleImageLoaded;
    }, [user?.profilePicture]);

    return (
        <Link to={`/${user?.username}`} style={{textDecoration: "none"}}>
            <Box
            background={"white"}
            border={"1px solid"}
            borderColor={"gray.500"}
            borderRadius={"md"}
            p={1}
            alignItems={"stretch"}
            >
                <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                width={"full"}
                >
                    <Flex
                    alignItems={"center"}
                    gap={2}
                    >
                        <Avatar 
                        src={user?.profilePicture} 
                        size={"md"} 
                        style={{
                            backgroundColor: imageLoaded ? 'transparent' : 'rgb(250, 192, 121)',
                            animation: imageLoaded || !user?.profilePicture ? 'none' : 'spin 1s linear infinite',
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
                        
                        <VStack
                        alignItems={"flex-start"}
                        >
                            <Box fontSize={16} fontWeight={"bold"}>
                                {user?.fullName}
                            </Box>
                            <Box fontSize={15} fontWeight={"bold"}>
                                {user?.username}
                            </Box>
                        </VStack>
                    </Flex>
                </Flex>
            </Box>
        </Link>
    );
}