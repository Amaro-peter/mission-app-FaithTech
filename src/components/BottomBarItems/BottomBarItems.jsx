import Home from "../NavBarItems/Home"
import ProfileLink from "../NavBarItems/ProfileLink"
import Projetos from "../NavBarItems/Projetos"
import Search from "../NavBarItems/Search"
import { Flex, useBreakpointValue } from "@chakra-ui/react"

function BottomBarItems() {
  const sizeOfIcon = useBreakpointValue({
    base: "1.5em", // For very small screens
    sm: "1.5em", // Small screens
    md: "1.5em", // Medium screens
    lg: "1.75em", // Large screens
    xl: "2em" // Extra large screens
  });

  const sizeOfText = useBreakpointValue({
    base: "1em", // For very small screens
    sm: "1em", // Small screens
    md: "1em", // Medium screens
    lg: "1em", // Large screens
    xl: "1em" // Extra large screens
  });

  
  return (
    <>
        <Flex
        mt={2}
        direction={"row"}
        gap={2}
        w={"full"}
        h={"full"}
        justifyContent={"center"}
        alignItems={"center"}
        >
          <Home sizeOfIcon={sizeOfIcon} sizeOfText={sizeOfText} />
          <Search sizeOfIcon={sizeOfIcon} sizeOfText={sizeOfText} />
          <Projetos sizeOfIcon={sizeOfIcon} sizeOfText={sizeOfText} />
          <ProfileLink sizeOfIcon={sizeOfIcon} sizeOfText={sizeOfText} />   
        </Flex>  
    </>
  )
}

export default BottomBarItems