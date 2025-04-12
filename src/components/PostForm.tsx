import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { NewPost } from '@/lib/types';

interface PostFormProps {
  onSubmit: (post: NewPost) => Promise<NewPost>;
  isLoading: boolean;
  isError: boolean;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit, isLoading, isError }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<NewPost>({
    title: '',
    body: '',
    author: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author name is required';
    }

    if (!formData.body.trim()) {
      newErrors.body = 'Content is required';
    } else if (formData.body.length < 10) {
      newErrors.body = 'Content must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // ####################################### Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    if (validateForm()) {
      try {
        await onSubmit(formData);
        setShowSuccess(true);
        setFormData({ title: '', body: '', author: '' });
        setSubmitted(false);
        
        //############################################# Navigate to posts page after successful submited it  
        setTimeout(() => {
          router.push('/posts');
        }, 1500);
      } catch (error) {
        console.error('Error submitting post:', error);
      }
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, sm: 4 },
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
        Create a New Post
      </Typography>
      <Typography color="text.secondary" paragraph>
        Share your thoughts with the world. Fill out the form below to create a new blog post.
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off" sx={{ mt: 3 }}>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.title && submitted}
          helperText={submitted && errors.title}
        
        />
        
        <TextField
          label="Author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.author && submitted}
          helperText={submitted && errors.author}
      
        />
        
        <TextField
          label="Content"
          name="body"
          value={formData.body}
          onChange={handleChange}
          fullWidth
          multiline
          rows={6}
          margin="normal"
          variant="outlined"
          error={!!errors.body && submitted}
          helperText={submitted && errors.body}
          
        />

        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={isLoading}
            sx={{ 
              py: 1.5,
              px: 4,
              fontSize: '1rem',
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Publish Post'
            )}
          </Button>
          
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            onClick={() => router.push('/posts')}
            sx={{ 
              py: 1.5,
              px: 4,
              fontSize: '1rem',
            }}
          >
            Cancel
          </Button>
        </Box>
        
        {isError && (
          <Alert severity="error" sx={{ mt: 3 }}>
            There was an error publishing your post. Please try again.
          </Alert>
        )}
      </Box>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowSuccess(false)} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          Post published successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default PostForm;