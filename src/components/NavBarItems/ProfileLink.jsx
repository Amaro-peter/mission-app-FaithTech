import { Box, Flex, Link, VStack, Text, Avatar, Button } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { IoHomeOutline } from 'react-icons/io5'

function Home({ sizeOfIcon, sizeOfText }) {
  return (
    <Flex
    display={"flex"}
    alignItems={"center"}
    justifyContent={"center"}
    > 
        <Button
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        backgroundColor={"transparent"}
        gap={2}
        >
          <Flex
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          >
            <Avatar size="xs" />
            <Text fontSize={sizeOfText} color={"black"}>Conta</Text>
          </Flex>
          
        </Button>
    </Flex>
    
  )
}

export default Home