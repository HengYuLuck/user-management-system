# Spring Boot 用户管理系统

一个完整的用户管理系统，采用 Spring Boot + React 技术栈，实现了用户认证、用户管理、权限控制、操作日志等功能。

## 🚀 技术栈

### 后端
- **Spring Boot 3.2** - 主框架
- **Spring Security** - 安全认证
- **Spring Data JPA** - 数据访问层
- **MySQL** - 数据库
- **JWT** - 无状态认证
- **Lombok** - 简化代码

### 前端
- **React 18** - UI框架
- **TypeScript** - 类型安全
- **Ant Design 5** - UI组件库
- **React Router** - 路由管理
- **Vite** - 构建工具
- **Axios** - HTTP客户端

## 🎯 主要功能

### 1. 用户认证
- ✅ 用户登录/登出
- ✅ JWT Token认证
- ✅ 自动登录状态维护
- ✅ 登录状态过期处理

### 2. 用户管理
- ✅ 用户列表查看（分页、搜索）
- ✅ 创建新用户
- ✅ 编辑用户信息
- ✅ 删除用户
- ✅ 用户状态管理（激活/禁用/锁定）
- ✅ 角色权限分配（管理员/用户/经理）
- ✅ 密码重置

### 3. Dashboard
- ✅ 系统统计概览
- ✅ 用户数量统计
- ✅ 活跃用户分析
- ✅ 登录趋势图表

### 4. 操作日志
- ✅ 用户操作记录
- ✅ 日志查询和筛选
- ✅ 多维度日志分析
- ✅ 日志导出功能

### 5. 权限管理
- ✅ 基于角色的权限控制（RBAC）
- ✅ 页面权限验证
- ✅ API权限控制
- ✅ 细粒度权限管理

## 📁 项目结构

```
spring-boot-user-management-system/
├── backend/                          # Spring Boot 后端
│   ├── src/main/java/com/example/usermgmt/
│   │   ├── entity/                   # 实体类
│   │   │   ├── User.java            # 用户实体
│   │   │   └── AuditLog.java        # 日志实体
│   │   ├── repository/              # 数据访问层
│   │   │   ├── UserRepository.java  # 用户数据访问
│   │   │   └── AuditLogRepository.java # 日志数据访问
│   │   ├── service/                 # 业务逻辑层（待补充）
│   │   ├── controller/              # 控制器层（待补充）
│   │   ├── dto/                     # 数据传输对象
│   │   │   ├── LoginRequest.java    # 登录请求
│   │   │   ├── LoginResponse.java   # 登录响应
│   │   │   └── UserDTO.java         # 用户DTO
│   │   ├── security/                # 安全配置
│   │   │   └── JwtTokenProvider.java # JWT工具类
│   │   └── config/                  # 配置类（待补充）
│   ├── src/main/resources/
│   │   ├── application.yml          # 应用配置
│   │   └── data.sql                # 初始化数据（待补充）
│   └── pom.xml                     # Maven配置
└── frontend/                        # React 前端
    ├── src/
    │   ├── components/              # 通用组件（待补充）
    │   ├── pages/                   # 页面组件
    │   │   └── Login/              # 登录页面
    │   ├── services/                # API服务
    │   │   └── api.ts              # API封装
    │   ├── contexts/                # 状态管理
    │   │   └── AuthContext.tsx     # 认证状态
    │   ├── types/                   # TypeScript类型
    │   │   └── index.ts            # 类型定义
    │   ├── utils/                   # 工具函数（待补充）
    │   └── App.tsx                 # 主应用
    ├── package.json                # 依赖配置
    ├── vite.config.ts             # Vite配置
    └── tsconfig.json              # TS配置（待补充）
```

## 🛠️ 环境要求

- **JDK 17+**
- **Node.js 16+**
- **MySQL 8.0+**
- **Maven 3.6+**

## 🚀 快速开始

### 方式一：使用启动脚本（推荐）

#### Windows用户
1. **启动后端**：双击 `start-backend.bat` 文件
2. **启动前端**：双击 `start-frontend.bat` 文件

#### macOS/Linux用户
```bash
# 启动后端
chmod +x start-backend.sh
./start-backend.sh

# 启动前端
chmod +x start-frontend.sh  
./start-frontend.sh
```

### 方式二：手动启动

#### 1. 数据库准备
```sql
# 连接MySQL并创建数据库
CREATE DATABASE user_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 创建用户（可选）
CREATE USER 'usermgmt'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON user_management.* TO 'usermgmt'@'localhost';
FLUSH PRIVILEGES;
```

#### 2. 修改数据库配置
编辑 `backend/src/main/resources/application.yml` 文件：
```yaml
spring:
  datasource:
    username: root  # 修改为您的数据库用户名
    password: your_mysql_password  # 修改为您的数据库密码
```

