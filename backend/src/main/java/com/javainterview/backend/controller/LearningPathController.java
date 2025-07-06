package com.javainterview.backend.controller;

import com.javainterview.backend.model.LearningPath;
import com.javainterview.backend.model.UserProgress;
import com.javainterview.backend.service.LearningPathService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/learning-paths")
@CrossOrigin(origins = "*", maxAge = 3600)
public class LearningPathController {

    @Autowired
    private LearningPathService learningPathService;

    @GetMapping
    public ResponseEntity<List<LearningPath>> getAllLearningPaths() {
        return ResponseEntity.ok(learningPathService.getAllLearningPaths());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LearningPath> getLearningPathById(@PathVariable Long id) {
        return ResponseEntity.ok(learningPathService.getLearningPathById(id));
    }

    @PostMapping
    public ResponseEntity<LearningPath> createLearningPath(@RequestBody LearningPath learningPath) {
        return ResponseEntity.ok(learningPathService.saveLearningPath(learningPath));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LearningPath> updateLearningPath(
            @PathVariable Long id,
            @RequestBody LearningPath learningPath) {
        return ResponseEntity.ok(learningPathService.updateLearningPath(id, learningPath));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLearningPath(@PathVariable Long id) {
        learningPathService.deleteLearningPath(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<LearningPath>> searchLearningPaths(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String difficulty) {
        return ResponseEntity.ok(learningPathService.searchLearningPaths(query, difficulty));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<LearningPath>> getLearningPathsByCategory(
            @PathVariable String category) {
        return ResponseEntity.ok(learningPathService.getLearningPathsByCategory(category));
    }

    @GetMapping("/difficulty/{level}")
    public ResponseEntity<List<LearningPath>> getLearningPathsByDifficulty(@PathVariable String level) {
        return ResponseEntity.ok(learningPathService.getLearningPathsByDifficulty(level));
    }

    @GetMapping("/progress")
    public ResponseEntity<Map<Long, Double>> getUserProgress(Authentication auth) {
        Long userId = Long.parseLong(auth.getName());
        return ResponseEntity.ok(learningPathService.getUserProgress(userId));
    }

    @PostMapping("/{pathId}/topics/{topicId}/progress")
    public ResponseEntity<UserProgress> updateProgress(
            @PathVariable Long pathId,
            @PathVariable Long topicId,
            @RequestParam double completionPercentage,
            Authentication auth
    ) {
        Long userId = Long.parseLong(auth.getName());
        return ResponseEntity.ok(learningPathService.updateProgress(userId, pathId, topicId, completionPercentage));
    }
} 