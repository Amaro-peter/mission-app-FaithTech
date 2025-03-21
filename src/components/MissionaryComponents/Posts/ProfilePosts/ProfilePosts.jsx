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
  } = useContext(PostDataContext);

  let postCount = localStorage.getItem("postCount");

  const userProfile = useUserProfile();

  const { getUserPosts, isLoading } = useGetUserPosts();

  const {deletePost, isDeleting} = useDeletePost();

  const [hasMore, setHasMore] = useState(true);

  const [deleteTrigger, setDeleteTrigger] = useState(false);

  const isFirstTime = localStorage.getItem("hasVisitedMeuFeed") !== "true";

  const [loadedImages, setLoadedImages] = useState(0);

  const [showLoadMore, setShowLoadMore] = useState(true);

  const [hasMoreReady, setHasMoreReady] = useState(false);

  useEffect(() => {
    const verifyHasMore = async () => {
      try {
        const storedHasMore = localStorage.getItem("hasMore") === "true";
        
        setHasMore(storedHasMore);
        
      } catch (error) {
        console.error("Error verifying hasMore:", error);
      } finally {
        setHasMoreReady(true); // Ensure this is always set
      }
    };
  
    if (!isFirstTime) {
      verifyHasMore();
    }
  }, [deleteTrigger]);
  

  useEffect(() => {
    if (isFirstTime) {
      const fetchData = async () => {

        postCount = localStorage.getItem("postCount");
        while (isNaN(parseInt(postCount, 10))) {
          await new Promise ((resolve) => setTimeout(resolve, 10));
          postCount = localStorage.getItem("postCount");
        }

        const hasVisited = localStorage.getItem("hasVisitedMeuFeed");
        if (myPosts === 'Meu feed' && !hasVisited) {
          localStorage.setItem("hasVisitedMeuFeed", "true");
          const result = await getUserPosts(userProfile, addPost, postsData, postCount, hasVisited);
          if (result === false) {
            const noPostsFlag = localStorage.getItem("noPosts");
            if (noPostsFlag === null) {
              localStorage.setItem("noPosts", "true");
            }
            localStorage.setItem("hasMore", "false");
            setHasMore(false);
            setHasMoreReady(true);
            return;
          }

          const { size, totalPosts } = result;

          if(size === totalPosts) {
            localStorage.setItem("hasMore", "false");
            setHasMore(false);
            setHasMoreReady(true);
          } else if(size < 5 && totalPosts < 5) {
            localStorage.setItem("hasMore", "false");
            setHasMore(false);
            setHasMoreReady(true);
          } else {
            localStorage.setItem("hasMore", "true");
            setHasMore(true);
            setHasMoreReady(true);
          }
        }

      };
      fetchData();
    }
  }, []);
  

  {/*useEffect(() => {
    if (!isFirstTime) {
      const verifyHasMore = async () => {
          const storedHasMore = localStorage.getItem("hasMore") === "true";
          setHasMore(storedHasMore);

          console.log("hasMore:", hasMore);
          console.log("storedHasMore:", storedHasMore);

          await new Promise((resolve) => {
              const interval = setInterval(() => {
                  if (hasMore === storedHasMore) {
                      clearInterval(interval);
                      resolve();
                  }
              }, 10);
          });
      };

      verifyHasMore();
    }
  }, [deleteTrigger]);

  useEffect(() => {
    if (isFirstTime) {
      const fetchData = async () => {
          setHasMoreLoading(true);
          const hasVisited = localStorage.getItem("hasVisitedMeuFeed");
          if (myPosts === 'Meu feed' && !hasVisited) {
              localStorage.setItem("hasVisitedMeuFeed", "true");
              const result = await getUserPosts(userProfile, addPost, postsData, postCount);
              console.log("Aqui");
              if (result === false) {
                  const noPostsFlag = localStorage.getItem("noPosts");
                  if (noPostsFlag === null) {
                      localStorage.setItem("noPosts", "true");
                  }
              }
              const storedHasMore = localStorage.getItem("hasMore") === "true";
              setHasMore(storedHasMore);

              await new Promise((resolve) => {
                const interval = setInterval(() => {
                  if(hasMore === storedHasMore) {
                    clearInterval(interval);
                    resolve();
                  }
                }, 5);
              });
          }
          setHasMoreLoading(false);
      };
      fetchData();
    }
  }, []);

  useEffect(() => {
    const storedHasMore = localStorage.getItem("hasMore") === "true";
    setHasMore(storedHasMore);
  }, [userProfile]);*/}

  const noPosts = localStorage.getItem("noPosts") === "true";

  const noPostFound = !isLoading && noPosts;

  const handleLoadMore = async () => {
    try {
        const hasVisited = localStorage.getItem("hasVisitedMeuFeed");
        document.body.style.overflow = "hidden";
        localStorage.setItem("loadMoreData", "true");
        setShowLoadMore(false);
        const result = await getUserPosts(userProfile, addPost, postsData, postCount, hasVisited);
        if(result === false) {
          localStorage.setItem("hasMore", "false");
          setHasMore(false);
          setHasMoreReady(true);
        }
        if (result !== false) {

          const { size, totalPosts } = result;
  
          if(size === totalPosts) {
            localStorage.setItem("hasMore", "false");
            setHasMore(false);
            setHasMoreReady(true);
          } else if(size < 5 && totalPosts < 5) {
            localStorage.setItem("hasMore", "false");
            setHasMore(false);
            setHasMoreReady(true);
          } else {
            localStorage.setItem("hasMore", "true");
            setHasMore(true);
            setHasMoreReady(true);
          }
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
      if (newCount === postsData.length) {
        // All images are loaded, wait 1 second before showing the button
        setTimeout(() => {
          setShowLoadMore(true);
        }, 500);
      }
      return newCount;
    });
  }, [postsData.length]);

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
          setDeleteTrigger={setDeleteTrigger}
        />
      ))}
      {showLoadMore && hasMore && (
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

      {!noPostFound && 
      !isLoading && 
      !isDeleting &&
      hasMoreReady && 
      renderPosts()}

      { (isLoading || isDeleting || !hasMoreReady) &&
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