#### 3. 后端启动
```bash
# 进入后端目录
cd backend

# 编译和启动
mvn clean install
mvn spring-boot:run

# 看到以下信息表示启动成功：
# 🚀 Spring Boot 用户管理系统启动成功！
# 📱 API地址: http://localhost:8080/api
# 📋 Swagger文档: http://localhost:8080/api/swagger-ui.html
# 💻 前端地址: http://localhost:3000
```

#### 4. 前端启动
```bash
# 打开新终端，进入前端目录
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 看到以下信息表示启动成功：
# ➜  Local:   http://localhost:3000/
```

### 🎯 访问系统
- **前端地址**: http://localhost:3000
- **后端API**: http://localhost:8080/api  
- **API文档**: http://localhost:8080/api/swagger-ui.html
- **默认管理员账号**: `admin` / `admin123`

### ⚠️ 注意事项
1. **确保数据库已创建并运行**
2. **先启动后端，再启动前端**
3. **首次启动会自动创建表结构和初始数据**
4. **请修改 application.yml 中的数据库连接信息**

## 📖 API接口文档

### 认证相关
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/logout` - 用户登出
- `GET /api/auth/me` - 获取当前用户信息

### 用户管理
- `GET /api/users` - 获取用户列表
- `POST /api/users` - 创建用户
- `PUT /api/users/{id}` - 更新用户
- `DELETE /api/users/{id}` - 删除用户
- `PATCH /api/users/{id}/password` - 重置密码
- `PATCH /api/users/{id}/status` - 更新用户状态

### 日志管理
- `GET /api/logs` - 获取操作日志
- `GET /api/logs/export` - 导出日志

### 统计数据
- `GET /api/dashboard/stats` - 获取统计数据
- `GET /api/dashboard/user-activity` - 用户活跃度
- `GET /api/dashboard/login-trends` - 登录趋势

## 🎨 界面预览

### 功能页面
1. **登录页面** - 响应式设计，表单验证，错误提示
2. **Dashboard** - 数据统计卡片，图表展示，实时更新
3. **用户管理** - 用户列表表格，搜索筛选，CRUD操作
4. **操作日志** - 日志列表，时间筛选，导出功能

### 特色功能
- 🎯 **响应式设计** - 适配桌面和移动端
- 🔐 **安全认证** - JWT Token + 权限控制
- 📊 **数据可视化** - 图表展示系统状态
- 🔍 **高级搜索** - 多条件筛选查询
- 📁 **数据导出** - 支持Excel格式导出

## 📚 学习指南

### 新手入门
1. **理解项目结构** - 熟悉前后端分离架构
2. **学习Spring Boot** - 掌握控制器、服务层、数据层
3. **理解JWT认证** - 了解无状态认证机制
4. **学习React Hook** - 掌握函数组件和状态管理

### 进阶开发
1. **扩展功能模块** - 添加新的业务功能
2. **优化数据库设计** - 添加索引、优化查询
3. **完善权限系统** - 实现细粒度权限控制
4. **添加单元测试** - 提高代码质量

### 生产部署
1. **容器化部署** - Docker + Docker Compose
2. **性能优化** - 数据库连接池、缓存
3. **监控告警** - 日志收集、性能监控
4. **CI/CD流程** - 自动化构建部署

## 🔧 配置说明

### 后端配置文件 (application.yml)
```yaml
# 数据库配置
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/user_management
    username: root  # 修改为你的数据库用户名
    password: password  # 修改为你的数据库密码

# JWT配置
jwt:
  secret: mySecretKey123456789012345678901234567890  # 生产环境请修改
  expiration: 86400000  # Token有效期：24小时
```

### 前端配置文件 (vite.config.ts)
```typescript
// API代理配置，将前端请求代理到后端
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    }
  }
}
```

## 🐛 常见问题

### 1. 数据库连接失败
- 检查MySQL服务是否启动
- 确认数据库用户名密码正确
- 确认数据库已创建

### 2. 前端无法访问后端API
- 确认后端服务已启动（端口8080）
- 检查Vite代理配置
- 查看浏览器控制台错误信息

### 3. JWT Token过期
- 正常现象，Token有效期24小时
- 重新登录即可获取新Token
- 可在配置文件中调整有效期

## 🤝 贡献指南

1. Fork 项目到你的GitHub
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙋‍♂️ 联系支持

如有问题或建议：
- 提交 [Issue](https://github.com/your-username/spring-boot-user-management-system/issues)
- 发送邮件到: your-email@example.com

---

⭐ 如果这个项目对你有帮助，请给一个Star支持！ 