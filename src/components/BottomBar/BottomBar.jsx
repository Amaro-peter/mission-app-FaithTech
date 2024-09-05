import { Box, Flex, Link, Image } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"

function BottomBar() {
  return (
    <Box
    width={"full"}
    borderBottom={"1px solid"}
    borderColor={"blackAlpha.600"}
    px={2}
    position={"fixes"}
    bottom={0}
    py={{base: 2}}
    display={{base: "block", md: "none"}}
    >
        <Flex 
        direction={"column"} 
        gap={10} 
        w={"full"} 
        height={"full"}
        >
            
        </Flex>     
    </Box>
  )
}

export default BottomBar