
'use client';

import React from 'react';
import { useGetPostQuery } from '@/lib/store';
import PostView from '@/components/PostView';

export default function PostClientContent({ id }: { id: string }) {
  const postId = parseInt(id, 10);
  const { data: post, isLoading, isError } = useGetPostQuery(postId);
  
  return <PostView post={post} isLoading={isLoading} isError={isError} />;
}





