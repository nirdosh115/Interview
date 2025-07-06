package com.javainterview.backend.repository;

import com.javainterview.backend.model.Question;
import com.javainterview.backend.model.DifficultyLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByTopicAndLastReviewedBefore(String topic, LocalDateTime date);
    List<Question> findByMistakeCountGreaterThanOrderByMistakeCountDesc(int count);
    List<Question> findByBookmarkedTrue();
    List<Question> findByTopic(String topic);
    List<Question> findByDifficulty(DifficultyLevel difficulty);
    List<Question> findByTopicAndDifficulty(String topic, DifficultyLevel difficulty);
    List<Question> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String title, String description);
}
