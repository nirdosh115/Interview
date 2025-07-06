package com.javainterview.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Arrays;

@RestController
@RequestMapping("/api/system-design")
@Tag(name = "System Design", description = "System design sandbox and resources")
public class SystemDesignController {
    @GetMapping("/resources")
    @Operation(summary = "Get system design resources (stub)")
    public List<String> getResources() {
        return Arrays.asList(
            "Distributed Systems 101",
            "CAP Theorem Explained",
            "Sample System Design Interview Questions"
        );
    }
}
