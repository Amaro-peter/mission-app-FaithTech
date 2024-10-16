import { Button, Box, Flex, VStack, Spinner, Text} from "@chakra-ui/react"
import { useLocation } from "react-router-dom"
import NavBar from "../../components/NavBar/NavBar"
import BottomBar from "../../components/BottomBar/BottomBar"
import { useState, useEffect, useRef } from "react"
import useAuthStore from "../../store/authStore"
import { path } from "framer-motion/client"


function PageLayout({children, authUser}) {
  const {pathname} = useLocation()
  const userAuth = useAuthStore((state) => state.user)
  const canRenderNavBar = pathname !== "/landingPage"
  && pathname !== "/donorSignPage"
  && pathname !== "/missionarySignPage"
  && pathname !== "/resetPassword"
  && pathname !== "/socialProjectSignPage";
  const canRenderBottomBar = pathname !== "/landingPage"
  && pathname !== "/donorSignPage"
  && pathname !== "/missionarySignPage"
  && pathname !== "/resetPassword"
  && pathname !== "/socialProjectSignPage";
  const [showNavBar, setShowNavBar] = useState(true)
  const [loading, setLoading] = useState(true)
  const [isLargerThanBase, setIsLargerThanBase] = useState(window.innerWidth >= 1000)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const waitForUserAuth = () => {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if(userAuth !== undefined) {
            clearInterval(interval)
            resolve(userAuth)
          } 
        }, 100);
      });
    };

    waitForUserAuth().then((user) => {
      setLoading(false);
    });
  }, [userAuth])

  const checkingUserAuth = null;
  if(checkingUserAuth) {
    return <PageLayoutSpinner />
  }

  
  useEffect(() => {
    const handleResize = () => {
      const isLargeScreen = window.innerWidth >= 1000;
      setIsLargerThanBase(isLargeScreen);

      if(isLargeScreen) {
        setShowNavBar(true);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [])

  useEffect(() =>{
    const handleScroll = () => {
      if(window.innerWidth <= 1000) {
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
            
        <Flex
        direction="column"
        flex={1}
        width="100%"
        mx="auto"
        mt={canRenderNavBar ? "15px" : "0"}
        overflow="hidden"
        position="relative"
        >
          <Flex
          flex={1}
          overflowY="auto" // Manage scrolling from this parent component
          width="100%"
          direction={"column"}
          >

            {children} {/* This will be MissionaryHomePage */}

            <Flex
            bg={"#FFEFE759"}
            flex="1"
            width="100%"
            direction="column"
            >
              {canRenderNavBar && (
                <Box mb={"100px"} width={"full"} />
              )}
            </Flex>

          </Flex>
        </Flex>
      {canRenderBottomBar && !isLargerThanBase && (
        <BottomBar />
      )}        
    </VStack>
  )
}

export default PageLayout;

const PageLayoutSpinner = () => {
  return (
      <Flex flexDir="column" h="100vh" alignItems={"center"} justifyContent={"center"}>
          <Spinner size="xl" />
      </Flex>
  );
}


