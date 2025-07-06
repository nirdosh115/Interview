package com.javainterview.backend.repository;

import com.javainterview.backend.model.LearningPath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearningPathRepository extends JpaRepository<LearningPath, Long> {
    List<LearningPath> findByTitleContainingIgnoreCaseAndDifficulty(String title, String difficulty);
    List<LearningPath> findByTitleContainingIgnoreCase(String title);
    List<LearningPath> findByDifficulty(String difficulty);
    List<LearningPath> findByCategory(String category);
} 