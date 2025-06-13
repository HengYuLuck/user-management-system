@echo off
chcp 65001 >nul
title Spring Boot 后端启动

echo ========================================
echo     Spring Boot 后端启动测试
echo ========================================
echo.

echo [1/4] 检查当前目录...
if not exist "backend\pom.xml" (
    echo ❌ 错误: 未找到backend\pom.xml
    echo    请确保在项目根目录运行此脚本
    pause
    exit /b 1
)
echo ✅ 找到backend项目

echo.
echo [2/4] 检查Maven...
mvn --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误: Maven未找到
    echo    请确保Maven已安装并添加到PATH
    pause
    exit /b 1
)
echo ✅ Maven已安装

echo.
echo [3/4] 检查Java...
java --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误: Java未找到
    echo    请确保Java 17+已安装
    pause
    exit /b 1
)
echo ✅ Java已安装

echo.
echo [4/4] 切换到backend目录并启动...
cd backend

echo 正在编译和启动Spring Boot应用...
echo 这可能需要几分钟时间...
echo.
echo 如果看到 "Started UserManagementSystemApplication" 说明启动成功
echo 访问 http://localhost:8080/api/swagger-ui.html 查看API文档
echo 按 Ctrl+C 停止应用
echo.

mvn spring-boot:run 