package com.javainterview.backend.service;

import com.javainterview.backend.model.Topic;
import com.javainterview.backend.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TopicService {
    @Autowired
    private TopicRepository topicRepository;

    public List<Topic> getAllTopics() {
        return topicRepository.findAll();
    }

    public Optional<Topic> getTopicById(Long id) {
        return topicRepository.findById(id);
    }

    public Topic saveTopic(Topic topic) {
        return topicRepository.save(topic);
    }

    public void deleteTopic(Long id) {
        topicRepository.deleteById(id);
    }

    public List<Topic> searchTopics(String q) {
        return topicRepository.findAll().stream()
            .filter(t -> t.getName().toLowerCase().contains(q.toLowerCase()) ||
                         (t.getDescription() != null && t.getDescription().toLowerCase().contains(q.toLowerCase())))
            .toList();
    }
}
