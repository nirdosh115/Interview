package com.javainterview.backend.repository;

import com.javainterview.backend.model.GroupStudyRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupStudyRepository extends JpaRepository<GroupStudyRoom, Long> {
} 