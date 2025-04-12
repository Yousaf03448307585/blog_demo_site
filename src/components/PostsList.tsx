'use client';

import { Grid, Typography, Box } from '@mui/material';
import PostCard from './PostCard';
import { Post } from '@/lib/types';

interface PostsListProps {
  posts: Post[];
}

export default function PostsList({ posts }: PostsListProps) {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        All Posts
      </Typography>
      <Grid container spacing={3} columns={{ xs: 12, sm: 12, md: 12 }}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Grid
              key={post.id}
              size={{ xs: 12, sm: 6, md: 4 }}
              sx={{ display: 'flex' }}
            >
              <PostCard post={post} />
            </Grid>
          ))
        ) : (
          <Grid size={{ xs: 12 }}>
            <Typography>No posts found.</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}