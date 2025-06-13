CREATE DATABASE IF NOT EXISTS user_management_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'app_user'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON user_management_system.* TO 'app_user'@'localhost';
FLUSH PRIVILEGES; 