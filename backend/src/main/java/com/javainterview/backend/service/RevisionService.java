package com.javainterview.backend.service;

import com.javainterview.backend.model.Revision;
import com.javainterview.backend.repository.RevisionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RevisionService {
    @Autowired
    private RevisionRepository revisionRepository;

    public List<Revision> getAllRevisions() {
        return revisionRepository.findAll();
    }

    public Optional<Revision> getRevisionById(Long id) {
        return revisionRepository.findById(id);
    }

    public List<Revision> getRevisionsByQuestionId(Long questionId) {
        return revisionRepository.findByQuestionId(questionId);
    }

    public Revision saveRevision(Revision revision) {
        return revisionRepository.save(revision);
    }

    public void deleteRevision(Long id) {
        revisionRepository.deleteById(id);
    }
}
