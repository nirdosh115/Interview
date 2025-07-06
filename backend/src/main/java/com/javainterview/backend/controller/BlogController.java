package com.javainterview.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Arrays;

@RestController
@RequestMapping("/api/blog")
@Tag(name = "Blog", description = "Blog and updates")
public class BlogController {
    @GetMapping
    @Operation(summary = "Get all blog posts (stub)")
    public List<String> getAllBlogPosts() {
        return Arrays.asList(
            "Java 21 Features for 2025 Interviews",
            "How to Ace System Design Rounds",
            "Top 10 Java Mistakes and How to Avoid Them"
        );
    }
}
