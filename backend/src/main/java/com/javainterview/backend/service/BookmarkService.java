package com.javainterview.backend.service;

import com.javainterview.backend.model.Bookmark;
import com.javainterview.backend.repository.BookmarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BookmarkService {
    @Autowired
    private BookmarkRepository bookmarkRepository;

    public List<Bookmark> getAllBookmarks() {
        return bookmarkRepository.findAll();
    }

    public Optional<Bookmark> getBookmarkById(Long id) {
        return bookmarkRepository.findById(id);
    }

    public List<Bookmark> getBookmarksByQuestionId(Long questionId) {
        return bookmarkRepository.findByQuestionId(questionId);
    }

    public Bookmark saveBookmark(Bookmark bookmark) {
        return bookmarkRepository.save(bookmark);
    }

    public void deleteBookmark(Long id) {
        bookmarkRepository.deleteById(id);
    }
}
