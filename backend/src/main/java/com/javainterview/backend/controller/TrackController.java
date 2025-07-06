package com.javainterview.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Arrays;

@RestController
@RequestMapping("/api/tracks")
@Tag(name = "Tracks", description = "Experience/Year-wise preparation tracks")
public class TrackController {
    @GetMapping
    @Operation(summary = "Get all tracks")
    public List<String> getAllTracks() {
        return Arrays.asList(
            "Fresher / 0-1 year",
            "1-2 years",
            "3-5 years",
            "5-8 years",
            "8+ years"
        );
    }
}
