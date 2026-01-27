from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def hello():
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Docker Python Flask App</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                margin: 0;
            }
            .container {
                background: white;
                padding: 40px;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                text-align: center;
            }
            h1 { color: #333; }
            .whale { font-size: 80px; }
            p { color: #666; line-height: 1.6; }
            .info {
                background: #f0f9ff;
                padding: 20px;
                margin: 20px 0;
                border-radius: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="whale">🐳</div>
            <h1>Python Flask 应用</h1>
            <p>这是一个运行在 Docker 容器中的 Flask 应用</p>
            <div class="info">
                <strong>状态：</strong> 运行中<br>
                <strong>框架：</strong> Flask<br>
                <strong>容器化：</strong> Docker
            </div>
            <p>访问 <a href="/api/health">/api/health</a> 查看健康状态</p>
        </div>
    </body>
    </html>
    """

@app.route('/api/health')
def health():
    return jsonify({
        'status': 'healthy',
        'service': 'flask-app',
        'version': '1.0.0'
    })

@app.route('/api/info')
def info():
    return jsonify({
        'name': 'Docker Python Flask App',
        'description': '一个简单的 Flask API 示例',
        'endpoints': {
            '/': '主页',
            '/api/health': '健康检查',
            '/api/info': 'API 信息'
        }
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
