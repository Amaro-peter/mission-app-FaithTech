import { Box, Button, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function LandingPageButtons() {
  return (
    <Box padding={5}>
        <VStack spacing={4} align={"stretch"}>
            <Link to={"/donorSignPage"}>
                <Button
                width={{ base: "100%", md: "250px" }}
                height={{ base: "55px", md: "auto" }}
                backgroundColor={"#FFDDCB"}
                border={"5px solid black"}
                borderRadius={50}
                fontSize="20px"
                fontFamily={"Inter, sans-serif"}
                fontWeight={"bold"}
                color="black"
                padding={"10px 20px"}
                display={{ base: "block", md: "inline-block" }}
                _hover={{background: "#FFB999"}}
                >
                    Sou um apoiador
                </Button>
            </Link>
            <Link to={"/missionarySignPage"}>
                <Button 
                width={{ base: "100%", md: "250px" }}
                height={{ base: "55px", md: "auto" }}
                backgroundColor={"#FFDDCB"}
                border={"5px solid black"}
                borderRadius={50}
                fontSize="20px"
                fontFamily={"Inter, sans-serif"}
                fontWeight={"bold"}
                color="black"
                padding={"10px 20px"}
                display={{ base: "block", md: "inline-block" }}
                _hover={{background: "#FFB999"}}
                >
                    Sou um missionário
                </Button>
            </Link>    
            <Link to={"/socialProjectSignPage"}>
                <Button
                width={{ base: "100%", md: "250px" }}
                height={{ base: "55px", md: "auto" }}
                backgroundColor={"#FFDDCB"}
                border={"5px solid black"}
                borderRadius={50}
                fontSize="20px"
                fontFamily={"Inter, sans-serif"}
                fontWeight={"bold"}
                color="black"
                padding={"10px 20px"}
                display={{ base: "block", md: "inline-block" }}
                _hover={{background: "#FFB999"}}
                >
                    Sou um projeto social
                </Button>
            </Link>
            
        </VStack>
    </Box>
  )
}

export default LandingPageButtons