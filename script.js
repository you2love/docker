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