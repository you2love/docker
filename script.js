// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // 头部高度
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
    button.style.cssText = `
        position: absolute;
        top: 8px;
        right: 8px;
        padding: 4px 8px;
        font-size: 12px;
        background: rgba(255,255,255,0.1);
        border: none;
        border-radius: 4px;
        color: #c9d1d9;
        cursor: pointer;
    `;

    pre.style.position = 'relative';
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
    const navLinks = document.querySelectorAll('.nav a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + current ? '#fff' : '#c9d1d9';
    });
}

window.addEventListener('scroll', highlightNav);