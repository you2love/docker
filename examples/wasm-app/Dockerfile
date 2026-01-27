# syntax=docker/dockerfile:1.6

# 构建阶段 - 使用 Spin 框架
FROM ghcr.io/spinframework/spin:latest AS builder

WORKDIR /app

# 复制 Spin 配置文件
COPY spin.toml .

# 如果有源代码，复制并构建
# COPY src/ ./src/
# RUN spin build

# 对于这个示例，我们使用一个预构建的 WASM 模块
RUN echo "Building WASM application..."

# 运行阶段 - 使用极小的基础镜像
FROM scratch

# 从构建阶段复制文件
COPY --from=builder /app/spin.toml .
# COPY --from=builder /app/app.wasm ./app.wasm

# 注意：实际使用时需要安装 WASM 运行时
# 这里演示概念，实际部署需要：
# 1. 使用包含 WASM 运行时的镜像
# 2. 或在运行时挂载 WASM 运行时

# 替代方案：使用轻量级 WASM 运行时镜像
# FROM ghcr.io/spinframework/spin:latest
# COPY --from=builder /app/spin.toml .
# COPY --from=builder /app/app.wasm ./app.wasm

# 暴露端口
EXPOSE 8080

# 使用 Spin 运行 WASM 应用
CMD ["spin", "up"]
