@echo off
chcp 65001 >nul
title 数据库设置

echo ========================================
echo        数据库初始化设置
echo ========================================
echo.

echo [1/3] 检查MySQL安装...
if exist "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" (
    echo ✅ MySQL Server 8.0 已找到
    set MYSQL_PATH="C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"
) else if exist "C:\Program Files\MySQL\MySQL Server 8.1\bin\mysql.exe" (
    echo ✅ MySQL Server 8.1 已找到  
    set MYSQL_PATH="C:\Program Files\MySQL\MySQL Server 8.1\bin\mysql.exe"
) else if exist "C:\Program Files\MySQL\MySQL Server 8.2\bin\mysql.exe" (
    echo ✅ MySQL Server 8.2 已找到
    set MYSQL_PATH="C:\Program Files\MySQL\MySQL Server 8.2\bin\mysql.exe"
) else (
    echo ❌ 未找到MySQL安装
    echo    请确保MySQL已正确安装
    pause
    exit /b 1
)

echo.
echo [2/3] 连接MySQL并创建数据库...
echo 请输入MySQL root用户的密码:

%MYSQL_PATH% -u root -p < database-setup.sql

if %errorlevel% neq 0 (
    echo ❌ 数据库创建失败！
    echo    请检查MySQL密码是否正确
    pause
    exit /b 1
)

echo ✅ 数据库创建成功！
echo.

echo [3/3] 验证数据库...
echo 验证数据库是否创建成功...

%MYSQL_PATH% -u app_user -ppassword123 -e "USE user_management_system; SELECT 'Database connection successful!' as Status;"

if %errorlevel% neq 0 (
    echo ⚠️  警告: 数据库用户连接测试失败
    echo    但这可能是正常的，Spring Boot会在启动时创建表
) else (
    echo ✅ 数据库用户连接测试成功！
)

echo.
echo ========================================
echo        数据库设置完成！
echo ========================================
echo.
echo 下一步你可以：
echo 1. 启动后端: cd backend ^&^& mvn spring-boot:run  
echo 2. 启动前端: start-frontend.bat
echo.
pause 