import React from 'react';
import {Heading, Stack} from '@chakra-ui/react';
import Comments from './Comments';

function CommentSection() {
  return (
      <Stack spacing={4}>
          <Heading as="h3" size="md">Comments</Heading>
          <Comments />
      </Stack>
  );
}

export default CommentSection;