import { Box, Flex, Button, Image, Text, Spacer, useBreakpointValue } from "@chakra-ui/react";
import LogOut from "../NavBarItems/LogOut";
import NavBarItems from "../NavBarItems/NavBarItems";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Return from "../NavBarItems/Return";

function NavBar( { isLargerThanBase } ) {

  const authUser = useAuth();

  const navigate = useNavigate();

  const imageWidth = useBreakpointValue({
    base: "40%", // For very small screens
    sm: "30%", // Small screens
    md: "30%", // Medium screens
    lg: "25%", // Large screens
    xl: "20%" // Extra large screens
  });

  const maxImageWidth = useBreakpointValue({
    base: "150px", // For very small screens
    sm: "200px", // Small screens
    md: "250px", // Medium screens
    lg: "300px", // Large screens
    xl: "350px" // Extra large screens
  });

  const sizeOfIcon = useBreakpointValue({
    base: "1.5em", // For very small screens
    sm: "1.5em", // Small screens
    md: "1.5em", // Medium screens
    lg: "1.75em", // Large screens
    xl: "2em" // Extra large screens
  });

  const sizeOfText = useBreakpointValue({
    base: "0.875em", // For very small screens
    sm: "0.875em", // Small screens
    md: "1em", // Medium screens
    lg: "1em", // Large screens
    xl: "1em" // Extra large screens
  });
  
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
      { authUser && isLargerThanBase ? (
          <Flex 
          direction={"row"} 
          gap={10} 
          w={"full"} 
          height={"full"}
          alignItems={"center"}
          justifyContent={"center"}
          
          >
            <Link to={`${authUser.username}`} style={{ textDecoration: "none" }}>
              <Image
              src={"/Mission.png"}  // Image source
              alt="Mission Logo"
              width={{ base: "70%", md: "80%", lg: "90%" }}
              maxWidth="200px"  // Max width to ensure proper scaling
              minWidth="100px"
              height="auto"  // Auto height to maintain aspect ratio
              m={2}
              />
            </Link>
          
            <NavBarItems sizeOfIcon={"1.5em"} sizeOfText={"0.75em"} isLargerThanBase={isLargerThanBase} />
            
          </Flex> 
        ) : authUser && !isLargerThanBase ? (
          <>
            <Flex 
            direction={"row"} 
            w={"full"} 
            height={"full"}
            alignItems={"center"}
            justifyContent={"space-between"}
            >

              <Return />

              <Link to={`${authUser.username}`} style={{ textDecoration: "none" }}>
                <Image
                src={"/Mission.png"}  // Image source
                alt="Mission Logo"
                width={{ base: "70%", md: "80%", lg: "90%" }}  // Responsive width
                maxWidth="200px"  // Max width to ensure proper scaling
                minWidth="100px"
                height="auto"  // Auto height to maintain aspect ratio
                mt={2}
                ml={9}
                />
              </Link>

              <LogOut sizeOfIcon={sizeOfIcon} sizeOfText={sizeOfText} />

            </Flex> 
          </>
        ) : !authUser && !isLargerThanBase ? (
            <Flex 
            direction={"row"} 
            gap={3} 
            w={"full"} 
            height={"full"}
            alignItems={"center"}
            justifyContent={"center"}
            
            >
              <Link to={"/landingPage"} style={{ textDecoration: "none" }}>
                <Image
                src={"/Mission.png"}  // Image source
                alt="Mission Logo"
                width={{ base: "70%", md: "80%", lg: "90%" }} 
                maxWidth="200px"  // Max width to ensure proper scaling
                minWidth="100px"
                height="auto"  // Auto height to maintain aspect ratio
                m={2}
                />
              </Link>
              <Spacer />
              <Flex 
              direction={"row"} 
              cursor={"pointer"} 
              justifyContent={"center"}
              alignItems={"center"}
              gap={3}
              >
                <Button
                onClick={() => navigate("/donorSignPage")}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={2}
                mb={1}
                >
                  <Text fontSize={"auto"}>Cadastre-se</Text>
                </Button> 
              </Flex>
            </Flex> 
        ) : (

            <Flex 
            direction={"row"} 
            gap={10} 
            w={"full"} 
            height={"full"}
            alignItems={"center"}
            justifyContent={"center"}
            
            >
              <Link to={"/landingPage"} style={{ textDecoration: "none" }}>
                <Image
                src={"/Mission.png"}  // Image source
                alt="Mission Logo"
                width={{ base: "70%", md: "80%", lg: "90%" }} 
                maxWidth="200px"  // Max width to ensure proper scaling
                minWidth="100px"
                height="auto"  // Auto height to maintain aspect ratio
                m={2}
                />
              </Link>
            
              <Button
              onClick={() => navigate("/donorSignPage")}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={2}
              mb={1}
              >
                <Text fontSize={"auto"}>Cadastre-se</Text>
              </Button> 
          </Flex>
        )}
    </Box>
  );
}

export default NavBar;