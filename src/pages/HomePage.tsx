import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import AstroButton from '../components/AstroButton';

const HomePage: React.FC = () => (
  <Container maxWidth="lg" sx={{ py: 8 }} className="fade-in">
    <Box textAlign="center" mb={8}>
      <Typography variant="h2" fontWeight={900} gutterBottom sx={{ color: '#ffd600', textShadow: '0 4px 24px #512da899' }}>
        Ace Java interviews at every stage of your career
      </Typography>
      <Typography variant="h5" color="#ffd600b0" gutterBottom sx={{ mb: 4 }}>
        The most advanced, interactive, and personalized Java interview preparation platform.
      </Typography>
      <AstroButton variant="contained" size="large" href="/tracks" sx={{ m: 2, px: 5, py: 1.5, fontSize: 22, borderRadius: 8, boxShadow: '0 2px 16px #ffd60055' }}>Start Learning</AstroButton>
      <AstroButton variant="outlined" size="large" href="/blog" sx={{ m: 2, px: 5, py: 1.5, fontSize: 22, borderRadius: 8, color: '#ffd600', borderColor: '#ffd600', boxShadow: '0 2px 16px #512da855' }}>View Roadmaps</AstroButton>
    </Box>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
      <Box sx={{ width: { xs: '100%', md: '50%' }, p: 2 }}>
        <Paper elevation={4} sx={{ p: 4, minHeight: 180, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h6" color="primary" sx={{ mb: 1 }}>Trending Topic</Typography>
          <Typography variant="h5" sx={{ color: '#ffd600', fontWeight: 700 }}>Java 21 Features for 2025 Interviews</Typography>
          <Typography color="#ffd600b0">Stay ahead with the latest Java updates and interview trends.</Typography>
        </Paper>
      </Box>
      <Box sx={{ width: { xs: '100%', md: '50%' }, p: 2 }}>
        <Paper elevation={4} sx={{ p: 4, minHeight: 180, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h6" color="primary" sx={{ mb: 1 }}>Testimonial</Typography>
          <Typography variant="body1" sx={{ color: '#ffd600', fontWeight: 600 }}>“This platform helped me crack my dream job at Google!”</Typography>
          <Typography variant="caption" sx={{ color: '#ffd600b0' }}>- Priya S., SDE2</Typography>
        </Paper>
      </Box>
    </Box>
  </Container>
);

export default HomePage;
