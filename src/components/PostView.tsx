import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Chip,
  Skeleton,
  Button,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Post } from '@/lib/types';
import Link from 'next/link';

interface PostViewProps {
  post?: Post;
  isLoading: boolean;
  isError: boolean;
}

const PostView: React.FC<PostViewProps> = ({ post, isLoading, isError }) => {
  //######################################## Generate random date for demo purposes or for aims to know the post date ###########################
  const randomDate = new Date();
  randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 30));

  if (isError) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center', my: 4 }}>
        <Typography variant="h5" color="error" gutterBottom>
          Error loading post
        </Typography>
        <Typography variant="body1" paragraph>
          We couldn&apos;t load the post you requested. It may not exist or there might be a connection issue.
        </Typography>
        <Link href="/posts" passHref legacyBehavior>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
          >
            Back to Posts
          </Button>
        </Link>
      </Paper>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ my: 4 }}>
        <Skeleton variant="text" height={60} sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Skeleton variant="rounded" width={120} height={30} />
          <Skeleton variant="rounded" width={150} height={30} />
        </Box>
        <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} />
        <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" height={20} width="60%" />
      </Box>
    );
  }

  if (!post) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center', my: 4 }}>
        <Typography variant="h5" gutterBottom>
          Post not found
        </Typography>
        <Link href="/posts" passHref legacyBehavior>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
          >
            Back to Posts
          </Button>
        </Link>
      </Paper>
    );
  }

  //#################### Function to format post body with better paragraphs ###################
  const formatCardBody = (text: string) => {
    
    const sentences = text.split(/\.\s+/);
    
    const paragraphs: string[] = [];
    for (let i = 0; i < sentences.length; i += Math.floor(Math.random() * 3) + 3) {
      const paragraph = sentences.slice(i, i + Math.floor(Math.random() * 3) + 3).join('. ');
      if (paragraph) paragraphs.push(paragraph + (paragraph.endsWith('.') ? '' : '.'));
    }
    return paragraphs;
  };

  const paragraphs = formatCardBody(post.body);

  return (
    <Box sx={{ my: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Link href="/posts" passHref legacyBehavior>
          <Button
            sx={{ mb: 2 }}
            variant="text"
            startIcon={<ArrowBackIcon />}
          >
            Back to all posts
          </Button>
        </Link>
        
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2, flexWrap: 'wrap' }}>
          <Chip
            icon={<PersonIcon />}
            label={post.author}
            variant="outlined"
          />
          <Chip
            icon={<AccessTimeIcon />}
            label={randomDate.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
            variant="outlined"
          />
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />
      
      <Box sx={{ typography: 'body1', lineHeight: 1.7 }}>
        {paragraphs.map((paragraph, i) => (
          <Typography key={i} paragraph>
            {paragraph}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default PostView;