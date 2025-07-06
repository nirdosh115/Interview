import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, CssBaseline, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemButton, ListItemText, IconButton, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Chip, Tabs, Tab, Paper, Tooltip, useTheme, ThemeProvider, createTheme, Switch } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import QuizIcon from '@mui/icons-material/Quiz';
import BarChartIcon from '@mui/icons-material/BarChart';
import CodeIcon from '@mui/icons-material/Code';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { styled } from '@mui/material/styles';
import MonacoEditor from '@monaco-editor/react';
import './App.css';
import HomePage from './pages/HomePage';
import TracksPage from './pages/TracksPage';
import TopicDeepDivePage from './pages/TopicDeepDivePage';
import CodingPracticePage from './pages/CodingPracticePage';
import MockInterviewPage from './pages/MockInterviewPage';
import ResumeSoftSkillsPage from './pages/ResumeSoftSkillsPage';
import SystemDesignPage from './pages/SystemDesignPage';
import DashboardPage from './pages/DashboardPage';
import BlogPage from './pages/BlogPage';
import NotFoundPage from './pages/NotFoundPage';
import FeedbackPage from './pages/FeedbackPage';
import InterviewExperiencePage from './pages/InterviewExperiencePage';
import UserNotesPage from './pages/UserNotesPage';
import CustomTagsPage from './pages/CustomTagsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuthStore } from './services/authService';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Types
interface Topic {
  id: number;
  name: string;
  description: string;
}
interface Question {
  id: number;
  title: string;
  content: string;
  answer: string;
  explanation: string;
  difficulty: string;
  topicId: number;
}

// Styled components
const drawerWidth = 260;
const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  minHeight: '100vh',
  background: theme.palette.mode === 'dark' ? '#181a1b' : '#f7f9fa',
}));

