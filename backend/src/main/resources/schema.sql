-- Only keep schema for real entities
-- Table for topics
CREATE TABLE IF NOT EXISTS topic (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255)
);

-- Table for questions
CREATE TABLE IF NOT EXISTS questions (
    id BIGINT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    solution TEXT NOT NULL,
    topic VARCHAR(255) NOT NULL,
    difficulty VARCHAR(255) NOT NULL,
    mistake_count INT,
    bookmarked BOOLEAN NOT NULL,
    last_reviewed TIMESTAMP,
    created_at TIMESTAMP
);

-- Table for learning paths
CREATE TABLE IF NOT EXISTS learning_paths (
    id BIGINT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    difficulty VARCHAR(255) NOT NULL,
    difficulty_level VARCHAR(255),
    estimated_hours INT NOT NULL,
    is_published BOOLEAN NOT NULL,
    category VARCHAR(255) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Table for learning path topics
CREATE TABLE IF NOT EXISTS learning_path_topics (
    id BIGINT PRIMARY KEY,
    learning_path_id BIGINT NOT NULL,
    title VARCHAR(255),
    description VARCHAR(255),
    order_index INT NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Table for users
CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    profile_image_url VARCHAR(255),
    bio TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    last_login TIMESTAMP,
    role VARCHAR(10) DEFAULT 'USER'
);

-- Table for user progress
CREATE TABLE IF NOT EXISTS user_progress (
    id BIGINT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    learning_path_id BIGINT NOT NULL,
    topic_id BIGINT NOT NULL,
    completion_percentage DECIMAL(5,2) DEFAULT 0,
    last_activity TIMESTAMP
); 