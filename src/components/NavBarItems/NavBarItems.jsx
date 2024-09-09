import Home from "./Home"
import Notifications from "./Notifications"
import Projetos from "./Projetos"
import Search from "./Search"
import ProfileLink from "./ProfileLink"
import { Spacer } from "@chakra-ui/react"
import LogOut from "./LogOut"

function BarItems( {sizeOfIcon, sizeOfText} ) {
  return (
    <>
        <Home sizeOfIcon={sizeOfIcon} sizeOfText={sizeOfText} />
        <Search sizeOfIcon={sizeOfIcon} sizeOfText={sizeOfText} />
        <Projetos sizeOfIcon={sizeOfIcon} sizeOfText={sizeOfText} />
        <Notifications sizeOfIcon={sizeOfIcon} sizeOfText={sizeOfText} />
        <ProfileLink sizeOfIcon={sizeOfIcon} sizeOfText={sizeOfText} />
        <Spacer />
        <Spacer />
        <Spacer />
        <LogOut sizeOfIcon={sizeOfIcon} sizeOfText={sizeOfText} />     
    </>
  )
}

export default BarItems