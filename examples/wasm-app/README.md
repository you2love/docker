# WASM 应用示例

这个示例展示如何使用 Docker 和 WebAssembly 技术构建极轻量级的应用。

## 🚀 什么是 WASM 容器？

WebAssembly (WASM) 容器是 Docker 的革命性特性：

- **极小体积**：通常 <1MB，比传统容器小 100-1000 倍
- **快速启动**：毫秒级启动，比传统容器快 10-100 倍
- **高安全性**：基于能力的安全模型
- **跨平台**：一次构建，随处运行

## 📋 前置要求

- Docker 27.0+（支持 WASM 运行时）
- 启用 WASM 实验性功能：

```bash
export DOCKER_CLI_EXPERIMENTAL=enabled
```

## 🛠️ 快速开始

### 1. 启用 WASM 运行时

```bash
# 安装 WASM 运行时（Spin 或 WasmEdge）
# 使用 Docker Desktop 自带的 WASM 支持
docker run --rm --privileged docker/binfmt:latest

# 验证 WASM 运行时
docker info | grep -i wasm
```

### 2. 运行 WASM 示例

```bash
# 运行简单的 WASM HTTP 服务
docker run --rm -p 8080:8080 wasmcloud/http-hello-world

# 访问 http://localhost:8080
```

### 3. 构建自己的 WASM 应用

```bash
# 使用 Spin 框架构建
docker build -t my-wasm-app .
docker run -p 8080:8080 my-wasm-app
```

## 📝 WASM Dockerfile 示例

查看 `Dockerfile` 了解如何构建 WASM 容器。

## 🔧 技术栈

- **WASM 运行时**：Spin / WasmEdge
- **开发语言**：支持 Rust、Go、Python、JavaScript、AssemblyScript 等
- **容器平台**：Docker 27.0+ with WASM runtime

## 📊 性能对比

| 指标 | 传统容器 | WASM 容器 | 提升 |
|------|---------|-----------|------|
| 镜像大小 | ~150MB | ~500KB | 300x |
| 启动时间 | ~1-2s | ~10-50ms | 40x |
| 内存占用 | ~50-100MB | ~5-10MB | 10x |
| 冷启动 | 慢 | 极快 | N/A |

## 🎯 适用场景

- **微服务**：轻量级服务部署
- **边缘计算**：资源受限环境
- **无服务器**：FaaS 场景
- **IoT 设备**：嵌入式系统
- **快速迭代**：需要频繁更新的应用

## 🔗 资源链接

- [Docker WASM 文档](https://docs.docker.com/engine/wasm/)
- [Spin 框架](https://www.fermyon.com/spin)
- [WasmEdge](https://wasmedge.org/)
- [WebAssembly 官网](https://webassembly.org/)
