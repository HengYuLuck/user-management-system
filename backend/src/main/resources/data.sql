-- 插入默认管理员账户
INSERT IGNORE INTO users (username, password, email, first_name, last_name, role, status, created_at, updated_at) 
VALUES (
    'admin', 
    '$2a$10$lkQ5RF2LqEbP8GUmSQM6oeNSCOLMy7CYGFDvq7VYZhfCOJVcLWqJ6', 
    'admin@example.com', 
    'Admin', 
    'User', 
    'ADMIN', 
    'ACTIVE', 
    NOW(), 
    NOW()
); 