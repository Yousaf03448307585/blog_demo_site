'use client';

import React from 'react';
import { Box } from '@mui/material';
import PostForm from '@/components/PostForm';
import { useAddPostMutation } from '@/lib/store';
import { NewPost } from '@/lib/types';

export default function AddPostPage() {
  const [addPost, { isLoading, isError }] = useAddPostMutation();
  
  const handleSubmit = async (post: NewPost) => {
    return await addPost(post).unwrap();
  };
  
  return (
    <Box>
      <PostForm onSubmit={handleSubmit} isLoading={isLoading} isError={isError} />
    </Box>
  );
}
