package com.javainterview.backend.controller;

import com.javainterview.backend.model.CodeExecutionRequest;
import com.javainterview.backend.model.CodeExecutionResult;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/code")
@Tag(name = "Code Execution", description = "Java code execution and analysis")
public class CodeExecutionController {

    @PostMapping("/execute")
    @Operation(summary = "Execute Java code and return result")
    public ResponseEntity<CodeExecutionResult> executeCode(@RequestBody CodeExecutionRequest request) {
        // Stub: In production, integrate with a secure code runner (e.g., Dockerized JVM)
        CodeExecutionResult result = new CodeExecutionResult();
        result.setOutput("// Execution output for: " + request.getCode());
        result.setSuccess(true);
        result.setError(null);
        return ResponseEntity.ok(result);
    }
}
