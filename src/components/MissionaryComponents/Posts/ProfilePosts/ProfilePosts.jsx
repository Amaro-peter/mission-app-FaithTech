import {
  Box,
  Container,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Skeleton,
  Button,
} from '@chakra-ui/react';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import ProfilePost from './ProfilePost';
import useGetUserPosts from '../../../../hooks/useGetUserPosts';
import { PostDataContext } from '../../../../context/PostDataContext';
import NoPostsFound from '../NoPost/NoPostsFound';
import { useUserProfile } from '../../../../context/UserProfileContext';
import { useTab } from '../../../../context/TabContext';

function ProfilePosts() {
  const { myPosts } = useTab();
  const {
    postsData,
    addPost
  } = useContext(PostDataContext);

  const userProfile = useUserProfile();

  const { getUserPosts, isLoading } = useGetUserPosts();

  const [hasMore, setHasMore] = useState(localStorage.getItem("hasMore") === "true");

  const isFirstTime = localStorage.getItem("hasVisitedMeuFeed") !== "true";

  const noPosts = localStorage.getItem("noPosts") === "true";

  const noPostFound = !isLoading && noPosts;

  const [loadedImages, setLoadedImages] = useState(0);

  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const hasVisited = localStorage.getItem("hasVisitedMeuFeed");
      if (myPosts === 'Meu feed' && !hasVisited) {
        localStorage.setItem("hasVisitedMeuFeed", "true");
        await getUserPosts(userProfile, addPost);
        setHasMore(localStorage.getItem("hasMore") === "true");
      }
    };
    fetchData();
  }, []);

  const handleLoadMore = async () => {
    try {
        document.body.style.overflow = "hidden";
        localStorage.setItem("loadMoreData", "true");
        setShowLoadMore(false);
        const result = await getUserPosts(userProfile, addPost);
        if (result !== false) {
            setHasMore(localStorage.getItem("hasMore") === "true");
        }
    } catch (error) {
        console.error("Error loading more data:", error);
    } finally {
        document.body.style.overflow = "auto";
        localStorage.setItem("loadMoreData", "false");
    }
  };


  // Reset loadedImages when new posts are loaded
  useEffect(() => {
    setLoadedImages(0);
  }, [postsData.length]);

  // Handle image load completion
  const handleImageLoad = useCallback(() => {
    setLoadedImages(prev => {
      const newCount = prev + 1;
      if (newCount === 4) {
        // All images are loaded, wait 1 second before showing the button
        setTimeout(() => {
          setShowLoadMore(true);
        }, 500);
      }
      return newCount;
    });
  }, [postsData.length]);

  // Modify the render logic for posts
  const renderPosts = () => (
    <>
      {postsData.map((post, idx) => (
        <ProfilePost 
          key={`${isFirstTime ? 'initial' : 'loaded'}-${idx}`} 
          post={post}
          onImageLoad={handleImageLoad}
        />
      ))}
      { showLoadMore && hasMore && (
        <Flex
          width={{ base: '100%', md: '80%' }}
          bg="white"
          color="black"
          border="1px solid gray.500"
          borderRadius={10}
          p={4}
          gap={1}
          boxShadow="md"
          direction="column"
          mx="auto"
          mb={4}
          align="center"
        >
          <Button
            onClick={handleLoadMore}
            isLoading={isLoading}
            backgroundColor={"#FFCCB3"}
            _hover={{background: "#FFB999"}}
            isDisabled={isLoading}
          >
            Carregar Mais
          </Button>
        </Flex>
      )}
    </>
  );


  if (noPostFound) return <NoPostsFound />;

  return (
    <Container maxW="container.lg">
      {!isLoading && isFirstTime && renderPosts()}
      {!isLoading && !isFirstTime && renderPosts()}

      {isLoading &&
        [0, 1, 2, 3].map((_, idx) => (
          <Flex
            key={`skeleton-${idx}`}
            width={{ base: '100%', md: '80%' }}
            bg="white"
            color="black"
            border="1px solid gray.500"
            borderRadius={10}
            p={4}
            gap={1}
            boxShadow="md"
            direction="column"
            mx="auto"
            mb={4}
          >
            <Flex gap={2}>
              <SkeletonCircle size="10" />
              <SkeletonText noOfLines={1} width="40%" />
            </Flex>
            <Skeleton w="full">
              <Box h="300px"></Box>
            </Skeleton>
          </Flex>
        ))}
    </Container>
  );
}

export default ProfilePosts;