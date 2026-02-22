// 初始化 Prism.js 语法高亮
document.addEventListener('DOMContentLoaded', function() {
    // 如果 Prism.js 已加载，初始化所有代码块
    if (typeof Prism !== 'undefined') {
        // 延迟执行以确保DOM完全加载
        setTimeout(function() {
            // 遍历所有pre标签
            document.querySelectorAll('pre').forEach(function(pre) {
                // 检查是否已经有语言类名
                const hasLanguage = Array.from(pre.classList).some(className => 
                    className.startsWith('language-')
                );
                
                // 如果还没有语言类名，添加bash（默认）
                if (!hasLanguage) {
                    pre.classList.add('language-bash');
                }
            });
            
            // 初始化Prism.js高亮
            Prism.highlightAll();
            
            // 初始化代码折叠功能
            initCodeFolding();
        }, 100);
    }
});

// 初始化代码折叠功能
function initCodeFolding() {
    document.querySelectorAll('pre').forEach(pre => {
        // 检查代码块是否过长需要折叠
        if (pre.scrollHeight > 500) {
            // 添加折叠类
            pre.classList.add('collapsed');
            
            // 创建折叠按钮
            const foldButton = document.createElement('button');
            foldButton.className = 'fold-toggle';
            foldButton.textContent = '展开';
            foldButton.addEventListener('click', function(e) {
                e.stopPropagation();
                pre.classList.toggle('collapsed');
                this.textContent = pre.classList.contains('collapsed') ? '展开' : '收起';
            });
            
            pre.appendChild(foldButton);
        }
    });
}

// 平滑滚动
document.querySelectorAll('.tree-nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 20;
            const top = target.offsetTop - offset;
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        }
    });
});

// 复制代码功能
document.querySelectorAll('pre').forEach(pre => {
    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.textContent = '复制';

    pre.appendChild(button);

    button.addEventListener('click', () => {
        const code = pre.querySelector('code');
        if (code) {
            navigator.clipboard.writeText(code.textContent).then(() => {
                button.textContent = '已复制';
                setTimeout(() => {
                    button.textContent = '复制';
                }, 2000);
            });
        }
    });
});

// 高亮当前导航
function highlightNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.tree-nav a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 50;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNav);
highlightNav();