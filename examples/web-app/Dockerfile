# Web 应用 Dockerfile

FROM nginx:alpine

# 复制自定义 Nginx 配置文件（可选）
# COPY nginx.conf /etc/nginx/nginx.conf

# 复制静态网站文件到 Nginx 默认目录
COPY index.html /usr/share/nginx/html/

# 暴露 80 端口
EXPOSE 80

# 启动 Nginx（默认命令）
CMD ["nginx", "-g", "daemon off;"]
