import { Box, Flex, Link, VStack, Text, Button } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { IoHomeOutline, IoSearchOutline } from 'react-icons/io5'

function Search({ sizeOfIcon, sizeOfText }) {
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
            <IoSearchOutline size={sizeOfIcon} />
          
            <Text fontSize={sizeOfText} color={"black"}>
              Pesquisar
            </Text>
          </Flex>
          
        </Button>
    </Flex> 
  )
}

export default Search