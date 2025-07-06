package com.javainterview.backend.repository;

import com.javainterview.backend.model.Bookmark;
import java.util.*;
import org.springframework.stereotype.Repository;

@Repository
public class BookmarkRepository {
    private final Map<Long, Bookmark> bookmarks = new HashMap<>();
    private long idCounter = 1;

    public List<Bookmark> findAll() {
        return new ArrayList<>(bookmarks.values());
    }

    public Optional<Bookmark> findById(Long id) {
        return Optional.ofNullable(bookmarks.get(id));
    }

    public List<Bookmark> findByQuestionId(Long questionId) {
        List<Bookmark> result = new ArrayList<>();
        for (Bookmark b : bookmarks.values()) {
            if (Objects.equals(b.getQuestionId(), questionId)) {
                result.add(b);
            }
        }
        return result;
    }

    public Bookmark save(Bookmark bookmark) {
        if (bookmark.getId() == null) {
            bookmark.setId(idCounter++);
        }
        bookmarks.put(bookmark.getId(), bookmark);
        return bookmark;
    }

    public void deleteById(Long id) {
        bookmarks.remove(id);
    }
}
