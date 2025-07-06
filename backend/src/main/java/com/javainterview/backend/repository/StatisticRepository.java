package com.javainterview.backend.repository;

import com.javainterview.backend.model.Statistic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatisticRepository extends JpaRepository<Statistic, Long> {
    List<Statistic> findByUserId(Long userId);
    List<Statistic> findByQuestionId(Long questionId);
    List<Statistic> findByUserIdAndQuestionId(Long userId, Long questionId);
}
