package com.javainterview.backend.repository;

import com.javainterview.backend.model.InterviewExperience;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterviewExperienceRepository extends JpaRepository<InterviewExperience, Long> {
}
