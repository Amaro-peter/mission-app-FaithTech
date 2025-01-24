import { Container } from '@chakra-ui/react';
import React from 'react';
import FeedPost from '../../MissionaryComponents/Posts/FeedPosts/FeedPost';

function FeedPosts() {
  return (
    <Container
    maxW={"container.lg"}
    >
        <FeedPost source={"./alimentos.jpg"} />
        <FeedPost source={"./igreja.png"} />
    </Container>
  )
}

export default FeedPosts;