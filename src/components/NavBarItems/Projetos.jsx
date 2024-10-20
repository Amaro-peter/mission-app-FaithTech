import { Box, Flex, Link, VStack, Text, Button } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { IoBagOutline } from 'react-icons/io5'

function Projetos({ sizeOfIcon, sizeOfText }) {
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
        >
          <Flex
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          mb={1}
          >
            <IoBagOutline size={sizeOfIcon} />
            <Text fontSize={sizeOfText} color={"black"}>Projetos</Text>
          </Flex>
          
        </Button>
    </Flex>
  )
}

export default Projetos