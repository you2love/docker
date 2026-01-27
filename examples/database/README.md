# Docker 数据库示例

这个示例展示如何使用 Docker 快速部署 MySQL 数据库和 phpMyAdmin 管理工具。

## 快速开始

### 1. 启动服务

```bash
docker-compose up -d
```

### 2. 查看服务状态

```bash
docker-compose ps
```

### 3. 查看日志

```bash
docker-compose logs -f
```

### 4. 访问数据库

- **MySQL 数据库**: `localhost:3306`
  - 数据库名: `myapp`
  - 用户名: `appuser`
  - 密码: `userpassword`
  - Root 密码: `rootpassword`

- **phpMyAdmin**: http://localhost:8080
  - 用户名: `root`
  - 密码: `rootpassword`

### 5. 停止服务

```bash
docker-compose down
```

### 6. 删除数据（谨慎使用）

```bash
docker-compose down -v
```

## 单独使用 MySQL

如果你想只使用 MySQL 而不使用 Docker Compose：

```bash
docker run -d \
  --name mysql \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=myapp \
  -e MYSQL_USER=appuser \
  -e MYSQL_PASSWORD=userpassword \
  -p 3306:3306 \
  -v mysql-data:/var/lib/mysql \
  mysql:8.0
```

## 连接数据库

### 使用命令行

```bash
docker exec -it mysql mysql -u appuser -p
# 输入密码: userpassword
```

### 使用 Python

```python
import mysql.connector

conn = mysql.connector.connect(
    host='localhost',
    port=3306,
    user='appuser',
    password='userpassword',
    database='myapp'
)

cursor = conn.cursor()
cursor.execute("SELECT VERSION()")
version = cursor.fetchone()
print(f"MySQL 版本: {version[0]}")

cursor.close()
conn.close()
```

### 使用 Node.js

```javascript
const mysql = require('mysql2/promise');

async function main() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'appuser',
    password: 'userpassword',
    database: 'myapp'
  });

  const [rows] = await connection.execute('SELECT VERSION()');
  console.log('MySQL 版本:', rows[0]['VERSION()']);

  await connection.end();
}

main().catch(console.error);
```

## 注意事项

1. **数据持久化**: 使用 Docker volumes 来持久化数据库数据
2. **密码安全**: 在生产环境中使用环境变量或 secrets 管理密码
3. **备份**: 定期备份数据库数据
4. **网络**: 确保 Docker 网络配置正确

## 故障排除

### 容器无法启动

检查日志：
```bash
docker-compose logs mysql
```

### 无法连接数据库

1. 确认容器正在运行：`docker ps`
2. 检查端口映射：`docker port mysql`
3. 验证网络连接：`docker network ls`

### 查看数据卷

```bash
docker volume ls
docker volume inspect examples_mysql-data
```

## 更多资源

- [MySQL Docker 镜像文档](https://hub.docker.com/_/mysql)
- [Docker Compose 文档](https://docs.docker.com/compose/)
- [phpMyAdmin Docker 镜像](https://hub.docker.com/r/phpmyadmin/phpmyadmin)
