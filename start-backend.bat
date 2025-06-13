@echo off
echo 正在启动Spring Boot后端...
echo.

cd backend

echo 检查Maven是否可用...
mvn -version >nul 2>&1
if %errorlevel% neq 0 (
    echo Maven未找到，请确保已安装Maven并添加到PATH环境变量
    pause
    exit /b 1
)

echo Maven检查通过，开始编译和启动...
echo.

mvn clean install -DskipTests
if %errorlevel% neq 0 (
    echo Maven编译失败，请检查错误信息
    pause
    exit /b 1
)

echo 编译完成，启动Spring Boot应用...
echo.
echo 后端将在 http://localhost:8080/api 启动
echo Swagger文档: http://localhost:8080/api/swagger-ui.html
echo 默认管理员账号: admin / admin123
echo.

mvn spring-boot:run

pause 