package com.example.usermanagement.dto;

import lombok.Data;
import lombok.Builder;
import java.util.List;

@Data
@Builder
public class DashboardStatsDTO {
    private Long totalUsers;
    private Long activeUsers;
    private Long newUsersToday;
    private Long totalLogins;
    private List<LoginTrendDTO> loginTrends;
    private List<UserRoleStatsDTO> usersByRole;
    private List<UserStatusStatsDTO> usersByStatus;

    @Data
    @Builder
    public static class LoginTrendDTO {
        private String date;
        private Long count;
    }

    @Data
    @Builder
    public static class UserRoleStatsDTO {
        private String role;
        private Long count;
    }

    @Data
    @Builder
    public static class UserStatusStatsDTO {
        private String status;
        private Long count;
    }
} 