import { Flex, Stack, FormControl, FormLabel, Input, Textarea, Button, Center, Image, Skeleton, SkeletonText } from '@chakra-ui/react';

function EditProjectSkeleton() {
  return (
    <Flex
      width={{ base: "100%", md: "80%" }}
      bg="white"
      color="black"
      border="1px solid gray.500"
      borderRadius={10}
      p={4}
      boxShadow="md"
      direction={"column"}
      mx={"auto"}
    >
      <Stack spacing={4} w={"full"} p={6} my={0}>
        <Skeleton height="40px" />
        
        <FormControl>
          <FormLabel>Título</FormLabel>
          <Skeleton height="20px" />
        </FormControl>

        <FormControl>
          <FormLabel>Link de vídeo para o Youtube</FormLabel>
          <FormLabel>(copie e cole o link)</FormLabel>
          <Skeleton height="20px" />
        </FormControl>

        <FormControl>
          <FormLabel>Descrição</FormLabel>
          <SkeletonText mt="4" noOfLines={6} spacing="4" />
        </FormControl>

        <FormControl>
          <Stack direction={"column"} spacing={6}>
            <Center>
              <Skeleton height="40px" width="100%" />
            </Center>
            <Center>
              <Skeleton height="200px" width="50%" />
            </Center>
          </Stack>
        </FormControl>

        <Stack spacing={6} direction={["column", "row"]}>
          <Skeleton height="40px" width="full" />
          <Skeleton height="40px" width="full" />
          <Skeleton height="40px" width="full" />
        </Stack>
      </Stack>
    </Flex>
  );
}

export default EditProjectSkeleton;