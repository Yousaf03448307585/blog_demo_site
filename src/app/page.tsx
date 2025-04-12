'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    //######################################## Redirect to the posts page ###############################
    router.push('/posts');
  }, [router]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
      }}
    >
      <CircularProgress size={50} thickness={4} />
      <Typography sx={{ mt: 4 }} variant="h6">
        Redirecting to blog posts...
      </Typography>
    </Box>
  );
}