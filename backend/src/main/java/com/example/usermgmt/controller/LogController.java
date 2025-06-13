package com.example.usermgmt.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/audit-logs")
@CrossOrigin(origins = "http://localhost:3000")
public class LogController {
    
    // 模拟数据存储
    private static final List<Map<String, Object>> logs = Collections.synchronizedList(new ArrayList<>());
    
    static {
        // 添加更多示例日志数据
        String[] usernames = {"admin", "user1", "user2", "manager1"};
        String[] actionTypes = {"LOGIN", "LOGOUT", "CREATE_USER", "UPDATE_USER", "DELETE_USER", "VIEW_USERS", "CHANGE_PASSWORD"};
        String[] details = {
            "用户登录系统", "用户退出系统", "创建新用户", "更新用户信息", 
            "删除用户", "查看用户列表", "修改密码", "重置用户密码"
        };
        
        // 生成20条模拟日志
        for (int i = 0; i < 20; i++) {
            String username = usernames[i % usernames.length];
            String actionType = actionTypes[i % actionTypes.length];
            String detail = details[i % details.length];
            
            Map<String, Object> log = new HashMap<>();
            log.put("id", i + 1);
            log.put("userId", (i % 4) + 1);
            log.put("username", username);
            log.put("actionType", actionType);
            log.put("actionDetails", detail + " #" + (i + 1));
            log.put("ipAddress", "192.168.1." + (100 + i % 20));
            log.put("userAgent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");
            log.put("createdAt", LocalDateTime.now().minusHours(i).format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
            
            logs.add(log);
        }
        
        // 按时间倒序排序
        logs.sort((a, b) -> ((String)b.get("createdAt")).compareTo((String)a.get("createdAt")));
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAuditLogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String actionType,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        
        List<Map<String, Object>> filteredLogs = new ArrayList<>(logs);
        
        // 应用过滤条件
        if (username != null && !username.isEmpty()) {
            filteredLogs.removeIf(log -> !log.get("username").toString().toLowerCase().contains(username.toLowerCase()));
        }
        if (actionType != null && !actionType.isEmpty()) {
            filteredLogs.removeIf(log -> !log.get("actionType").equals(actionType));
        }
        // 这里可以添加日期范围过滤逻辑
        
        // 分页
        int start = page * size;
        int end = Math.min(start + size, filteredLogs.size());
        List<Map<String, Object>> pageContent = start < filteredLogs.size() ? 
            filteredLogs.subList(start, end) : new ArrayList<>();
        
        // 构造分页响应
        Map<String, Object> response = new HashMap<>();
        response.put("content", pageContent);
        response.put("totalElements", filteredLogs.size());
        response.put("totalPages", (int) Math.ceil((double) filteredLogs.size() / size));
        response.put("size", size);
        response.put("number", page);
        response.put("first", page == 0);
        response.put("last", page >= (int) Math.ceil((double) filteredLogs.size() / size) - 1);
        response.put("empty", pageContent.isEmpty());
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/export")
    public ResponseEntity<byte[]> exportAuditLogs(
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String actionType,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        
        // 模拟导出CSV数据
        StringBuilder csv = new StringBuilder();
        csv.append("ID,用户名,操作类型,操作详情,IP地址,时间\n");
        
        List<Map<String, Object>> filteredLogs = new ArrayList<>(logs);
        // 应用相同的过滤逻辑...
        
        for (Map<String, Object> log : filteredLogs) {
            csv.append(log.get("id")).append(",")
               .append(log.get("username")).append(",")
               .append(log.get("actionType")).append(",")
               .append(log.get("actionDetails")).append(",")
               .append(log.get("ipAddress")).append(",")
               .append(log.get("createdAt")).append("\n");
        }
        
        byte[] csvBytes = csv.toString().getBytes();
        
        return ResponseEntity.ok()
                .header("Content-Type", "text/csv")
                .header("Content-Disposition", "attachment; filename=audit-logs.csv")
                .body(csvBytes);
    }

    @PostMapping
    public ResponseEntity<?> addAuditLog(@RequestBody Map<String, String> logData) {
        Map<String, Object> log = new HashMap<>();
        log.put("id", logs.size() + 1);
        log.put("userId", 1);  // 默认当前用户ID
        log.put("username", logData.getOrDefault("username", "admin"));
        log.put("actionType", logData.get("actionType"));
        log.put("actionDetails", logData.get("actionDetails"));
        log.put("ipAddress", logData.getOrDefault("ipAddress", "192.168.1.100"));
        log.put("userAgent", logData.getOrDefault("userAgent", "Mozilla/5.0"));
        log.put("createdAt", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        
        logs.add(0, log);  // 添加到列表开头
        
        return ResponseEntity.ok(log);
    }
} 