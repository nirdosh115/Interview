package com.javainterview.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "statistics")
public class Statistic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "question_id", nullable = false)
    private Long questionId;

    private int attempts;

    @Column(name = "correct_answers")
    private int correctAnswers;

    @Column(name = "last_attempt_date")
    private LocalDateTime lastAttemptDate;

    @PrePersist
    protected void onCreate() {
        if (lastAttemptDate == null) {
            lastAttemptDate = LocalDateTime.now();
        }
    }
}
