package com.javainterview.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mock-interview")
@Tag(name = "Mock Interview", description = "Mock interview simulation")
public class MockInterviewController {
    @GetMapping("/start")
    @Operation(summary = "Start a mock interview (stub)")
    public String startMockInterview() {
        return "Mock interview started. (Stub)";
    }
}
