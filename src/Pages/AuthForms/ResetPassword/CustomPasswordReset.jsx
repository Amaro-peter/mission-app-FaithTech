import React, { useState, useEffect } from 'react';
import { useToast, Box, Flex, VStack, Text, Input, InputGroup, InputRightElement, IconButton, Button, Container, Image } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '../../../utils/firebase';

function CustomPasswordReset() {
    const location = useLocation();
    const navigate = useNavigate();
    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [oobCode, setOobCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordVisibility = () => setShowPassword(!showPassword);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get('oobCode');
        if (code) {
            setOobCode(code);
        } else {
            toast({
                title: "Error",
                description: "Invalid or missing oobCode",
                status: "error",
                duration: 8000,
                isClosable: true,
                position: "top"
            });
            navigate('/landingPage');
        }
    }, [location, navigate, toast]);

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast({
                title: "Error",
                description: "Senhas não estão iguais",
                status: "error",
                duration: 8000,
                isClosable: true,
                position: "top"
            });
            return;
        }

        try {
            await confirmPasswordReset(auth, oobCode, newPassword);
            toast({
                title: "Success",
                description: "Senha definida com sucesso!",
                status: "success",
                duration: 8000,
                isClosable: true,
                position: "top"
            });
            navigate('/landingPage');
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 8000,
                isClosable: true,
                position: "top"
            });
        }
    };

    return (
        <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
            <Container maxW={"container.md"} padding={0}>
                <VStack justifyContent={"center"} alignItems={"center"}>
                    <Box
                    width={["100%", "75%", "50%"]}
                    height={"auto"}
                    margin={"0 auto"}
                    >
                        <Image src="./Mission.png" 
                        width={"100%"}
                        height={"auto"}
                        alt="Mission img"
                        my={35}
                        />
                    </Box>

                    <Box border={"1px solid black"} borderRadius={4} padding={5} marginBottom={10}>
                        <Text textAlign={"center"} fontSize="xl" fontWeight={"bold"} fontFamily={"Inter, sans-serif"}>
                            Coloque sua senha
                        </Text>
                        <VStack spacing={4} mt={4}>
                        <InputGroup>
                            <Input
                                placeholder='Nova Senha'
                                type={showPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <InputRightElement>
                                <IconButton
                                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                    onClick={handlePasswordVisibility}
                                    variant='ghost'
                                />
                            </InputRightElement>
                        </InputGroup>
                        <InputGroup>
                            <Input
                                placeholder='Confirmar a Senha'
                                type={showPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <InputRightElement>
                                <IconButton
                                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                    onClick={handlePasswordVisibility}
                                    variant='ghost'
                                />
                            </InputRightElement>
                        </InputGroup>
                            <Button 
                            onClick={handlePasswordReset} 
                            background={"#FFA888"} 
                            _hover={{ background: "#FF8866" }}
                            border={"2px solid black"}
                            >
                                Definir Senha
                            </Button>
                        </VStack>
                    </Box>
                </VStack>
            </Container>
        </Flex>
    );
}

export default CustomPasswordReset;