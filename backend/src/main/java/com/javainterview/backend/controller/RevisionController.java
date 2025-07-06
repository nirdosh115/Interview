package com.javainterview.backend.controller;

import com.javainterview.backend.model.Revision;
import com.javainterview.backend.service.RevisionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/revisions")
@Tag(name = "Revisions", description = "Revision management")
public class RevisionController {
    @Autowired
    private RevisionService revisionService;

    @GetMapping
    @Operation(summary = "Get all revisions")
    public List<Revision> getAllRevisions() {
        return revisionService.getAllRevisions();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get revision by ID")
    public ResponseEntity<Revision> getRevisionById(@PathVariable Long id) {
        return revisionService.getRevisionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Create or update a revision")
    public Revision saveRevision(@RequestBody Revision revision) {
        return revisionService.saveRevision(revision);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a revision")
    public void deleteRevision(@PathVariable Long id) {
        revisionService.deleteRevision(id);
    }
}
