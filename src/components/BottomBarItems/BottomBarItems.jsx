import Home from "../NavBarItems/Home"
import Notifications from "../NavBarItems/Notifications"
import Projetos from "../NavBarItems/Projetos"
import Search from "../NavBarItems/Search"
import LogOut from "../NavBarItems/LogOut"

function BottomBarItems( {sizeOfIcon, sizeOfText} ) {
  return (
    <>
        <Home sizeOfIcon={sizeOfIcon} sizeOfText={sizeOfText} />
        <Search sizeOfIcon={sizeOfIcon} sizeOfText={sizeOfText} />
        <Projetos sizeOfIcon={sizeOfIcon} sizeOfText={sizeOfText} />
        <Notifications sizeOfIcon={sizeOfIcon} sizeOfText={sizeOfText} />
        <LogOut sizeOfIcon={sizeOfIcon} sizeOfText={sizeOfText} />     
    </>
  )
}

export default BottomBarItems