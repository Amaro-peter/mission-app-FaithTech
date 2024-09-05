import { Box, Flex, VStack } from "@chakra-ui/react"
import { useLocation } from "react-router-dom"
import NavBar from "../../components/NavBar/NavBar"
import BottomBar from "../../components/BottomBar/BottomBar"

function PageLayout({children}) {
  const {pathname} = useLocation()
  const canRenderNavBar = pathname === "/";
  const canRenderBottomBar = pathname === "/";


  return (
    <VStack>
        {canRenderNavBar && (
          <Box w={"full"} justifyContent={"center"} alignItems={"center"}>
            <NavBar />
          </Box>
        )}
        <Box flex={1} w={{base:"calc(100%-70px", md:"calc(100% -240px"}} mx={"auto"}>
            {children}
        </Box>
        {canRenderBottomBar && (
          <Box w={"full"} justifyContent={"center"} alignItems={"center"}>
            <BottomBar />
          </Box>
        )}
    </VStack>
  )
}

export default PageLayout