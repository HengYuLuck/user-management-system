package com.example.usermgmt.config;

import com.example.usermgmt.entity.User;
import com.example.usermgmt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Autowired
    private UserRepository userRepository;

    @Bean
    public CommandLineRunner initData() {
        return args -> {
            // 检查是否已存在管理员用户
            if (userRepository.findByUsername("admin").isEmpty()) {
                // 创建并保存默认管理员用户
                User admin = User.createDefaultAdmin();
                userRepository.save(admin);
                System.out.println("✅ 默认管理员用户创建成功！");
                System.out.println("👤 用户名: admin");
                System.out.println("🔑 密码: admin");
            }
        };
    }
} 