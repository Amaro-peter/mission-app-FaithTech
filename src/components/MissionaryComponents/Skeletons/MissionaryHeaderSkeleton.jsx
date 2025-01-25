import { Box, Button, Flex, VStack, SkeletonCircle, Skeleton, Text, Spacer, Image, Avatar, AvatarGroup, Divider, Container, useMediaQuery } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import useAuthStore from '../../../store/authStore';

function MissionaryHeaderSkeleton() {
  const[fontSize, setFontSize] = useState("16px");
  const [isLargerThan360] = useMediaQuery("(min-width: 371px)");
  const authUser = useAuthStore(state => state.user);


  useEffect(() => {
    const handleResize = () => {
      const zoomLevel = 1;
      const width = window.innerWidth;
      let newFontSize;

      if(width <= 320){
        newFontSize = 10 * zoomLevel + 'px' 
      } else if (width < 480) {
        newFontSize = 12 * zoomLevel + 'px';
      } else if (width < 768) {
        newFontSize = 14 * zoomLevel + 'px';
      } else if (width < 1024) {
        newFontSize = 16 * zoomLevel + 'px';
      } else {
        newFontSize = 18 * zoomLevel + 'px';
      }

      setFontSize(newFontSize)
    }

    window.addEventListener('resize', handleResize);
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <Container
    maxW={"container.lg"}
    >
      <Flex
        width={{base: "100%", md: "80%"}}
        
        bg="white"
        color="black"
        border="1px solid gray.500"
        borderRadius={10}
        p={4}
        boxShadow="md"
        direction={"column"}
        mx={"auto"}
      >
        <Flex
        gap={{base: 4, md: 8}}
        py={10}
        direction={{base: "column", sm: "row"}}
        justifyContent={"center"}
        alignItems={"center"}
        >
            <SkeletonCircle size={"24"} />
            <VStack 
            alignItems={{base: "center", sm: "flex-start"}}
            gap={2}
            mx={"auto"}
            flex={1}
            >
            <Skeleton height="12px" width="150px" />
            <Skeleton height="12px" width="100px" />
            </VStack> 
        </Flex>
      </Flex>
    </Container>
  )
}

export default MissionaryHeaderSkeleton;