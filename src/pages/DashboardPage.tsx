import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, LinearProgress, Box } from '@mui/material';
import { getStatistics } from '../api';

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getStatistics()
      .then(data => setStats(data))
      .catch(() => setError('Failed to load statistics'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }} className="fade-in">
      <Typography variant="h3" fontWeight={900} gutterBottom sx={{ color: '#ffd600', textShadow: '0 2px 12px #512da899' }}>Progress Dashboard</Typography>
      {loading ? (
        <Typography sx={{ color: '#ffd600', width: '100%', textAlign: 'center', mt: 4 }}>Loading statistics...</Typography>
      ) : error ? (
        <Typography sx={{ color: 'red', width: '100%', textAlign: 'center', mt: 4 }}>{error}</Typography>
      ) : stats ? (
        <>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4 }}>
            <Box sx={{ width: { xs: '100%', md: '50%' }, p: 2 }}>
              <Paper elevation={4} sx={{ p: 4, borderLeft: '6px solid #ffd600', minHeight: 180 }}>
                <Typography variant="h6" color="primary">Year-wise Milestones</Typography>
                <LinearProgress variant="determinate" value={stats.yearProgress || 0} sx={{ my: 2, height: 12, borderRadius: 6, background: '#2c2250' }} />
                <Typography variant="caption">{stats.yearProgress || 0}% completed</Typography>
              </Paper>
            </Box>
            <Box sx={{ width: { xs: '100%', md: '50%' }, p: 2 }}>
              <Paper elevation={4} sx={{ p: 4, borderLeft: '6px solid #512da8', minHeight: 180 }}>
                <Typography variant="h6" color="primary">Topic-wise Scorecard</Typography>
                <Box sx={{ my: 2 }}>
                  {stats.topicScores && Object.entries(stats.topicScores).map(([topic, score]: any) => (
                    <Typography key={topic} sx={{ color: '#ffd600', fontWeight: 600 }}>{topic}: {score}%</Typography>
                  ))}
                </Box>
              </Paper>
            </Box>
          </Box>
          <Paper elevation={4} sx={{ p: 4, mt: 4, borderLeft: '6px solid #ffd600' }}>
            <Typography variant="h6" color="primary">Personalized Suggestions</Typography>
            <Typography sx={{ color: '#ffd600', fontWeight: 600 }}>Next topic to master: {stats.nextTopic || 'N/A'}</Typography>
            <Typography sx={{ color: '#ffd600b0' }}>Current streak: {stats.streak || 0} days</Typography>
          </Paper>
        </>
      ) : null}
    </Container>
  );
};

export default DashboardPage;
