package com.javainterview.backend.controller;

import com.javainterview.backend.model.Bookmark;
import com.javainterview.backend.service.BookmarkService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookmarks")
@Tag(name = "Bookmarks", description = "Bookmark management")
public class BookmarkController {
    @Autowired
    private BookmarkService bookmarkService;

    @GetMapping
    @Operation(summary = "Get all bookmarks")
    public List<Bookmark> getAllBookmarks() {
        return bookmarkService.getAllBookmarks();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get bookmark by ID")
    public ResponseEntity<Bookmark> getBookmarkById(@PathVariable Long id) {
        return bookmarkService.getBookmarkById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Create or update a bookmark")
    public Bookmark saveBookmark(@RequestBody Bookmark bookmark) {
        return bookmarkService.saveBookmark(bookmark);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a bookmark")
    public void deleteBookmark(@PathVariable Long id) {
        bookmarkService.deleteBookmark(id);
    }
}
