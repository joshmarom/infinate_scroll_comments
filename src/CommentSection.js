import React from 'react';
import {Heading, Stack} from '@chakra-ui/react';
import Comments from './Comments';
import CommentForm from './CommentForm';

function CommentSection() {
  return (
      <Stack spacing={4}>
          <CommentForm />
          <Heading as="h3" size="lg">Comments</Heading>
          <Comments />
      </Stack>
  );
}

export default CommentSection;