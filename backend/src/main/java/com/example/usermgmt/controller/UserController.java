package com.example.usermgmt.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    
    // 模拟数据库存储
    private static final List<Map<String, Object>> users = new ArrayList<>();
    static {
        users.add(createUser(1, "admin", "System", "Admin", "ADMIN", "admin@example.com"));
        users.add(createUser(2, "user1", "John", "Doe", "USER", "user1@example.com"));
        users.add(createUser(3, "user2", "Jane", "Smith", "USER", "user2@example.com"));
        users.add(createUser(4, "manager1", "Mike", "Johnson", "MANAGER", "manager1@example.com"));
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String status) {
        
        List<Map<String, Object>> filteredUsers = new ArrayList<>(users);
        
        // 简单过滤
        if (username != null && !username.isEmpty()) {
            filteredUsers.removeIf(u -> !u.get("username").toString().toLowerCase().contains(username.toLowerCase()));
        }
        if (role != null && !role.isEmpty()) {
            filteredUsers.removeIf(u -> !u.get("role").toString().equals(role));
        }
        
        // 分页
        int start = page * size;
        int end = Math.min(start + size, filteredUsers.size());
        List<Map<String, Object>> pageContent = start < filteredUsers.size() ? 
            filteredUsers.subList(start, end) : new ArrayList<>();
        
        // 构造分页响应
        Map<String, Object> response = new HashMap<>();
        response.put("content", pageContent);
        response.put("totalElements", filteredUsers.size());
        response.put("totalPages", (int) Math.ceil((double) filteredUsers.size() / size));
        response.put("size", size);
        response.put("number", page);
        response.put("first", page == 0);
        response.put("last", page >= (int) Math.ceil((double) filteredUsers.size() / size) - 1);
        response.put("empty", pageContent.isEmpty());
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable String id) {
        Optional<Map<String, Object>> user = users.stream()
            .filter(u -> u.get("id").toString().equals(id))
            .findFirst();
        
        return user.map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody Map<String, String> userData) {
        String username = userData.get("username");
        if (users.stream().anyMatch(u -> u.get("username").equals(username))) {
            return ResponseEntity.badRequest().body(Map.of(
                "status", "error",
                "message", "用户名已存在"
            ));
        }

        int newId = users.size() + 1;
        Map<String, Object> newUser = createUser(
            newId,
            username,
            userData.get("firstName"),
            userData.get("lastName"),
            userData.get("role"),
            userData.get("email")
        );
        users.add(newUser);

        return ResponseEntity.ok(newUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable String id, @RequestBody Map<String, String> userData) {
        Optional<Map<String, Object>> userOpt = users.stream()
            .filter(u -> u.get("id").toString().equals(id))
            .findFirst();

        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Map<String, Object> user = userOpt.get();
        user.put("firstName", userData.get("firstName"));
        user.put("lastName", userData.get("lastName"));
        user.put("email", userData.get("email"));
        if (userData.containsKey("role")) {
            user.put("role", userData.get("role"));
        }
        user.put("updatedAt", new Date());

        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        boolean removed = users.removeIf(u -> u.get("id").toString().equals(id));
        
        if (!removed) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(Map.of(
            "status", "success",
            "message", "用户删除成功"
        ));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateUserStatus(@PathVariable String id, @RequestBody Map<String, String> statusData) {
        Optional<Map<String, Object>> userOpt = users.stream()
            .filter(u -> u.get("id").toString().equals(id))
            .findFirst();

        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Map<String, Object> user = userOpt.get();
        user.put("status", statusData.get("status"));
        user.put("updatedAt", new Date());

        return ResponseEntity.ok(user);
    }

    @PostMapping("/{id}/reset-password")
    public ResponseEntity<?> resetUserPassword(@PathVariable String id) {
        Optional<Map<String, Object>> userOpt = users.stream()
            .filter(u -> u.get("id").toString().equals(id))
            .findFirst();

        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        String newPassword = "temp" + System.currentTimeMillis();
        return ResponseEntity.ok(Map.of("newPassword", newPassword));
    }

    private static Map<String, Object> createUser(int id, String username, String firstName, String lastName, String role, String email) {
        Map<String, Object> user = new HashMap<>();
        user.put("id", id);
        user.put("username", username);
        user.put("firstName", firstName);
        user.put("lastName", lastName);
        user.put("role", role);
        user.put("email", email);
        user.put("status", "ACTIVE");
        user.put("lastLogin", "2024-12-13T10:30:00");
        user.put("createdAt", "2024-12-01T08:00:00");
        user.put("updatedAt", "2024-12-13T10:30:00");
        return user;
    }
} 