# 🚀 快速启动指南

## 1. 环境准备 ✅

确保你已安装：
- **JDK 17+** 
- **Node.js 16+**
- **MySQL 8.0+**
- **Maven 3.6+**

## 2. 数据库准备 🗄️

```sql
-- 1. 启动MySQL服务
-- 2. 连接到MySQL并执行以下命令：

CREATE DATABASE user_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 可选：创建专用用户
CREATE USER 'usermgmt'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON user_management.* TO 'usermgmt'@'localhost';
FLUSH PRIVILEGES;
```

## 3. 后端启动 ⚙️

```bash
# 1. 进入后端目录
cd backend

# 2. 修改配置文件（重要！）
# 编辑 src/main/resources/application.yml
# 修改以下配置：
#   spring.datasource.username: 你的MySQL用户名
#   spring.datasource.password: 你的MySQL密码

# 3. 启动后端服务
mvn clean install
mvn spring-boot:run

# ✅ 看到以下信息表示启动成功：
# 🚀 Spring Boot 用户管理系统启动成功！
# 📱 API地址: http://localhost:8080/api
```

## 4. 前端启动 🖥️

```bash
# 1. 打开新的终端窗口
# 2. 进入前端目录
cd frontend

# 3. 安装依赖
npm install

# 4. 启动开发服务器
npm run dev

# ✅ 看到以下信息表示启动成功：
# Local:   http://localhost:3000/
```

## 5. 访问系统 🌐

- **前端地址**: http://localhost:3000
- **默认账户**: admin / admin123

## 6. 验证功能 ✨

1. 打开浏览器访问 http://localhost:3000
2. 使用 admin / admin123 登录
3. 查看Dashboard页面
4. 测试用户管理功能
5. 查看操作日志

## 🐛 遇到问题？

### 后端启动失败
- 检查MySQL服务是否启动
- 确认application.yml中的数据库配置
- 查看控制台错误信息

### 前端无法访问后端
- 确认后端在8080端口运行
- 检查防火墙设置
- 查看浏览器控制台Network面板

### 登录失败
- 确认后端启动成功
- 检查网络连接
- 使用正确的用户名密码：admin / admin123

---

🎉 **恭喜！你的Spring Boot用户管理系统已经成功运行！** 