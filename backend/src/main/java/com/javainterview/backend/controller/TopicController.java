package com.javainterview.backend.controller;

import com.javainterview.backend.model.Topic;
import com.javainterview.backend.service.TopicService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/topics")
@Tag(name = "Topics", description = "Java topics management")
public class TopicController {
    @Autowired
    private TopicService topicService;

    @GetMapping
    @Operation(summary = "Get all topics")
    public List<Topic> getAllTopics() {
        return topicService.getAllTopics();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get topic by ID")
    public ResponseEntity<Topic> getTopicById(@PathVariable Long id) {
        return topicService.getTopicById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Create or update a topic")
    public Topic saveTopic(@RequestBody Topic topic) {
        return topicService.saveTopic(topic);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a topic")
    public void deleteTopic(@PathVariable Long id) {
        topicService.deleteTopic(id);
    }

    @GetMapping("/search")
    @Operation(summary = "Search topics by keyword")
    public List<Topic> searchTopics(@RequestParam String q) {
        return topicService.searchTopics(q);
    }
}
