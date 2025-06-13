package com.example.usermgmt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class UserManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserManagementApplication.class, args);
        System.out.println("🚀 Spring Boot 用户管理系统启动成功！");
        System.out.println("📱 API地址: http://localhost:8080/api");
        System.out.println("📋 Swagger文档: http://localhost:8080/api/swagger-ui.html");
        System.out.println("💻 前端地址: http://localhost:3000");
    }
} 