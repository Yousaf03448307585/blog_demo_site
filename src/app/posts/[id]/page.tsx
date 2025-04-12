import React from 'react';
import { Box } from '@mui/material';
import PostClientContent from './PostClientView';

type Props = {
  params: { id: string };
};

export async function generateStaticParams() {

  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await response.json();
  return posts.map((post: { id: number }) => ({ id: post.id.toString() }));
}

export default async function Page({ params }: Props) {
  return (
    <Box>
      <PostClientContent id={params.id} />
    </Box>
  );
}