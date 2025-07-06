package com.javainterview.backend.service;

import com.javainterview.backend.model.Question;
import com.javainterview.backend.model.DifficultyLevel;
import com.javainterview.backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class QuestionService {
    @Autowired
    private QuestionRepository questionRepository;

    private final Random random = new Random();

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Question getQuestionById(Long id) {
        return questionRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Question not found"));
    }

    public List<Question> getQuestionsByTopic(String topic) {
        return questionRepository.findByTopic(topic);
    }

    public List<Question> getQuestionsByDifficulty(DifficultyLevel difficulty) {
        return questionRepository.findByDifficulty(difficulty);
    }

    public List<Question> searchQuestions(String query, DifficultyLevel difficulty) {
        if (difficulty != null) {
            return questionRepository.findByTopicAndDifficulty(query, difficulty);
        }
        return questionRepository.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(query, query);
    }

    public List<Question> getQuestionsForReview(String topic) {
        return questionRepository.findByTopicAndLastReviewedBefore(
            topic,
            LocalDateTime.now().minusDays(7)
        );
    }

    @Transactional
    public Question markQuestionReviewed(Long questionId) {
        Question question = questionRepository.findById(questionId)
            .orElseThrow(() -> new IllegalArgumentException("Question not found"));
        question.setLastReviewed(LocalDateTime.now());
        return questionRepository.save(question);
    }

    public List<Question> getRandomQuiz(int count) {
        List<Question> allQuestions = questionRepository.findAll();
        return random.ints(0, allQuestions.size())
            .distinct()
            .limit(count)
            .mapToObj(allQuestions::get)
            .collect(Collectors.toList());
    }

    public List<Question> getAdaptiveQuiz(int count) {
        // TODO: Implement adaptive quiz logic based on user performance
        return getRandomQuiz(count);
    }

    public List<Question> getMistakes() {
        return questionRepository.findByMistakeCountGreaterThanOrderByMistakeCountDesc(0);
    }

    @Transactional
    public Question logMistake(Long questionId) {
        Question question = questionRepository.findById(questionId)
            .orElseThrow(() -> new IllegalArgumentException("Question not found"));
        question.setMistakeCount(question.getMistakeCount() + 1);
        return questionRepository.save(question);
    }

    public List<Question> getBookmarkedQuestions() {
        return questionRepository.findByBookmarkedTrue();
    }

    @Transactional
    public Question bookmarkQuestion(Long questionId) {
        Question question = questionRepository.findById(questionId)
            .orElseThrow(() -> new IllegalArgumentException("Question not found"));
        question.setBookmarked(!question.isBookmarked());
        return questionRepository.save(question);
    }
}
