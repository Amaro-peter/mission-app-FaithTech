import React from 'react';
import { Box, Flex, SkeletonCircle, SkeletonText, Skeleton } from '@chakra-ui/react';

const ProfilePostsSkeleton = () => {
  return (
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
    >
      <Flex gap={2}>
        <SkeletonCircle size="10" />
        <SkeletonText noOfLines={1} width="40%" />
      </Flex>
      <Skeleton w="full">
        <Box h="300px"></Box>
      </Skeleton>
    </Flex>
  );
};

export default ProfilePostsSkeleton;