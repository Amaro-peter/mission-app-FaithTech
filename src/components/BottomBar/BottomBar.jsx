import { Box, Flex, Link, Image } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import { useState, useEffect } from "react"
import { IoBagOutline, IoHomeOutline, IoSearchOutline } from "react-icons/io5"
import { IoIosLogOut, IoIosNotificationsOutline } from "react-icons/io"
import BottomBarItems from "../BottomBarItems/BottomBarItems"


function BottomBar() {

  return (
    <Box
    width={"full"}
    borderTop={"1px solid"}
    borderColor={"blackAlpha.600"}
    px={1}
    position={"fixed"}
    bottom={0}
    py={0}
    zIndex={1000}
    bg={"white"}
    >
        <Flex 
        direction={"row"} 
        gap={10} 
        w={"full"} 
        height={"full"}
        justifyContent={"center"}
        alignItems={"center"}
        >
          <BottomBarItems sizeOfIcon={"1.5em"} sizeOfText={"0.75em"} />
        </Flex>   
    </Box>
  )
}

export default BottomBar