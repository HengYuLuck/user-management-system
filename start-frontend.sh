#!/bin/bash

# 设置颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "========================================"
echo "  Spring Boot 用户管理系统 - 前端启动"
echo "========================================"
echo -e "${NC}"

echo -e "${YELLOW}[1/6] 检查当前目录...${NC}"
echo "当前目录: $(pwd)"
echo

echo -e "${YELLOW}[2/6] 检查frontend目录是否存在...${NC}"
if [ ! -d "frontend" ]; then
    echo -e "${RED}❌ 错误: frontend目录不存在！${NC}"
    echo "   请确保在项目根目录下运行此脚本"
    echo "   当前目录应包含 frontend 文件夹"
    echo
    echo "当前目录下的内容:"
    ls -la
    echo
    read -p "按Enter键退出..."
    exit 1
fi
echo -e "${GREEN}✅ frontend目录存在${NC}"

cd frontend
echo "切换到目录: $(pwd)"
echo

echo -e "${YELLOW}[3/6] 检查Node.js是否已安装...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ 错误: Node.js未找到！${NC}"
    echo "   请先安装Node.js: https://nodejs.org/"
    echo "   或使用包管理器安装:"
    echo "   - macOS: brew install node"
    echo "   - Ubuntu: sudo apt install nodejs npm"
    echo "   - CentOS: sudo yum install nodejs npm"
    echo
    read -p "按Enter键退出..."
    exit 1
fi

NODE_VERSION=$(node --version)
echo -e "${GREEN}✅ Node.js已安装: $NODE_VERSION${NC}"

echo -e "${YELLOW}[4/6] 检查npm是否可用...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ 错误: npm未找到！${NC}"
    echo "   npm通常随Node.js一起安装"
    echo "   请重新安装Node.js"
    echo
    read -p "按Enter键退出..."
    exit 1
fi

NPM_VERSION=$(npm --version)
echo -e "${GREEN}✅ npm已安装: $NPM_VERSION${NC}"
echo

echo -e "${YELLOW}[5/6] 检查package.json文件...${NC}"
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ 错误: package.json文件不存在！${NC}"
    echo "   请确保在正确的前端目录中"
    echo
    read -p "按Enter键退出..."
    exit 1
fi
echo -e "${GREEN}✅ package.json文件存在${NC}"

echo -e "${YELLOW}[6/6] 安装依赖包（如果需要）...${NC}"
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}📦 首次运行，正在安装依赖包...${NC}"
    echo "   这可能需要几分钟时间，请耐心等待..."
    echo
    
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ npm安装失败！${NC}"
        echo "   可能的解决方案:"
        echo "   1. 检查网络连接"
        echo "   2. 尝试使用国内镜像: npm config set registry https://registry.npmmirror.com"
        echo "   3. 清除npm缓存: npm cache clean --force"
        echo
        read -p "按Enter键退出..."
        exit 1
    fi
    echo -e "${GREEN}✅ 依赖包安装完成！${NC}"
else
    echo -e "${GREEN}✅ 依赖包已存在，跳过安装${NC}"
fi
echo

echo -e "${BLUE}"
echo "========================================"
echo "           🚀 启动开发服务器"
echo "========================================"
echo -e "${NC}"
echo
echo "前端将在 http://localhost:3000 启动"
echo "请确保后端已在 http://localhost:8080 运行"
echo
echo "启动中，请稍候..."
echo

npm run dev

if [ $? -ne 0 ]; then
    echo
    echo -e "${RED}❌ 启动失败！${NC}"
    echo "   请检查上面的错误信息"
    echo
fi

echo
read -p "按Enter键退出..." 