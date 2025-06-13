package com.example.usermanagement.service;

import com.example.usermanagement.dto.DashboardStatsDTO;
import com.example.usermanagement.repository.UserRepository;
import com.example.usermanagement.repository.AuditLogRepository;
import com.example.usermanagement.entity.User;
import com.example.usermanagement.enums.UserStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final UserRepository userRepository;
    private final AuditLogRepository auditLogRepository;

    @Transactional(readOnly = true)
    public DashboardStatsDTO getDashboardStats() {
        LocalDateTime today = LocalDate.now().atStartOfDay();
        LocalDateTime sevenDaysAgo = today.minusDays(7);

        // 获取基础统计数据
        long totalUsers = userRepository.count();
        long activeUsers = userRepository.countByStatus(UserStatus.ACTIVE);
        long newUsersToday = userRepository.countByCreatedAtAfter(today);
        long totalLogins = auditLogRepository.countByActionType("LOGIN");

        // 获取最近7天的登录趋势
        List<DashboardStatsDTO.LoginTrendDTO> loginTrends = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd");
        
        for (int i = 6; i >= 0; i--) {
            LocalDateTime date = today.minusDays(i);
            LocalDateTime nextDate = date.plusDays(1);
            long count = auditLogRepository.countByActionTypeAndCreatedAtBetween(
                "LOGIN", date, nextDate);
            
            loginTrends.add(DashboardStatsDTO.LoginTrendDTO.builder()
                .date(date.format(formatter))
                .count(count)
                .build());
        }

        // 获取用户角色分布
        List<Object[]> roleStats = userRepository.countByRole();
        List<DashboardStatsDTO.UserRoleStatsDTO> usersByRole = roleStats.stream()
            .map(stat -> DashboardStatsDTO.UserRoleStatsDTO.builder()
                .role((String) stat[0])
                .count((Long) stat[1])
                .build())
            .collect(Collectors.toList());

        // 获取用户状态分布
        List<Object[]> statusStats = userRepository.countByStatus();
        List<DashboardStatsDTO.UserStatusStatsDTO> usersByStatus = statusStats.stream()
            .map(stat -> DashboardStatsDTO.UserStatusStatsDTO.builder()
                .status(((UserStatus) stat[0]).name())
                .count((Long) stat[1])
                .build())
            .collect(Collectors.toList());

        // 构建并返回仪表板统计数据
        return DashboardStatsDTO.builder()
            .totalUsers(totalUsers)
            .activeUsers(activeUsers)
            .newUsersToday(newUsersToday)
            .totalLogins(totalLogins)
            .loginTrends(loginTrends)
            .usersByRole(usersByRole)
            .usersByStatus(usersByStatus)
            .build();
    }
} 