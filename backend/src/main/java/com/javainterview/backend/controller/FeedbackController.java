package com.javainterview.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.javainterview.backend.model.Feedback;
import com.javainterview.backend.repository.FeedbackRepository;
import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {
    @Autowired
    private FeedbackRepository feedbackRepository;

    @GetMapping
    public List<Feedback> getAll() {
        return feedbackRepository.findAll();
    }

    @PostMapping
    public Feedback submit(@RequestBody Feedback feedback) {
        return feedbackRepository.save(feedback);
    }
}
