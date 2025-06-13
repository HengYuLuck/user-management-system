package com.example.usermanagement.repository;

import com.example.usermanagement.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    long countByActionType(String actionType);
    long countByActionTypeAndCreatedAtBetween(String actionType, LocalDateTime startDate, LocalDateTime endDate);
} 