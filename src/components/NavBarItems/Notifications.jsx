import { Box, Button, Flex, Link, VStack, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import {IoNotificationsOutline} from 'react-icons/io5'

function Notifications({ sizeOfIcon, sizeOfText }) {
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
            <IoNotificationsOutline size={sizeOfIcon} />
            <Text fontSize={sizeOfText} color={"black"}>Alertas</Text>
          </Flex>
          
        </Button> 
    </Flex>
  )
}

export default Notifications