# Spring Boot User Management System

一个基于 Spring Boot + React 的完整用户管理系统，包含用户认证、用户管理、审计日志和管理仪表板等功能。

## 🚀 功能特性

### 后端功能 (Spring Boot)
- **用户认证**: 登录/登出功能
- **用户管理**: CRUD 操作、状态管理、密码重置
- **审计日志**: 操作记录追踪
- **管理仪表板**: 数据统计和图表展示
- **用户资料**: 个人信息管理和密码修改

### 前端功能 (React + TypeScript)
- **现代 UI**: 基于 Ant Design 的响应式界面
- **路由管理**: React Router 导航
- **状态管理**: Context API 全局状态
- **数据可视化**: 图表和统计展示
- **表单验证**: 完整的表单验证机制

## 🛠️ 技术栈

### 后端技术
- **Java 17+**
- **Spring Boot 2.7+**
- **Spring Security** - 安全认证
- **Spring Data JPA** - 数据持久化
- **Maven** - 项目管理

### 前端技术
- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Ant Design** - UI 组件库
- **Axios** - HTTP 客户端

## 📦 项目结构

```
spring-boot-user-management-system/
├── backend/                    # Spring Boot 后端
│   ├── src/main/java/
│   │   └── com/example/usermgmt/
│   │       ├── controller/     # REST 控制器
│   │       ├── service/        # 业务逻辑
│   │       ├── entity/         # 数据实体
│   │       ├── repository/     # 数据访问
│   │       ├── dto/           # 数据传输对象
│   │       └── config/        # 配置类
│   └── pom.xml                # Maven 配置
├── frontend/                   # React 前端
│   ├── src/
│   │   ├── components/        # 可复用组件
│   │   ├── pages/             # 页面组件
│   │   ├── services/          # API 服务
│   │   ├── contexts/          # React Context
│   │   └── types/             # TypeScript 类型
│   └── package.json           # npm 配置
└── README.md                  # 项目说明
```

## 🚀 快速开始

### 环境要求
- **Java 17+**
- **Node.js 16+**
- **Maven 3.6+**

### 后端启动

1. 进入后端目录：
```bash
cd backend
```

2. 编译并启动：
```bash
mvn clean compile
mvn spring-boot:run
```

后端将在 `http://localhost:8080` 启动

### 前端启动

1. 进入前端目录：
```bash
cd frontend
```

2. 安装依赖：
```bash
npm install
```

3. 启动开发服务器：
```bash
npm run dev
```

前端将在 `http://localhost:3000` 启动

## 📝 API 接口

### 认证接口
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/logout` - 用户登出

### 用户管理
- `GET /api/users` - 获取用户列表（分页）
- `POST /api/users` - 创建用户
- `PUT /api/users/{id}` - 更新用户
- `DELETE /api/users/{id}` - 删除用户
- `PUT /api/users/{id}/status` - 更新用户状态

### 仪表板
- `GET /api/dashboard/stats` - 获取统计数据

### 审计日志
- `GET /api/audit-logs` - 获取审计日志（分页）
- `GET /api/audit-logs/export` - 导出 CSV

## 🔧 配置说明

### 默认登录账号
- **用户名**: `admin`
- **密码**: `admin123`

### 端口配置
- **后端端口**: 8080
- **前端端口**: 3000

## 📊 系统特性

### 安全特性
- Spring Security 集成
- JWT Token 认证（待实现）
- 权限控制

### 数据特性
- 分页查询支持
- 数据验证
- 审计日志记录

### UI 特性
- 响应式设计
- 深色/浅色主题
- 国际化支持（待实现）

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

该项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- GitHub Issues: [https://github.com/HengYuLuck/user-management-system/issues](https://github.com/HengYuLuck/user-management-system/issues)
- Email: [您的邮箱]

## 🔄 更新日志

### v1.0.0 (2025-06-13)
- 初始版本发布
- 基础用户管理功能
- 认证系统
- 管理仪表板
- 审计日志功能 