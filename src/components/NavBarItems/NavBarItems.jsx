import Home from "./Home"
import Notifications from "./Notifications"
import Projetos from "./Projetos"
import Search from "./Search"
import ProfileLink from "./ProfileLink"
import { Flex, Spacer } from "@chakra-ui/react"
import LogOut from "./LogOut"

function BarItems( {sizeOfIcon, sizeOfText, isLargerThanBase} ) {
  return (
    <Flex
    direction={"row"}
    gap={5}
    overflow={"auto"}
    whiteSpace={"nowrap"}
    textOverflow={"ellipsis"}
    
    >
        <Home sizeOfIcon={sizeOfIcon} sizeOfText={sizeOfText} />
        <Search sizeOfIcon={sizeOfIcon} sizeOfText={sizeOfText} />
        <Projetos sizeOfIcon={sizeOfIcon} sizeOfText={sizeOfText} />
        <Notifications isLargerThanBase={isLargerThanBase} sizeOfIcon={sizeOfIcon} sizeOfText={sizeOfText} />
        <ProfileLink sizeOfIcon={sizeOfIcon} sizeOfText={sizeOfText} />
        <Spacer />
        <Spacer />
        <LogOut sizeOfIcon={sizeOfIcon} sizeOfText={sizeOfText} />
            
    </Flex>
  )
}

export default BarItems