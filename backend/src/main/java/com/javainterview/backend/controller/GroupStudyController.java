package com.javainterview.backend.controller;

import com.javainterview.backend.model.GroupStudyRoom;
import com.javainterview.backend.service.GroupStudyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/group-study")
public class GroupStudyController {
    @Autowired
    private GroupStudyService groupStudyService;

    @GetMapping
    public ResponseEntity<List<GroupStudyRoom>> getAllRooms() {
        return ResponseEntity.ok(groupStudyService.getAllRooms());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GroupStudyRoom> getRoomById(@PathVariable Long id) {
        return groupStudyService.getRoomById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<GroupStudyRoom> createRoom(
        @RequestBody GroupStudyRoom room,
        Authentication auth
    ) {
        Long userId = Long.parseLong(auth.getName());
        return ResponseEntity.ok(groupStudyService.createRoom(room, userId));
    }

    @PostMapping("/{roomId}/join")
    public ResponseEntity<GroupStudyRoom> joinRoom(
        @PathVariable Long roomId,
        Authentication auth
    ) {
        Long userId = Long.parseLong(auth.getName());
        return ResponseEntity.ok(groupStudyService.joinRoom(roomId, userId));
    }

    @PostMapping("/{roomId}/leave")
    public ResponseEntity<GroupStudyRoom> leaveRoom(
        @PathVariable Long roomId,
        Authentication auth
    ) {
        Long userId = Long.parseLong(auth.getName());
        return ResponseEntity.ok(groupStudyService.leaveRoom(roomId, userId));
    }

    @DeleteMapping("/{roomId}")
    public ResponseEntity<Void> deleteRoom(
        @PathVariable Long roomId,
        Authentication auth
    ) {
        Long userId = Long.parseLong(auth.getName());
        groupStudyService.deleteRoom(roomId, userId);
        return ResponseEntity.ok().build();
    }
}
