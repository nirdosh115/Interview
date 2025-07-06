package com.javainterview.backend.controller;

import com.javainterview.backend.model.Question;
import com.javainterview.backend.model.DifficultyLevel;
import com.javainterview.backend.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "*", maxAge = 3600)
public class QuestionController {
    @Autowired
    private QuestionService questionService;

    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions() {
        return ResponseEntity.ok(questionService.getAllQuestions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) {
        return ResponseEntity.ok(questionService.getQuestionById(id));
    }

    @GetMapping("/topic/{topic}")
    public ResponseEntity<List<Question>> getQuestionsByTopic(@PathVariable String topic) {
        return ResponseEntity.ok(questionService.getQuestionsByTopic(topic));
    }

    @GetMapping("/difficulty/{difficulty}")
    public ResponseEntity<List<Question>> getQuestionsByDifficulty(
            @PathVariable DifficultyLevel difficulty) {
        return ResponseEntity.ok(questionService.getQuestionsByDifficulty(difficulty));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Question>> searchQuestions(
            @RequestParam String query,
            @RequestParam(required = false) DifficultyLevel difficulty) {
        return ResponseEntity.ok(questionService.searchQuestions(query, difficulty));
    }

    @GetMapping("/review/{topic}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Question>> getQuestionsForReview(@PathVariable String topic) {
        return ResponseEntity.ok(questionService.getQuestionsForReview(topic));
    }

    @PostMapping("/{questionId}/review")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Question> markQuestionReviewed(@PathVariable Long questionId) {
        return ResponseEntity.ok(questionService.markQuestionReviewed(questionId));
    }

    @GetMapping("/quiz")
    public ResponseEntity<List<Question>> getRandomQuiz(
            @RequestParam(defaultValue = "10") int count) {
        return ResponseEntity.ok(questionService.getRandomQuiz(count));
    }

    @GetMapping("/quiz/adaptive")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Question>> getAdaptiveQuiz(
            @RequestParam(defaultValue = "10") int count) {
        return ResponseEntity.ok(questionService.getAdaptiveQuiz(count));
    }

    @GetMapping("/mistakes")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Question>> getMistakes() {
        return ResponseEntity.ok(questionService.getMistakes());
    }

    @PostMapping("/{questionId}/mistake")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Question> logMistake(@PathVariable Long questionId) {
        return ResponseEntity.ok(questionService.logMistake(questionId));
    }

    @GetMapping("/bookmarks")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Question>> getBookmarkedQuestions() {
        return ResponseEntity.ok(questionService.getBookmarkedQuestions());
    }

    @PostMapping("/{questionId}/bookmark")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Question> toggleBookmark(@PathVariable Long questionId) {
        return ResponseEntity.ok(questionService.bookmarkQuestion(questionId));
    }
}
