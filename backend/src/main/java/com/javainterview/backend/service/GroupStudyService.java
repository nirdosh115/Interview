package com.javainterview.backend.service;

import com.javainterview.backend.model.GroupStudyRoom;
import com.javainterview.backend.model.User;
import com.javainterview.backend.repository.GroupStudyRepository;
import com.javainterview.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class GroupStudyService {
    @Autowired
    private GroupStudyRepository groupStudyRepository;

    @Autowired
    private UserRepository userRepository;

    public List<GroupStudyRoom> getAllRooms() {
        return groupStudyRepository.findAll();
    }

    public Optional<GroupStudyRoom> getRoomById(Long id) {
        return groupStudyRepository.findById(id);
    }

    @Transactional
    public GroupStudyRoom createRoom(GroupStudyRoom room, Long creatorId) {
        User creator = userRepository.findById(creatorId)
            .orElseThrow(() -> new IllegalArgumentException("Creator not found"));
        room.setCreator(creator);
        room.getParticipants().add(creator);
        return groupStudyRepository.save(room);
    }

    @Transactional
    public GroupStudyRoom joinRoom(Long roomId, Long userId) {
        GroupStudyRoom room = groupStudyRepository.findById(roomId)
            .orElseThrow(() -> new IllegalArgumentException("Room not found"));
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (room.getParticipants().size() >= room.getMaxParticipants()) {
            throw new IllegalStateException("Room is full");
        }

        room.getParticipants().add(user);
        return groupStudyRepository.save(room);
    }

    @Transactional
    public GroupStudyRoom leaveRoom(Long roomId, Long userId) {
        GroupStudyRoom room = groupStudyRepository.findById(roomId)
            .orElseThrow(() -> new IllegalArgumentException("Room not found"));
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        room.getParticipants().remove(user);
        return groupStudyRepository.save(room);
    }

    @Transactional
    public void deleteRoom(Long roomId, Long userId) {
        GroupStudyRoom room = groupStudyRepository.findById(roomId)
            .orElseThrow(() -> new IllegalArgumentException("Room not found"));

        if (!room.getCreator().getId().equals(userId)) {
            throw new IllegalStateException("Only the creator can delete the room");
        }

        groupStudyRepository.delete(room);
    }
} 