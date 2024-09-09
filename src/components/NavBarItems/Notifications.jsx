import { Box, Link, VStack, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import {IoNotificationsOutline} from 'react-icons/io5'

function Notifications({ sizeOfIcon, sizeOfText }) {
  return (
    <Link
    display={"flex"}
    to={"/"}
    as={RouterLink}
    alignItems={"center"}
    flexDirection={"column"}
    _hover={{bg: "gray.100"}}
    borderRadius={4}
    
    w={{base: 10, md: "full"}}
    justifyContent={"center"}
    >
        <IoNotificationsOutline size={sizeOfIcon} />
        <Text fontSize={sizeOfText} color={"black"}>Notificações</Text>
    </Link> 
  )
}

export default Notifications