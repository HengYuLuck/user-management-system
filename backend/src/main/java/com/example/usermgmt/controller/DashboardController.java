package com.example.usermgmt.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        
        // 基础统计数据
        stats.put("totalUsers", 4);
        stats.put("activeUsers", 3);
        stats.put("newUsersToday", 1);
        stats.put("totalLogins", 25);
        
        // 登录趋势数据（最近7天）
        List<Map<String, Object>> loginTrends = new ArrayList<>();
        String[] dates = {"12-07", "12-08", "12-09", "12-10", "12-11", "12-12", "12-13"};
        int[] counts = {5, 8, 6, 10, 7, 12, 9};
        
        for (int i = 0; i < dates.length; i++) {
            Map<String, Object> trend = new HashMap<>();
            trend.put("date", dates[i]);
            trend.put("count", counts[i]);
            loginTrends.add(trend);
        }
        stats.put("loginTrends", loginTrends);
        
        // 用户角色分布
        List<Map<String, Object>> usersByRole = new ArrayList<>();
        usersByRole.add(Map.of("role", "ADMIN", "count", 1));
        usersByRole.add(Map.of("role", "MANAGER", "count", 1));
        usersByRole.add(Map.of("role", "USER", "count", 2));
        stats.put("usersByRole", usersByRole);
        
        // 用户状态分布
        List<Map<String, Object>> usersByStatus = new ArrayList<>();
        usersByStatus.add(Map.of("status", "ACTIVE", "count", 3));
        usersByStatus.add(Map.of("status", "INACTIVE", "count", 1));
        usersByStatus.add(Map.of("status", "LOCKED", "count", 0));
        stats.put("usersByStatus", usersByStatus);
        
        return ResponseEntity.ok(stats);
    }
} 