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
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                // 计算偏移量以考虑侧边栏
                const offsetTop = window.innerWidth > 768 ? target.offsetTop - 20 : target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 导航栏滚动效果 - 仅在没有侧边栏时使用
    if (!document.querySelector('.sidebar-nav')) {
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
    }
    
    // 侧边栏树形菜单功能
    if (document.querySelector('.sidebar-nav')) {
        document.querySelectorAll('.tree-menu details').forEach(detail => {
            detail.addEventListener('toggle', function() {
                // 当details元素打开或关闭时触发
                if (this.open) {
                    console.log('展开:', this.querySelector('summary').textContent.trim());
                } else {
                    console.log('收起:', this.querySelector('summary').textContent.trim());
                }
            });
        });
    }
});

// 复制代码功能
function copyCode(button) {
    let code;
    // 检查按钮的父元素是否包含code元素
    const codeElement = button.previousElementSibling ? button.previousElementSibling.querySelector('code') : null;
    
    if (codeElement) {
        code = codeElement.textContent;
    } else {
        // 如果没有找到code元素，则尝试从同级的pre元素获取
        const preElement = button.parentElement.querySelector('pre');
        if (preElement) {
            code = preElement.textContent;
        } else {
            console.error('找不到要复制的代码');
            return;
        }
    }

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
    if (!card) return; // 如果没有找到卡片，直接返回

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
    if (!navbar) return; // 如果没有导航菜单，直接返回

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
    if (searchInput) {
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
}

// 移动端菜单
function createMobileMenu() {
    const navbar = document.querySelector('.navbar .container');
    if (!navbar) return; // 如果没有导航栏，直接返回

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
    if (!navMenu) return; // 如果没有导航菜单，直接返回

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

// 移动端菜单切换功能
document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth <= 768) {
        const sidebarNav = document.querySelector('.sidebar-nav');
        const mainContent = document.querySelector('.main-content');

        if (!sidebarNav) return; // 如果没有侧边栏，直接返回

        // 创建移动端菜单按钮
        const menuToggle = document.createElement('button');
        menuToggle.classList.add('mobile-menu-toggle');
        menuToggle.innerHTML = '☰';
        menuToggle.setAttribute('aria-label', '切换菜单');
        document.body.appendChild(menuToggle);

        menuToggle.addEventListener('click', function() {
            sidebarNav.classList.toggle('active');
        });

        // 点击内容区域隐藏菜单
        if (mainContent) {
            mainContent.addEventListener('click', function() {
                if (sidebarNav.classList.contains('active')) {
                    sidebarNav.classList.remove('active');
                }
            });
        }
    }
});
