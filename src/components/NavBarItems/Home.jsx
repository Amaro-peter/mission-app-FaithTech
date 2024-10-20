import { Box, Flex, Button, Link, VStack, Text } from '@chakra-ui/react'
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
        gap={1}
        >
          <Flex
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          mb={1}
          >
            <IoHomeOutline size={sizeOfIcon} />
            <Text fontSize={sizeOfText} color={"black"}>Home</Text>
          </Flex>
        </Button> 
    </Flex>
  )
}

export default Home