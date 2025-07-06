-- Example data for Java Interview Preparation App

-- Insert Topics
INSERT INTO topic (id, name, description) VALUES
  (1, 'Core Java', 'Fundamentals of Java programming language'),
  (2, 'OOP', 'Object-Oriented Programming concepts in Java'),
  (3, 'Collections', 'Java Collections Framework'),
  (4, 'Concurrency', 'Multithreading and concurrency in Java'),
  (5, 'JVM Internals', 'Java Virtual Machine and performance tuning');

-- Insert Questions (multiple-choice)
INSERT INTO questions (id, title, description, solution, topic, difficulty, mistake_count, bookmarked, created_at) VALUES
  (1, 'Int Size in Java', 'What is the size of int in Java?', 'int in Java is a 32-bit signed integer.', 'Core Java', 'EASY', 0, false, CURRENT_TIMESTAMP),
  (2, 'OOP Principles', 'Which principle is being used when a subclass provides a specific implementation of a method declared in its superclass?', 'Polymorphism allows methods to do different things based on the object.', 'OOP', 'MEDIUM', 0, false, CURRENT_TIMESTAMP),
  (3, 'HashMap Interface', 'Which interface does java.util.HashMap implement?', 'HashMap implements the Map interface.', 'Collections', 'EASY', 0, false, CURRENT_TIMESTAMP),
  (4, 'Thread Start', 'Which method starts a thread in Java?', 'start() method is used to begin thread execution.', 'Concurrency', 'EASY', 0, false, CURRENT_TIMESTAMP),
  (5, 'JVM Heap Size', 'What is the default heap size of JVM?', 'Heap size depends on the JVM and system configuration.', 'JVM Internals', 'HARD', 0, false, CURRENT_TIMESTAMP);

-- Insert Learning Paths
INSERT INTO learning_paths (id, title, description, difficulty, difficulty_level, estimated_hours, is_published, category, created_at) VALUES
  (1, 'Java Fundamentals', 'Master the basics of Java programming', 'Beginner', 'EASY', 40, true, 'Core', CURRENT_TIMESTAMP),
  (2, 'Enterprise Java Development', 'Learn advanced Java for enterprise applications', 'Intermediate', 'MEDIUM', 60, true, 'Advanced', CURRENT_TIMESTAMP),
  (3, 'Java Architecture & Performance', 'Deep dive into Java internals and optimization', 'Advanced', 'HARD', 80, true, 'Expert', CURRENT_TIMESTAMP);

-- Map topics to learning paths
INSERT INTO learning_path_topics (id, learning_path_id, title, description, order_index, created_at) VALUES
  (1, 1, 'Core Java Basics', 'Start with Java fundamentals', 1, CURRENT_TIMESTAMP),
  (2, 1, 'OOP Concepts', 'Learn object-oriented programming', 2, CURRENT_TIMESTAMP),
  (3, 1, 'Collections Framework', 'Master Java collections', 3, CURRENT_TIMESTAMP),
  (4, 2, 'Advanced Collections', 'Deep dive into collections', 1, CURRENT_TIMESTAMP),
  (5, 2, 'Concurrency Basics', 'Learn multithreading', 2, CURRENT_TIMESTAMP),
  (6, 3, 'Advanced Concurrency', 'Master concurrent programming', 1, CURRENT_TIMESTAMP),
  (7, 3, 'JVM Deep Dive', 'Understand JVM internals', 2, CURRENT_TIMESTAMP);

-- Insert sample user data
INSERT INTO users (id, username, email, password_hash, full_name, role, created_at) VALUES
  (1, 'admin', 'admin@javaint.com', '$2a$10$XQFphQKrXxS0CzjrCa3tDu8jB4B6FfD5qE5VH3ZR3bKqVLpYkHHiS', 'Admin User', 'ADMIN', CURRENT_TIMESTAMP),
  (2, 'mentor1', 'mentor@javaint.com', '$2a$10$XQFphQKrXxS0CzjrCa3tDu8jB4B6FfD5qE5VH3ZR3bKqVLpYkHHiS', 'Java Mentor', 'MENTOR', CURRENT_TIMESTAMP),
  (3, 'user1', 'user@javaint.com', '$2a$10$XQFphQKrXxS0CzjrCa3tDu8jB4B6FfD5qE5VH3ZR3bKqVLpYkHHiS', 'Sample User', 'USER', CURRENT_TIMESTAMP);

-- Insert user progress data
INSERT INTO user_progress (id, user_id, learning_path_id, topic_id, completion_percentage, last_activity) VALUES
  (1, 3, 1, 1, 75.0, CURRENT_TIMESTAMP),
  (2, 3, 1, 2, 50.0, CURRENT_TIMESTAMP),
  (3, 3, 1, 3, 25.0, CURRENT_TIMESTAMP);
