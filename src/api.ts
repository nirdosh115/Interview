import axios from 'axios';

const API_BASE = '/api'; // Proxy to backend

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// --- Topics ---
export const getTopics = async () => (await api.get('/topics')).data;
export const getTopic = async (id: number) => (await api.get(`/topics/${id}`)).data;
export const createOrUpdateTopic = async (topic: any) => (await api.post('/topics', topic)).data;
export const deleteTopic = async (id: number) => (await api.delete(`/topics/${id}`)).data;

// --- Questions ---
export const getQuestions = async () => (await api.get('/questions')).data;
export const getQuestion = async (id: number) => (await api.get(`/questions/${id}`)).data;
export const createOrUpdateQuestion = async (q: any) => (await api.post('/questions', q)).data;
export const deleteQuestion = async (id: number) => (await api.delete(`/questions/${id}`)).data;

// --- Bookmarks ---
export const getBookmarks = async () => (await api.get('/bookmarks')).data;
export const createOrUpdateBookmark = async (b: any) => (await api.post('/bookmarks', b)).data;
export const deleteBookmark = async (id: number) => (await api.delete(`/bookmarks/${id}`)).data;

// --- Revisions ---
export const getRevisions = async () => (await api.get('/revisions')).data;
export const createOrUpdateRevision = async (r: any) => (await api.post('/revisions', r)).data;
export const deleteRevision = async (id: number) => (await api.delete(`/revisions/${id}`)).data;

// --- Statistics ---
export const getStatistics = async () => (await api.get('/statistics')).data;
export const createOrUpdateStatistic = async (s: any) => (await api.post('/statistics', s)).data;
export const deleteStatistic = async (id: number) => (await api.delete(`/statistics/${id}`)).data;

// --- Code Execution ---
export const executeCode = async (code: string) => (await api.post('/code/execute', { code })).data;

// --- Tracks ---
export const getTracks = async () => (await api.get('/tracks')).data;

// --- Blog ---
export const getBlogPosts = async () => (await api.get('/blog')).data;

// --- System Design ---
export const getSystemDesignResources = async () => (await api.get('/system-design/resources')).data;

// --- Mock Interview ---
export const startMockInterview = async () => (await api.get('/mock-interview/start')).data;

// --- AI/Analyzer ---
export const analyzeAI = async (input: string) => (await api.post('/ai/analyze', input, { headers: { 'Content-Type': 'text/plain' } })).data;

// --- Group Study ---
export const getGroupStudyRooms = async () => (await api.get('/group-study/rooms')).data;

// --- Types matching backend models ---
export interface Topic {
  id: number;
  name: string;
  description: string;
}

export interface Question {
  id: number;
  title: string;
  content: string;
  answer: string;
  explanation: string;
  difficulty: string;
  topicId: number;
  options: string[]; // Added for MCQ support
  answerIndex: number; // Added for MCQ support
}

export interface Bookmark {
  id: number;
  questionId: number;
}

export interface Revision {
  id: number;
  questionId: number;
  revised: boolean;
}

export interface Statistic {
  id: number;
  questionId: number;
  attempts: number;
  correct: number;
}

export interface CodeExecutionResult {
  output: string;
  error: string;
  success: boolean;
}
