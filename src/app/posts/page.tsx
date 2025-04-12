'use client';

import React, { useState } from 'react';
import {
  Typography,
  Box,
  CircularProgress,
  Alert,
  Pagination,
  Paper,
  InputAdornment,
  TextField,
  Grid
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PostCard from '@/components/PostCard';
import { useGetPostsQuery } from '@/lib/store';
import { Post } from '@/lib/types';

export default function PostsPage() {
  const { data: posts, isLoading, isError, error } = useGetPostsQuery();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  //############################### Memoized filtered posts ##############################
  const filteredPosts = React.useMemo(() => {
    if (!posts) return [];
    const query = search.toLowerCase();
    return posts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.body.toLowerCase().includes(query) ||
      (post.author && post.author.toLowerCase().includes(query))
    );
  }, [posts, search]);

  //#################### Pagination calculations #######################
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const pageStart = (currentPage - 1) * postsPerPage;
  const displayedPosts = filteredPosts.slice(pageStart, pageStart + postsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
//   const handlePageChange = (_event: any, value: number) => {
//     setCurrentPage(value);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

  return (
    <Box component="main" sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h3" 
          sx={{ fontWeight: 700, mb: 1 }}
        >
          Blog Posts
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Explore the latest articles and insights from our blog.
        </Typography>
      </Box>

      <Paper
        sx={{
          p: 2,
          mb: 4,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <TextField
          label="Search posts"
          size="small"
          fullWidth
          sx={{ maxWidth: { sm: 300 } }}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        
        <Typography variant="body2" color="text.secondary">
          Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
        </Typography>
      </Paper>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress size={60} thickness={4} />
        </Box>
      ) : isError ? (
        <Alert severity="error" sx={{ my: 4 }}>
          {error instanceof Error ? error.message : 'There was an error loading posts. Please try again later.'}
        </Alert>
      ) : displayedPosts.length === 0 ? (
        <Alert severity="info" sx={{ my: 4 }}>
          No posts found matching your search. Try a different query.
        </Alert>
      ) : (
        <>
          <Grid container spacing={3} columns={{ xs: 12, sm: 12, md: 12 }}>
            {displayedPosts.map((post: Post) => (
              <Grid 
                key={post.id}
                size={{ xs: 12, sm: 6, md: 4 }}
                sx={{ display: 'flex' }}
              >
                <PostCard post={post} />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              <Pagination 
                count={totalPages} 
                page={currentPage} 
                onChange={handlePageChange} 
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}