const QuestionCard = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  padding: theme.spacing(2),
  borderRadius: 12,
  boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [tab, setTab] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState('// Write your Java code here');
  const [codeResult, setCodeResult] = useState('');
  const [quizMode, setQuizMode] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [mode, setMode] = useState<'light' | 'dark'>(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  const theme = React.useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: '#512da8' },
      secondary: { main: '#ffd600' },
      background: { default: mode === 'dark' ? '#181a1b' : '#f7f9fa' },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  }), [mode]);

  // Fetch topics
  useEffect(() => {
    fetch('/api/topics')
      .then(res => res.json())
      .then(setTopics);
  }, []);

  // Fetch questions for selected topic
  useEffect(() => {
    if (selectedTopic) {
      fetch(`/api/questions/topic/${selectedTopic.id}`)
        .then(res => res.json())
        .then(setQuestions);
    } else {
      setQuestions([]);
    }
  }, [selectedTopic]);

  // Filtered questions
  const filteredQuestions = questions.filter(q =>
    (search === '' || q.title.toLowerCase().includes(search.toLowerCase())) &&
    (difficulty === '' || q.difficulty === difficulty)
  );

  // Quiz logic
  const startQuiz = () => {
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5).slice(0, 5);
    setQuizQuestions(shuffled);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizMode(true);
  };
  const answerQuiz = (correct: boolean) => {
    if (correct) setQuizScore(s => s + 1);
    if (quizIndex < quizQuestions.length - 1) setQuizIndex(i => i + 1);
    else setQuizMode(false);
  };

  // Code execution (mock)
  const runCode = () => {
    setCodeResult('Output: (mocked)\nHello, Java!');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: 1300 }}>
              <Toolbar>
                <IconButton color="inherit" edge="start" onClick={() => setDrawerOpen(!drawerOpen)} sx={{ mr: 2 }}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                  Java Interview Prep
                </Typography>
                <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
                  <IconButton color="inherit" onClick={() => setMode(m => m === 'light' ? 'dark' : 'light')}>
                    {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Statistics"><IconButton color="inherit" onClick={() => setShowStats(true)}><BarChartIcon /></IconButton></Tooltip>
                <Tooltip title="Random Quiz"><IconButton color="inherit" onClick={startQuiz}><QuizIcon /></IconButton></Tooltip>
                <Tooltip title="Code Editor"><IconButton color="inherit" onClick={() => setShowCode(true)}><CodeIcon /></IconButton></Tooltip>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="persistent"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' } }}
            >
              <Toolbar />
              <Box sx={{ overflow: 'auto' }}>
                <List>
                  {topics.map(topic => (
                    <ListItem key={topic.id} disablePadding>
                      <ListItemButton selected={selectedTopic?.id === topic.id} onClick={() => { setSelectedTopic(topic); setDrawerOpen(false); }}>
                        <ListItemText primary={topic.name} secondary={topic.description} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
            <Main>
              <Toolbar />
              <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
                <TextField label="Search" value={search} onChange={e => setSearch(e.target.value)} size="small" />
                <TextField
                  select
                  label="Difficulty"
                  value={difficulty}
                  onChange={e => setDifficulty(e.target.value)}
                  size="small"
                  SelectProps={{ native: true }}
                  sx={{ minWidth: 120 }}
                >
                  <option value="">All</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </TextField>
              </Box>
              <Divider />
              {quizMode ? (
                <QuestionCard>
                  <Typography variant="h6">Quiz: {quizIndex + 1} / {quizQuestions.length}</Typography>
                  <Typography variant="subtitle1">{quizQuestions[quizIndex]?.title}</Typography>
                  <Typography>{quizQuestions[quizIndex]?.content}</Typography>
                  <Button variant="contained" color="success" onClick={() => answerQuiz(true)} sx={{ mt: 2, mr: 1 }}>Correct</Button>
                  <Button variant="contained" color="error" onClick={() => answerQuiz(false)} sx={{ mt: 2 }}>Wrong</Button>
                  {quizIndex === quizQuestions.length - 1 && !quizMode && (
                    <Typography variant="h5" sx={{ mt: 2 }}>Score: {quizScore} / {quizQuestions.length}</Typography>
                  )}
                </QuestionCard>
              ) : (
                <>
                  {selectedTopic && (
                    <Typography variant="h5" sx={{ mb: 2 }}>{selectedTopic.name} Questions</Typography>
                  )}
                  {filteredQuestions.map(q => (
                    <QuestionCard key={q.id}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>{q.title}</Typography>
                        <Chip label={q.difficulty} color={q.difficulty === 'Easy' ? 'success' : q.difficulty === 'Medium' ? 'warning' : 'error'} size="small" />
                        <IconButton sx={{ ml: 1 }}><BookmarkIcon /></IconButton>
                      </Box>
                      <Typography>{q.content}</Typography>
                      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mt: 2 }}>
                        <Tab label="Answer" />
                        <Tab label="Explanation" />
                      </Tabs>
                      {tab === 0 && <Typography sx={{ mt: 1 }}>{q.answer}</Typography>}
                      {tab === 1 && <Typography sx={{ mt: 1, fontStyle: 'italic' }}>{q.explanation}</Typography>}
                    </QuestionCard>
                  ))}
                </>
              )}
            </Main>
            {/* Code Editor Dialog */}
            <Dialog open={showCode} onClose={() => setShowCode(false)} maxWidth="md" fullWidth>
              <DialogTitle>Java Code Editor</DialogTitle>
              <DialogContent>
                <MonacoEditor
                  height="300px"
                  defaultLanguage="java"
                  value={code}
                  onChange={v => setCode(v || '')}
                  theme="vs-dark"
                />
                <Button variant="contained" onClick={runCode} sx={{ mt: 2 }}>Run Code</Button>
                <Paper sx={{ mt: 2, p: 2, background: '#222', color: '#fff' }}>{codeResult}</Paper>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowCode(false)}>Close</Button>
              </DialogActions>
            </Dialog>
            {/* Statistics Dialog (mock) */}
            <Dialog open={showStats} onClose={() => setShowStats(false)} maxWidth="sm" fullWidth>
              <DialogTitle>Statistics</DialogTitle>
              <DialogContent>
                <Typography>Total Questions: {questions.length}</Typography>
                <Typography>Bookmarked: (mock)</Typography>
                <Typography>Revised: (mock)</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowStats(false)}>Close</Button>
              </DialogActions>
            </Dialog>
          </Box>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
            <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" />} />
            
            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/blog" element={<ProtectedRoute><BlogPage /></ProtectedRoute>} />
            <Route path="/coding-practice" element={<ProtectedRoute><CodingPracticePage /></ProtectedRoute>} />
            <Route path="/interview-experience" element={<ProtectedRoute><InterviewExperiencePage /></ProtectedRoute>} />
            <Route path="/mock-interview" element={<ProtectedRoute><MockInterviewPage /></ProtectedRoute>} />
            <Route path="/system-design" element={<ProtectedRoute><SystemDesignPage /></ProtectedRoute>} />
            <Route path="/topic/:id" element={<ProtectedRoute><TopicDeepDivePage /></ProtectedRoute>} />
            <Route path="/tracks" element={<ProtectedRoute><TracksPage /></ProtectedRoute>} />
            <Route path="/notes" element={<ProtectedRoute><UserNotesPage /></ProtectedRoute>} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Toaster position="top-right" />
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
