package com.watchid.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "access_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccessLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie;

    @Column(nullable = false)
    private Integer detectedAge;

    @Column(nullable = false)
    private Boolean accessGranted;

    private String denialReason;

    @Column(nullable = false)
    private LocalDateTime accessedAt;

    @PrePersist
    protected void onCreate() {
        accessedAt = LocalDateTime.now();
    }
}
