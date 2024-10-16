import { Box, Flex, Link, Image, Avatar, useMediaQuery, Spacer, Button, Text } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import { MissionLogo } from "../../assets/constants"
import { IoBagOutline, IoHomeOutline, IoSearchOutline } from "react-icons/io5"
import { IoIosLogOut, IoIosNotificationsOutline } from "react-icons/io"
import { useEffect, useState } from "react"
import NavBarItems from "../NavBarItems/NavBarItems"
import useLogOut from "../../hooks/useLogOut"

function NavBar( { isLargerThanBase } ) {

  const {handleLogOut, isLoggingOut} = useLogOut()
  
  return (
    <Box
    width={"full"}
    h={"45px"}
    borderBottom={"1px solid"}
    borderColor={"blackAlpha.400"}
    px={{ base: 4, md: 8 }}
    position={"fixed"}
    top={0}
    py={{base: 2, md: 4}}
    mb={0}
    zIndex={1000}
    bg={"white"}
    overflow={"hidden"}
    >
        {isLargerThanBase ? (
          <Flex 
          direction={"row"} 
          gap={10} 
          w={"full"} 
          height={"full"}
          alignItems={"center"}
          justifyContent={"center"}
          
          >
            <Image
            src={"./Mission.png"}  // Image source
            alt="Mission Logo"
            width={{ base: "50%", md: "20%", lg: "10%" }}  // Responsive width
            maxWidth="200px"  // Max width to ensure proper scaling
            minWidth="100px"  // Min width to ensure visibility at smaller sizes
            height="auto"  // Auto height to maintain aspect ratio
            m={2}
            />
          
            <NavBarItems sizeOfIcon={"1.5em"} sizeOfText={"0.75em"} />
            
          </Flex> 
        ) : (
          <>
            <Flex 
            direction={"row"} 
            gap={10} 
            w={"full"} 
            height={"full"}
            alignItems={"center"}
            justifyContent={"center"}
            
            >
              <Image
              src={"./Mission.png"}  // Image source
              alt="Mission Logo"
              width={{ base: "50%", md: "20%", lg: "10%" }}  // Responsive width
              maxWidth="200px"  // Max width to ensure proper scaling
              minWidth="100px"
              height="auto"  // Auto height to maintain aspect ratio
              m={2}
              />
              <Spacer />
              <Flex direction={"row"} cursor={"pointer"}>
                <Avatar size={{base:"xs", sm:"xs", md:"xs"}}  src={""}/>
              </Flex>
            </Flex> 
          </>
        )}    
    </Box>
  )
}

export default NavBar