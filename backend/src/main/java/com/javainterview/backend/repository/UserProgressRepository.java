package com.javainterview.backend.repository;

import com.javainterview.backend.model.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
    List<UserProgress> findByUserId(Long userId);
    List<UserProgress> findByUserIdAndLastActivityAfter(Long userId, LocalDateTime date);
    Optional<UserProgress> findByUserIdAndTopicId(Long userId, Long topicId);
} 