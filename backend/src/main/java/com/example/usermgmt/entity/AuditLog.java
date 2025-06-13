package com.example.usermgmt.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(nullable = false)
    private String action;

    @Column(nullable = false)
    private String resource;

    @Column(columnDefinition = "TEXT")
    private String details;

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(name = "user_agent", columnDefinition = "TEXT")
    private String userAgent;

    @CreatedDate
    @Column(name = "timestamp", updatable = false)
    private LocalDateTime timestamp;

    // 常用操作常量
    public static class Actions {
        public static final String LOGIN = "LOGIN";
        public static final String LOGOUT = "LOGOUT";
        public static final String CREATE_USER = "CREATE_USER";
        public static final String UPDATE_USER = "UPDATE_USER";
        public static final String DELETE_USER = "DELETE_USER";
        public static final String RESET_PASSWORD = "RESET_PASSWORD";
        public static final String CHANGE_PASSWORD = "CHANGE_PASSWORD";
        public static final String UPDATE_PROFILE = "UPDATE_PROFILE";
        public static final String VIEW_USERS = "VIEW_USERS";
        public static final String VIEW_LOGS = "VIEW_LOGS";
        public static final String EXPORT_DATA = "EXPORT_DATA";
    }

    // 资源常量
    public static class Resources {
        public static final String USER = "USER";
        public static final String PROFILE = "PROFILE";
        public static final String SYSTEM = "SYSTEM";
        public static final String AUTH = "AUTH";
        public static final String LOG = "LOG";
    }
} 