import { Box, Flex, VStack, Spinner, Text} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import BottomBar from "../../components/BottomBar/BottomBar";
import { useState, useEffect, useRef } from "react";
import { path } from "framer-motion/client";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { AuthProvider } from "../../context/AuthContext.jsx";
import MissionaryHomePage from "../../Pages/HomePagesFolder/MissionaryHomePage/MissionaryHomePage";
import useAuthStore from "../../store/authStore.js";


function PageLayout({children, loading, authUser}) {
  const {pathname} = useLocation();
  
  const [showNavBar, setShowNavBar] = useState(true);

  const [isLargerThanBase, setIsLargerThanBase] = useState(window.innerWidth >= 1000);

  const [isFetching, setIsFetching] = useState(false);

  const lastScrollY = useRef(0);


  const canRenderNavBar = pathname !== "/landingPage"
  && pathname !== "/"
  && pathname !== "/donorSignPage"
  && pathname !== "/missionarySignPage"
  && pathname !== "/resetForm"
  && pathname !== "/resetPassword"
  && pathname !== "/socialProjectSignPage"
  && pathname !== "/authAdmin"
  && pathname !== "/adminRegistrationPanel"
  && pathname !== "/adminMissionarySignUpSucess";

  const canRenderBottomBar = authUser !== null 
  && pathname !== "/landingPage"
  && pathname !== "/donorSignPage"
  && pathname !== "/missionarySignPage"
  && pathname !== "/resetForm"
  && pathname !== "/resetPassword"
  && pathname !== "/socialProjectSignPage"
  && pathname !== "/authAdmin"
  && pathname !== "/adminRegistrationPanel"
  && pathname !== "/adminMissionarySignUpSucess";

  
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
  }, []);

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
  }, []);

  return (
    <AuthProvider authUser={authUser}>
      <VStack minH={"100vh"} spacing={0}>
        {canRenderNavBar && (
          <Box w={"full"} justifyContent={"center"} alignItems={"center"}
          >
            <NavBar isLargerThanBase={isLargerThanBase} setIsFetching={setIsFetching} />
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
              {loading || isFetching ? (
                <>
                  <Flex justifyContent="center" alignItems="center" flex={1}>
                    <Spinner size="xl" />
                  </Flex>
                </>
              ) : (
                <>
                  {children}
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
                </>
              )}

            </Flex>
          </Flex>
        {canRenderBottomBar && !isLargerThanBase && (
          <BottomBar />
        )}        
      </VStack>
    </AuthProvider>
  )
}

export default PageLayout;


