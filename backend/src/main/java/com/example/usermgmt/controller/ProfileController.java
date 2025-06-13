package com.example.usermgmt.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = "http://localhost:3000")
public class ProfileController {

    // 模拟当前登录用户
    private static Map<String, Object> currentUser = createCurrentUser();

    @GetMapping
    public ResponseEntity<Map<String, Object>> getCurrentProfile() {
        return ResponseEntity.ok(currentUser);
    }

    @PutMapping
    public ResponseEntity<Map<String, Object>> updateProfile(@RequestBody Map<String, String> profileData) {
        // 更新用户信息
        if (profileData.containsKey("firstName")) {
            currentUser.put("firstName", profileData.get("firstName"));
        }
        if (profileData.containsKey("lastName")) {
            currentUser.put("lastName", profileData.get("lastName"));
        }
        if (profileData.containsKey("email")) {
            currentUser.put("email", profileData.get("email"));
        }
        
        currentUser.put("updatedAt", new Date());
        
        return ResponseEntity.ok(currentUser);
    }

    @PatchMapping("/password")
    public ResponseEntity<Map<String, String>> changePassword(@RequestBody Map<String, String> passwordData) {
        String oldPassword = passwordData.get("oldPassword");
        String newPassword = passwordData.get("newPassword");
        String confirmPassword = passwordData.get("confirmPassword");

        // 简单验证
        if (oldPassword == null || newPassword == null || confirmPassword == null) {
            return ResponseEntity.badRequest().body(Map.of(
                "status", "error",
                "message", "所有密码字段都是必需的"
            ));
        }

        if (!newPassword.equals(confirmPassword)) {
            return ResponseEntity.badRequest().body(Map.of(
                "status", "error",
                "message", "新密码与确认密码不匹配"
            ));
        }

        if (newPassword.length() < 6) {
            return ResponseEntity.badRequest().body(Map.of(
                "status", "error",
                "message", "新密码长度至少为6位"
            ));
        }

        // 模拟密码更新成功
        return ResponseEntity.ok(Map.of(
            "status", "success",
            "message", "密码修改成功"
        ));
    }

    private static Map<String, Object> createCurrentUser() {
        Map<String, Object> user = new HashMap<>();
        user.put("id", 1);
        user.put("username", "admin");
        user.put("firstName", "System");
        user.put("lastName", "Admin");
        user.put("email", "admin@example.com");
        user.put("role", "ADMIN");
        user.put("status", "ACTIVE");
        user.put("lastLogin", "2024-12-13T10:30:00");
        user.put("createdAt", "2024-12-01T08:00:00");
        user.put("updatedAt", "2024-12-13T10:30:00");
        return user;
    }
} 