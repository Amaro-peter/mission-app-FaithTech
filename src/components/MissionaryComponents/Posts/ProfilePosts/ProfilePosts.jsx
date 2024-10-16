import { Container } from '@chakra-ui/react'
import React from 'react'
import ProfilePost from './ProfilePost'

function ProfilePosts() {
  return (
    <Container
    maxW={"container.lg"}
    >
        <ProfilePost source={"./Kids.png"} />
        <ProfilePost source={"./igreja.png"} />
    </Container>
  )
}

export default ProfilePosts
