import { Box, Flex } from "@chakra-ui/react"


function PageLayout({children}) {
  return (
    <Flex>
        <Box flex={1} w={{base:"calc(100%-70px", md:"calc(100% -240px"}} mx={"auto"}>
            {children}
        </Box>
    </Flex>
  )
}

export default PageLayout