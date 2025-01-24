import { Container, Flex } from '@chakra-ui/react';
import React from 'react';
import Project from './Project/Project';
import FeedPost from '../../MissionaryComponents/Posts/FeedPosts/FeedPost';

function Projects() {
  return (
    <Container
    maxW={"container.lg"}
    >
        <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={3}
        >
            <Project source={"./Video_Youtube.png"} />
            <Project source={"/Kids.png"} />
        </Flex>
    </Container>
  )
}

export default Projects;