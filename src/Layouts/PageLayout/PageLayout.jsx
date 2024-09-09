import { Box, Container, Flex, VStack } from "@chakra-ui/react"
import { useLocation } from "react-router-dom"
import NavBar from "../../components/NavBar/NavBar"
import BottomBar from "../../components/BottomBar/BottomBar"
import { useState, useEffect, useRef } from "react"

function PageLayout({children}) {
  const {pathname} = useLocation()
  const canRenderNavBar = pathname === "/";
  const canRenderBottomBar = pathname === "/";
  const [showNavBar, setShowNavBar] = useState(true)
  const [isLargerThanBase, setIsLargerThanBase] = useState(window.innerWidth >= 780)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleResize = () => {
      setIsLargerThanBase(window.innerWidth >= 780)
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() =>{
    const handleScroll = () => {
      if(window.innerWidth <= 780) {
        if(window.scrollY > lastScrollY.current) {
          setShowNavBar(false)
        } else {
          setShowNavBar(true)
        }
        lastScrollY.current = window.scrollY
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <VStack minH={"100vh"} spacing={0}>
      {canRenderNavBar && showNavBar && (
        <Box w={"full"} justifyContent={"center"} alignItems={"center"}
        >
          <NavBar isLargerThanBase={isLargerThanBase} />
        </Box>
      )}
            
      <Box flex={1} w={{base:"calc(100%-70px)", md:"calc(100% -240px)"}} mx={"auto"}
      mt={"45px"}
      overflow={"auto"}
      position={"relative"}
      mb={"100px"}
      >
        {children}
      </Box> 
      {canRenderBottomBar && !isLargerThanBase && (
        <BottomBar />
      )}        
    </VStack>
  )
}

export default PageLayout