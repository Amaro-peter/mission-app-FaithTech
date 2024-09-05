import { Box, Flex, Link, Image } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"

function NavBar() {
  return (
    <Box
    width={"full"}
    borderBottom={"1px solid"}
    borderColor={"blackAlpha.600"}
    px={2}
    position={"sticky"}
    top={0}
    py={{base: 1, md: 4}}
    >
        <Flex 
        direction={"column"} 
        gap={10} 
        w={"full"} 
        height={"full"}
        >
            <Link 
            to={"/landingPage"} 
            as={RouterLink}
            pl={2}  
            cursor={"pointer"}
            display={{base: "none", md: "block"}}
            >
                <Image src="./Mission.png" 
                width={"15%"}
                height={"auto"}
                alt="Telefone img"
                />
            </Link>
            <Link 
            to={"/landingPage"} 
            as={RouterLink}  
            cursor={"pointer"}
            display={{base: "block", md: "none"}}
            >
                <Image src="./Mission.png" 
                width={"40%"}
                height={"auto"}
                alt="Telefone img"
                />
            </Link>
        </Flex>     
    </Box>
  )
}

export default NavBar