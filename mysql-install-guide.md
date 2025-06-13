# MySQL 安装和配置指南

## 第1步：下载和安装 MySQL

### Windows 用户：

1. **下载 MySQL 安装程序**
   - 访问：https://dev.mysql.com/downloads/mysql/
   - 选择 "MySQL Installer for Windows"
   - 下载 "mysql-installer-web-community-8.x.x.msi"

2. **安装 MySQL**
   - 运行下载的安装程序
   - 选择 "Developer Default" 或 "Server only"
   - 点击 "Execute" 开始安装

3. **配置 MySQL**
   - **Authentication Method**: 选择 "Use Strong Password Encryption"
   - **Root Password**: 设置为 `root123` (或你记得住的密码)
   - **MySQL User**: 可以先跳过，我们后面用脚本创建
   - **Windows Service**: 保持默认设置
   - **Apply Configuration**: 点击执行

4. **验证安装**
   ```bash
   # 打开命令提示符，测试MySQL是否安装成功
   mysql --version
   ```

## 第2步：启动 MySQL 服务

### Windows：
```bash
# 启动服务
net start mysql80

# 或者通过服务管理器启动
# Win+R -> services.msc -> 找到MySQL80 -> 启动
```

## 第3步：连接到 MySQL 并创建数据库

1. **连接到 MySQL**
   ```bash
   mysql -u root -p
   ```
   输入你设置的root密码

2. **执行初始化脚本**
   ```sql
   -- 复制粘贴 database-setup.sql 文件中的内容
   -- 或者直接执行：
   source /path/to/database-setup.sql
   ```

3. **验证创建结果**
   ```sql
   -- 查看数据库
   SHOW DATABASES;
   
   -- 切换到我们的数据库
   USE user_management_system;
   
   -- 查看表（此时应该为空，Spring Boot会自动创建）
   SHOW TABLES;
   
   -- 退出MySQL
   EXIT;
   ```

## 第4步：测试连接

现在你可以测试Spring Boot是否能连接到数据库：

```bash
cd backend
mvn spring-boot:run
```

如果看到类似这样的日志，说明连接成功：
```
2024-xx-xx xx:xx:xx - HikariPool-1 - Starting...
2024-xx-xx xx:xx:xx - HikariPool-1 - Start completed.
```

## 常见问题解决

### 1. 如果忘记root密码：
```bash
# 停止MySQL服务
net stop mysql80

# 安全模式启动MySQL
mysqld --skip-grant-tables

# 在新的命令窗口连接
mysql -u root

# 重置密码
ALTER USER 'root'@'localhost' IDENTIFIED BY 'root123';
FLUSH PRIVILEGES;
EXIT;

# 重启正常模式
net start mysql80
```

### 2. 如果连接被拒绝：
- 检查MySQL服务是否启动
- 检查端口3306是否被占用
- 检查防火墙设置

### 3. 如果字符编码问题：
在 `my.ini` 文件中确保：
```ini
[mysql]
default-character-set=utf8mb4

[mysqld]
character-set-server=utf8mb4
collation-server=utf8mb4_unicode_ci
```

## 下一步

完成MySQL安装后，你就可以：
1. 启动后端：`cd backend && mvn spring-boot:run`
2. 启动前端：运行 `start-frontend.bat`
3. 访问 http://localhost:3000 查看应用
4. 访问 http://localhost:8080/api/swagger-ui.html 查看API文档 