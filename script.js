// 标签页切换
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');

            // 移除所有活动状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // 添加活动状态
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 导航栏滚动效果
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // 添加过渡效果
    navbar.style.transition = 'transform 0.3s ease';
});

// 复制代码功能
function copyCode(button) {
    const codeContainer = button.parentElement;
    const code = codeContainer.querySelector('code').textContent;

    navigator.clipboard.writeText(code).then(function() {
        const originalText = button.textContent;
        button.textContent = '已复制!';
        button.style.background = '#28a745';

        setTimeout(function() {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    }).catch(function(err) {
        console.error('无法复制:', err);
        alert('复制失败，请手动复制');
    });
}

// 展开示例详情
function expandExample(button) {
    const card = button.closest('.example-card');
    const isExpanded = card.classList.contains('expanded');

    if (isExpanded) {
        card.classList.remove('expanded');
        button.textContent = '查看完整示例';
    } else {
        card.classList.add('expanded');
        button.textContent = '收起示例';
    }
}

// 添加元素可见性观察器（滚动动画）
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 为所有卡片添加观察器
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.feature-card, .example-card, .practice-item, .command-category');

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// 搜索功能（可选）
function createSearchBox() {
    const navbar = document.querySelector('.nav-menu');
    const searchBox = document.createElement('li');
    searchBox.innerHTML = `
        <input type="text" id="search-input" placeholder="搜索..." style="
            padding: 8px 12px;
            border: none;
            border-radius: 4px;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            font-size: 14px;
            width: 150px;
        ">
    `;
    navbar.appendChild(searchBox);

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const allContent = document.querySelectorAll('h2, h3, p, code');

        allContent.forEach(element => {
            if (searchTerm && element.textContent.toLowerCase().includes(searchTerm)) {
                element.style.background = '#fff3cd';
                setTimeout(() => {
                    element.style.background = '';
                }, 2000);
            }
        });
    });
}

// 移动端菜单
function createMobileMenu() {
    const navbar = document.querySelector('.navbar .container');
    const menuButton = document.createElement('button');
    menuButton.innerHTML = '☰';
    menuButton.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
    `;

    const navMenu = document.querySelector('.nav-menu');
    menuButton.addEventListener('click', function() {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    navbar.insertBefore(menuButton, navMenu);

    // 移动端响应式
    if (window.innerWidth <= 768) {
        menuButton.style.display = 'block';
        navMenu.style.cssText = `
            display: none;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #0b1828;
            padding: 20px;
            text-align: center;
        `;
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            menuButton.style.display = 'block';
        } else {
            menuButton.style.display = 'none';
            navMenu.style.display = 'flex';
            navMenu.style.cssText = '';
        }
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    createSearchBox();
    createMobileMenu();
});

// 添加回到顶部按钮
function createBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.id = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
    `;

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(backToTop);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });

    backToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// 初始化回到顶部按钮
document.addEventListener('DOMContentLoaded', createBackToTop);

// 添加键盘快捷键
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K 打开搜索
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.focus();
        }
    }
});
