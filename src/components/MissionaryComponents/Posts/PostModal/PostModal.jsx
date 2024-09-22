import { Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea } from '@chakra-ui/react'
import React from 'react'
import { BsFillImageFill } from 'react-icons/bs'
import { TbWorldWww } from 'react-icons/tb'

function PostModal({isOpen, onClose}) {
  return (
    <>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
            bg={"white"}
            boxShadow={"xl"}
            border={"1px solid gray.500"}

            >
                <ModalHeader>Nova postagem</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Textarea 
                    placeholder='Escreva sua postagem aqui...'
                    border={"1px solid black"}
                    />
                    <Input type='file' hidden />

                    <Flex
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    direction={"row"}
                    mt={2}
                    gap={3}
                   
                    >

                        <Input mt={4} border={"1px solid black"} placeholder='Link para Youtube, Instagram, etc...' width={"80%"} />
                    </Flex>

                    <Button
                    mt={4}
                    width={"40%"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    cursor={"pointer"}
                    backgroundColor={"white"}
                    _hover={{ background: "#FFEFE7"}}
                    border={"1px solid black"}
                    >
                        <Flex
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                        direction={"row"}
                        gap={4}
                        mb={3}
                        >
                            <BsFillImageFill 
                            style={{marginTop: "15px", marginLeft: "5px", cursor:"pointer"}}
                            size={30}
                            />
                            <Text
                            mt={5}
                            fontSize={"md"}
                            fontFamily={"Inter, sans-serif"}
                            fontWeight={"bold"}
                            >
                                Fotos
                            </Text>
                        </Flex>
                    </Button>
                </ModalBody>
                <ModalFooter>
                    <Button
                    mr={3}
                    backgroundColor={"#FFEFE7"}
                    border={"1px solid black"}
                    _hover={{ background: "#FFB999"}}
                    >
                        Post
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
  )
}

export default PostModal
