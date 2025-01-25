import { Container } from '@chakra-ui/react';
import React from 'react';
import FeedPost from './FeedPost';

function FeedPosts() {

  {/*const { userProfile, fetchPosts, clearPosts } = useUserProfileStore((state) => ({
    userProfile: state.userProfile,
    fetchPosts: state.fetchPosts,
    clearPosts: state.clearPosts
  }));

  useEffect(() => {
    clearPosts();
    fetchPosts();
  }, [clearPosts, fetchPosts]);

  const loadMorePosts = () => {
    fetchPosts();
  };*/}

  return (
    <Container
    maxW={"container.lg"}
    >
        <FeedPost source={"./alimentos.jpg"} />
        <FeedPost source={"./igreja.png"} />

        {/* <Button onClick={loadMorePosts} mt={4}>Load More</Button> */}
    </Container>
  )
}

export default FeedPosts;