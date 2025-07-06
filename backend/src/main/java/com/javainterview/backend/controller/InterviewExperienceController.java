package com.javainterview.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.javainterview.backend.model.InterviewExperience;
import com.javainterview.backend.repository.InterviewExperienceRepository;
import java.util.List;

@RestController
@RequestMapping("/api/interview-experience")
public class InterviewExperienceController {
    @Autowired
    private InterviewExperienceRepository interviewExperienceRepository;

    @GetMapping
    public List<InterviewExperience> getAll() {
        return interviewExperienceRepository.findAll();
    }

    @PostMapping
    public InterviewExperience submit(@RequestBody InterviewExperience exp) {
        return interviewExperienceRepository.save(exp);
    }
}
