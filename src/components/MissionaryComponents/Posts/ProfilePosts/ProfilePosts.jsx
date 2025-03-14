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
import useDeletePost from '../../../../hooks/useDeletePost';

const PAGINATION_LIMIT = 4;

function ProfilePosts() {
  const { myPosts } = useTab();

  const {
    postsData,
    addPost,
    postCount,
  } = useContext(PostDataContext);

  const userProfile = useUserProfile();

  const { getUserPosts, isLoading } = useGetUserPosts();

  const {deletePost, isDeleting} = useDeletePost();

  const [hasMore, setHasMore] = useState(localStorage.getItem("hasMore") === "true");

  const isFirstTime = localStorage.getItem("hasVisitedMeuFeed") !== "true";

  const [loadedImages, setLoadedImages] = useState(0);

  const [showLoadMore, setShowLoadMore] = useState(false);

  {/*const [isDeleting, setIsDeleting] = useState(false);*/}

  useEffect(() => {
    const fetchData = async () => {
      const hasVisited = localStorage.getItem("hasVisitedMeuFeed");
      if (myPosts === 'Meu feed' && !hasVisited) {
        localStorage.setItem("hasVisitedMeuFeed", "true");
        const result = await getUserPosts(userProfile, addPost);
        if(result === false) {
          const noPostsFlag = localStorage.getItem("noPosts");
          if(noPostsFlag === null) {
            localStorage.setItem("noPosts", "true");
          }
        }
        setHasMore(localStorage.getItem("hasMore") === "true");
      }
    };
    fetchData();
  }, []);

  const noPosts = localStorage.getItem("noPosts") === "true";

  const noPostFound = !isLoading && noPosts;

  console.log(noPostFound);

  const handleLoadMore = async () => {
    try {
        document.body.style.overflow = "hidden";
        localStorage.setItem("loadMoreData", "true");
        setShowLoadMore(false);
        const result = await getUserPosts(userProfile, addPost, postsData, postCount);
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
      if (newCount === PAGINATION_LIMIT) {
        // All images are loaded, wait 1 second before showing the button
        setTimeout(() => {
          setShowLoadMore(true);
        }, 500);
      }
      return newCount;
    });
  }, [postsData.length]);

  {/*const handleDeleteStatusChange = useCallback((isDeleting) => {
    setIsDeleting(isDeleting);
  });*/}

  const renderPosts = () => (
    <>
      {postsData.map((post, idx) => (
        <ProfilePost 
          key={`${isFirstTime ? 'initial' : 'loaded'}-${idx}`} 
          post={post}
          index={idx} 
          onImageLoad={handleImageLoad}
          deletePost={deletePost}
          isDeleting={isDeleting}
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

  return (
    <Container maxW="container.lg">
      
      {noPostFound && <NoPostsFound />}
      {!noPostFound && !isLoading && !isDeleting && isFirstTime && renderPosts()}
      {!noPostFound && !isLoading && !isDeleting && !isFirstTime && renderPosts()}

      { (isLoading || isDeleting) &&
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