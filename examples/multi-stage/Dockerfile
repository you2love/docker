# 构建阶段 - 使用完整的 Node.js 环境
FROM node:18 AS builder

# 设置工作目录
WORKDIR /app

# 复制 package 文件
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制源代码
COPY . .

# 构建应用（模拟构建过程）
RUN echo "Building application..." && \
    mkdir -p dist && \
    cp src/index.html dist/index.html

# 运行阶段 - 使用轻量级的 Nginx
FROM nginx:alpine

# 从构建阶段复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制自定义 Nginx 配置（可选）
# COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
