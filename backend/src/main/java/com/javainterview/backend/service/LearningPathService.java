package com.javainterview.backend.service;

import com.javainterview.backend.model.LearningPath;
import com.javainterview.backend.model.LearningPathTopic;
import com.javainterview.backend.model.UserProgress;
import com.javainterview.backend.repository.LearningPathRepository;
import com.javainterview.backend.repository.UserProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LearningPathService {
    @Autowired
    private LearningPathRepository learningPathRepository;

    @Autowired
    private UserProgressRepository userProgressRepository;

    public List<LearningPath> getAllLearningPaths() {
        return learningPathRepository.findAll();
    }

    public LearningPath getLearningPathById(Long id) {
        return learningPathRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Learning path not found"));
    }

    public List<LearningPath> getLearningPathsByDifficulty(String difficultyLevel) {
        return learningPathRepository.findAll().stream()
            .filter(path -> path.getDifficultyLevel().toString().equals(difficultyLevel))
            .collect(Collectors.toList());
    }

    @Transactional
    public LearningPath saveLearningPath(LearningPath learningPath) {
        return learningPathRepository.save(learningPath);
    }

    @Transactional
    public void deleteLearningPath(Long id) {
        learningPathRepository.deleteById(id);
    }

    public List<LearningPath> searchLearningPaths(String query, String difficulty) {
        if (query != null && !query.isEmpty() && difficulty != null && !difficulty.isEmpty()) {
            return learningPathRepository.findByTitleContainingIgnoreCaseAndDifficulty(query, difficulty);
        } else if (query != null && !query.isEmpty()) {
            return learningPathRepository.findByTitleContainingIgnoreCase(query);
        } else if (difficulty != null && !difficulty.isEmpty()) {
            return learningPathRepository.findByDifficulty(difficulty);
        }
        return learningPathRepository.findAll();
    }

    public List<LearningPath> getLearningPathsByCategory(String category) {
        return learningPathRepository.findByCategory(category);
    }

    @Transactional
    public LearningPath updateLearningPath(Long id, LearningPath learningPath) {
        LearningPath existingPath = getLearningPathById(id);
        existingPath.setTitle(learningPath.getTitle());
        existingPath.setDescription(learningPath.getDescription());
        existingPath.setDifficulty(learningPath.getDifficulty());
        existingPath.setCategory(learningPath.getCategory());
        existingPath.setTopics(learningPath.getTopics());
        return learningPathRepository.save(existingPath);
    }

    public Map<Long, Double> getUserProgress(Long userId) {
        List<UserProgress> progress = userProgressRepository.findByUserId(userId);
        return progress.stream()
            .collect(Collectors.groupingBy(
                p -> p.getTopic().getId(),
                Collectors.averagingDouble(UserProgress::getCompletionPercentage)
            ));
    }

    @Transactional
    public UserProgress updateProgress(Long userId, Long learningPathId, Long topicId, double completionPercentage) {
        LearningPath learningPath = learningPathRepository.findById(learningPathId)
            .orElseThrow(() -> new IllegalArgumentException("Learning path not found"));

        Optional<LearningPathTopic> topic = learningPath.getTopics().stream()
            .filter(t -> t.getId().equals(topicId))
            .findFirst();

        if (topic.isEmpty()) {
            throw new IllegalArgumentException("Topic not found in learning path");
        }

        UserProgress progress = userProgressRepository.findByUserIdAndTopicId(userId, topicId)
            .orElse(new UserProgress());

        progress.setUser(new com.javainterview.backend.model.User());
        progress.getUser().setId(userId);
        progress.setLearningPath(learningPath);
        progress.setTopic(topic.get());
        progress.setCompletionPercentage(completionPercentage);
        progress.setLastActivity(LocalDateTime.now());

        return userProgressRepository.save(progress);
    }
} 