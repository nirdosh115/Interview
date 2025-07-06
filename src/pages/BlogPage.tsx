import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';
import { getBlogPosts } from '../api';

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getBlogPosts()
      .then(data => setPosts(data))
      .catch(() => setError('Failed to load blog posts'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>Blog & Updates</Typography>
      <Paper elevation={3} sx={{ p: 4 }}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <List>
            {posts.map((post, idx) => (
              <ListItem key={idx} alignItems="flex-start">
                <ListItemText
                  primary={post.title}
                  secondary={<>
                    <Typography component="span" variant="body2" color="text.primary">{post.author}</Typography>
                    {` — ${post.date}`}
                  </>}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default BlogPage;
