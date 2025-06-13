@echo off
chcp 65001 >nul
title Spring Boot 用户管理系统 - 前端启动

echo.
echo ========================================
echo   Spring Boot 用户管理系统 - 前端启动
echo ========================================
echo.

echo [1/6] 检查当前目录...
echo 当前目录: %cd%
echo.

echo [2/6] 检查frontend目录是否存在...
if not exist "frontend" (
    echo ❌ 错误: frontend目录不存在！
    echo    请确保在项目根目录下运行此脚本
    echo    当前目录应包含 frontend 文件夹
    echo.
    dir /B | findstr /I "frontend" >nul
    if %errorlevel% neq 0 (
        echo 当前目录下的文件夹:
        dir /AD /B
    )
    echo.
    pause
    exit /b 1
)
echo ✅ frontend目录存在

cd frontend
echo 切换到目录: %cd%
echo.

echo [3/6] 检查Node.js是否已安装...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误: Node.js未找到！
    echo    请先安装Node.js: https://nodejs.org/
    echo    安装后重启命令提示符
    echo.
    pause
    exit /b 1
)

for /f %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js已安装: %NODE_VERSION%

echo [4/6] 检查npm是否可用...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误: npm未找到！
    echo    npm通常随Node.js一起安装
    echo    请重新安装Node.js
    echo.
    pause
    exit /b 1
)

for /f %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm已安装: %NPM_VERSION%
echo.

echo [5/6] 检查package.json文件...
if not exist "package.json" (
    echo ❌ 错误: package.json文件不存在！
    echo    请确保在正确的前端目录中
    echo.
    pause
    exit /b 1
)
echo ✅ package.json文件存在

echo [6/6] 安装依赖包（如果需要）...
if not exist "node_modules" (
    echo 📦 首次运行，正在安装依赖包...
    echo    这可能需要几分钟时间，请耐心等待...
    echo.
    
    npm install
    if %errorlevel% neq 0 (
        echo ❌ npm安装失败！
        echo    可能的解决方案:
        echo    1. 检查网络连接
        echo    2. 尝试使用国内镜像: npm config set registry https://registry.npmmirror.com
        echo    3. 清除npm缓存: npm cache clean --force
        echo.
        pause
        exit /b 1
    )
    echo ✅ 依赖包安装完成！
) else (
    echo ✅ 依赖包已存在，跳过安装
)
echo.

echo ========================================
echo           🚀 启动开发服务器
echo ========================================
echo.
echo 前端将在 http://localhost:3000 启动
echo 请确保后端已在 http://localhost:8080 运行
echo.
echo 启动中，请稍候...
echo.

npm run dev

if %errorlevel% neq 0 (
    echo.
    echo ❌ 启动失败！
    echo    请检查上面的错误信息
    echo.
)

echo.
echo 按任意键关闭窗口...
pause >nul 