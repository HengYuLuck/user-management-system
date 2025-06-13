package com.example.usermgmt.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        // 简单的用户名密码验证
        if ("admin".equals(username) && "admin123".equals(password)) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "登录成功");
            response.put("token", generateToken(username));
            response.put("user", Map.of(
                "username", "admin",
                "role", "ADMIN",
                "permissions", new String[]{"read", "write", "delete"}
            ));
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body(Map.of(
            "status", "error",
            "message", "用户名或密码错误"
        ));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok(Map.of(
            "status", "success",
            "message", "退出登录成功"
        ));
    }

    @GetMapping("/check")
    public ResponseEntity<?> checkAuth(@RequestHeader(value = "Authorization", required = false) String token) {
        if (token != null && token.startsWith("Bearer ")) {
            return ResponseEntity.ok(Map.of(
                "status", "success",
                "authenticated", true,
                "user", Map.of(
                    "username", "admin",
                    "role", "ADMIN",
                    "permissions", new String[]{"read", "write", "delete"}
                )
            ));
        }
        return ResponseEntity.ok(Map.of(
            "status", "error",
            "authenticated", false
        ));
    }

    private String generateToken(String username) {
        // 这里简单返回一个固定的token，实际应用中应该使用JWT
        return "Bearer " + username + "_" + System.currentTimeMillis();
    }
} 