package com.javainterview.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@Tag(name = "AI", description = "AI-powered features and code analyzer (stub)")
public class AIController {
    @PostMapping("/analyze")
    @Operation(summary = "Analyze code or answer using AI (stub)")
    public String analyze(@RequestBody String input) {
        return "AI analysis result for: " + input;
    }

    @PostMapping("/explain")
    @Operation(summary = "AI-powered explanation for a question or code")
    public String explain(@RequestBody String prompt) {
        return "AI explanation for: " + prompt;
    }
}
