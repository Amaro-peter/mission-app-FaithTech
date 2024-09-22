import { Container } from '@chakra-ui/react'
import React from 'react'
import FeedPost from './FeedPost'

function FeedPosts() {
  return (
    <Container
    maxW={"container.lg"}
    >
        <FeedPost source={"./Kids.png"} />
        <FeedPost source={"./igreja.png"} />
    </Container>
  )
}

export default FeedPosts
