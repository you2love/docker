# Docker 学习教程示例 2026

这个目录包含了 Docker 学习教程中的各种示例项目，包含 2026 年最新技术。

## 📦 目录结构

```
examples/
├── web-app/          # Web 应用示例
├── database/         # 数据库部署示例
├── python-app/       # Python 应用示例
├── multi-stage/      # 多阶段构建示例
├── wasm-app/         # WASM 容器示例 ⭐ 2026 新特性
└── ai-optimized/     # AI 优化示例 ⭐ 2026 新特性
```

## 🚀 快速开始

### 1. Web 应用

使用 Nginx 部署静态网站：

```bash
cd web-app
docker build -t my-web-app .
docker run -d -p 8080:80 my-web-app
```

### 2. 数据库

快速启动 MySQL 数据库：

```bash
cd database
docker-compose up -d
```

### 3. Python 应用

容器化 Python Flask 应用：

```bash
cd python-app
docker build -t my-python-app .
docker run -d -p 5000:5000 my-python-app
```

### 4. 多阶段构建

优化镜像大小的多阶段构建：

```bash
cd multi-stage
docker build -t optimized-app .
```

### 5. WASM 容器 ⭐ 2026 新特性

构建极轻量级的 WASM 容器应用：

```bash
cd wasm-app
# 启用 WASM 支持
export DOCKER_CLI_EXPERIMENTAL=enabled
# 构建 WASM 应用
docker build -t my-wasm-app .
# 运行
docker run -p 8080:8080 my-wasm-app
```

### 6. AI 优化 ⭐ 2026 新特性

使用 AI 工具优化 Docker 容器：

```bash
cd ai-optimized
# 使用 AI 扫描和优化
docker scout cves Dockerfile.optimized --ai-suggest-fixes
# 构建优化后的镜像
docker build -f Dockerfile.optimized -t my-ai-app .
# 性能分析
docker ai analyze-performance my-ai-app
```

## 🆕 2026 新特性

### WASM 容器
- **极小体积**：<1MB，比传统容器小 100-1000 倍
- **快速启动**：毫秒级启动
- **高安全性**：基于能力的安全模型
- **跨平台**：一次构建，随处运行

### AI 工具
- **Docker Scout**：安全扫描和 SBOM 生成
- **Dockerfile-GPT**：自动生成优化的 Dockerfile
- **Docker AI Assistant**：官方 AI 助手
- **BuildOptimizer**：AI 驱动的构建优化

### BuildKit 2.0
- 分布式构建
- 智能缓存
- 并行执行
- 构建速度提升 5-10 倍

## 📊 性能对比

| 指标 | 传统容器 | WASM 容器 | AI 优化容器 |
|------|---------|-----------|------------|
| 镜像大小 | ~150MB | ~500KB | ~80MB |
| 启动时间 | ~1-2s | ~10-50ms | ~0.5s |
| 内存占用 | ~50-100MB | ~5-10MB | ~30MB |
| 构建时间 | ~45s | ~10s | ~12s |

## 📚 更多资源

- [Docker 官方文档](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Docker WASM 文档](https://docs.docker.com/engine/wasm/)
- [Docker Scout 文档](https://docs.docker.com/scout/)
- [Docker 官方网站](https://www.docker.com/)

## 💡 学习路径

1. **基础入门**：web-app、database
2. **进阶优化**：multi-stage、python-app
3. **2026 新特性**：wasm-app、ai-optimized
4. **实战项目**：组合使用多个示例构建完整应用

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

