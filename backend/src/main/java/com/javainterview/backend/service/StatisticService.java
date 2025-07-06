package com.javainterview.backend.service;

import com.javainterview.backend.model.Statistic;
import com.javainterview.backend.repository.StatisticRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StatisticService {
    @Autowired
    private StatisticRepository statisticRepository;

    public List<Statistic> getAllStatistics() {
        return statisticRepository.findAll();
    }

    public Statistic getStatisticById(Long id) {
        return statisticRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Statistic not found"));
    }

    @Transactional
    public Statistic saveStatistic(Statistic statistic) {
        return statisticRepository.save(statistic);
    }

    @Transactional
    public void deleteStatistic(Long id) {
        statisticRepository.deleteById(id);
    }

    public List<Statistic> getStatisticsByUserId(Long userId) {
        return statisticRepository.findByUserId(userId);
    }

    @Transactional
    public Statistic updateStatistic(Long id, Statistic statistic) {
        Statistic existingStatistic = getStatisticById(id);
        existingStatistic.setUserId(statistic.getUserId());
        existingStatistic.setQuestionId(statistic.getQuestionId());
        existingStatistic.setAttempts(statistic.getAttempts());
        existingStatistic.setCorrectAnswers(statistic.getCorrectAnswers());
        existingStatistic.setLastAttemptDate(statistic.getLastAttemptDate());
        return statisticRepository.save(existingStatistic);
    }
}
