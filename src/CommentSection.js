import React from 'react';
import {Heading, Stack} from '@chakra-ui/react';
import Comments from './Comments';
import CommentForm from './CommentForm';

function CommentSection() {
  return (
      <Stack spacing={4}>
          <Heading as="h3" size="md">Comments</Heading>
          <CommentForm />
          <Comments />
      </Stack>
  );
}

export default CommentSection;