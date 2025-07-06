package com.javainterview.backend.repository;

import com.javainterview.backend.model.Revision;
import java.util.*;
import org.springframework.stereotype.Repository;

@Repository
public class RevisionRepository {
    private final Map<Long, Revision> revisions = new HashMap<>();
    private long idCounter = 1;

    public List<Revision> findAll() {
        return new ArrayList<>(revisions.values());
    }

    public Optional<Revision> findById(Long id) {
        return Optional.ofNullable(revisions.get(id));
    }

    public List<Revision> findByQuestionId(Long questionId) {
        List<Revision> result = new ArrayList<>();
        for (Revision r : revisions.values()) {
            if (Objects.equals(r.getQuestionId(), questionId)) {
                result.add(r);
            }
        }
        return result;
    }

    public Revision save(Revision revision) {
        if (revision.getId() == null) {
            revision.setId(idCounter++);
        }
        revisions.put(revision.getId(), revision);
        return revision;
    }

    public void deleteById(Long id) {
        revisions.remove(id);
    }
}
