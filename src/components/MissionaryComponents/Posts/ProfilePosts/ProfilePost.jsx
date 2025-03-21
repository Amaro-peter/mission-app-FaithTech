import {
  Box,
  Flex,
  SkeletonCircle,
  Skeleton,
  SkeletonText,
  Text,
} from '@chakra-ui/react';
import PostHeader from "../PostHeader/PostHeader";
import PostFooter from "../PostFooter/PostFooter";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProfilePost({ post, index, onImageLoad, deletePost, isDeleting, setDeleteTrigger }) {

  const [isExpanded, setIsExpanded] = useState(false);
  const description = post.caption;
  const truncatedDescription = description.length > 300 ? description.slice(0, 300) + '...' : description;

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    onImageLoad && onImageLoad();
  };

  {/*useEffect(() => {
    onDeleteStatusChange && onDeleteStatusChange(isDeleting);
  }, [isDeleting, onDeleteStatusChange]);*/}
  
  useEffect(() => {
    if(post.imageURL) {
      const img = new Image();
      img.src = post.imageURL;
      img.onload = handleImageLoad;
    } else {
      handleImageLoad();
    }
  }, [post?.imageURL]);

  if(!imageLoaded) {
    return(
      <Flex
      width={{ base: "100%", md: "80%" }}
      bg="white"
      color="black"
      border="1px solid gray.500"
      borderRadius={10}
      p={4}
      gap={1}
      boxShadow="md"
      direction={"column"}
      mx={"auto"}
      mb={4}
      >
        <Flex
        gap={2}
        >
          <SkeletonCircle size='10' />
          <SkeletonText noOfLines={1} width={"40%"} />
        </Flex>
        <Skeleton w={"full"}>
          <Box h={"300px"}>
          </Box>
        </Skeleton>
      </Flex>
    );
  }

  return (
    <Flex
      width={{ base: "100%", md: "80%" }}
      bg="white"
      color="black"
      border="1px solid gray.500"
      borderRadius={10}
      p={4}
      gap={1}
      boxShadow="md"
      direction={"column"}
      mx={"auto"}
      mb={4}
    >
      <PostHeader 
      deletePost={deletePost} 
      isDeleting={isDeleting} 
      index={index} 
      post={post}
      setDeleteTrigger={setDeleteTrigger}
      />
      <Flex mt={2} direction={"column"} gap={3}>
        <Text
          fontSize={"md"}
          fontFamily={"Inter, sans-serif"}
          whiteSpace="normal"
          textAlign="left"
          lineHeight="1.6"
        >
          {isExpanded ? description : truncatedDescription}
          {description.length > 300 && (
            <Link onClick = {() => setIsExpanded(!isExpanded)}>
              <Text color={"blue.500"} fontWeight={"bold"}>
                {isExpanded ? " Ler menos" : " Ler mais"}
              </Text>
            </Link>
          )}
        </Text>

        <Box
          my={2}
          borderRadius={4}
          overflow={"hidden"}
          cursor={"pointer"}
        >
          {(post && post.imageURL) ?
            <Zoom
              zoomMargin={10} // Adjusts the margin around the zoomed image
              overlayBgColorEnd="rgba(0, 0, 0, 0.85)" // Smooth dark overlay for better focus
              transitionDuration={300} // Smooth zoom animation duration
            >
              <img
                src={post.imageURL}
                alt="Missionary"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '4px',
                }}
                loading='lazy'
              />
            </Zoom> : null}
        </Box>
      </Flex>
      <PostFooter />


      
    </Flex>
  );
}

export default ProfilePost;

