-- =======================================
-- Spring Boot 用户管理系统数据库初始化脚本
-- =======================================

-- 创建数据库
CREATE DATABASE IF NOT EXISTS user_management_system 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- 使用数据库
USE user_management_system;

-- 创建应用用户
CREATE USER IF NOT EXISTS 'app_user'@'localhost' IDENTIFIED BY 'password123';

-- 授权
GRANT ALL PRIVILEGES ON user_management_system.* TO 'app_user'@'localhost';

-- 刷新权限
FLUSH PRIVILEGES;

-- 显示创建结果
SELECT 'Database and user created successfully!' as Status;

-- 显示数据库信息
SHOW DATABASES LIKE 'user_management_system';

-- 显示用户权限
SHOW GRANTS FOR 'app_user'@'localhost'; 