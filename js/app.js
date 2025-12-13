/**
 * App Module - 主应用逻辑
 */

const App = {
    /**
     * 初始化应用
     */
    async init() {
        // 初始化 DB
        if (window.ImageDB) await ImageDB.init();

        // 初始化各模块
        await Categories.init();
        await Shortcuts.init();
        await Settings.init();

        // 初始化时钟
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);

        // 绑定事件
        this.bindEvents();
    },

    /**
     * 更新时钟显示
     */
    updateClock() {
        const timeEl = document.getElementById('time');
        const greetingEl = document.getElementById('greeting');
        const dateEl = document.getElementById('date');

        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // 格式化时间
        let timeStr;
        if (Settings.settings.clockFormat === '12') {
            const h = hours % 12 || 12;
            const ampm = hours >= 12 ? 'PM' : 'AM';
            if (Settings.settings.showSeconds) {
                timeStr = `${h}:${this.pad(minutes)}:${this.pad(seconds)} ${ampm}`;
            } else {
                timeStr = `${h}:${this.pad(minutes)} ${ampm}`;
            }
        } else {
            if (Settings.settings.showSeconds) {
                timeStr = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
            } else {
                timeStr = `${this.pad(hours)}:${this.pad(minutes)}`;
            }
        }

        if (timeEl) timeEl.textContent = timeStr;

        // 问候语
        let greeting;
        if (hours >= 5 && hours < 12) {
            greeting = '早上好 ☀️';
        } else if (hours >= 12 && hours < 18) {
            greeting = '下午好 🌤️';
        } else if (hours >= 18 && hours < 22) {
            greeting = '晚上好 🌙';
        } else {
            greeting = '夜深了 🌟';
        }

        if (greetingEl) greetingEl.textContent = greeting;

        // 日期
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        if (dateEl) dateEl.textContent = now.toLocaleDateString('zh-CN', options);
    },

    /**
     * 数字补零
     */
    pad(num) {
        return num.toString().padStart(2, '0');
    },

    /**
     * 绑定事件
     */
    bindEvents() {
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        const searchEngineSelector = document.getElementById('searchEngineSelector');
        const searchEngineDropdown = document.getElementById('searchEngineDropdown');
        const toggleSidebar = document.getElementById('toggleSidebar');
        const contextMenu = document.getElementById('contextMenu');
        const editItem = document.getElementById('editItem');
        const deleteItem = document.getElementById('deleteItem');

        // 搜索功能
        searchInput?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.doSearch();
            }
        });

        searchBtn?.addEventListener('click', () => this.doSearch());

        // 搜索引擎选择器
        searchEngineSelector?.addEventListener('click', (e) => {
            e.stopPropagation();
            searchEngineDropdown.classList.toggle('show');
        });

        // 搜索引擎选项
        document.querySelectorAll('.search-engine-option').forEach(option => {
            option.addEventListener('click', async (e) => {
                const engine = option.dataset.engine;
                Settings.settings.searchEngine = engine;
                await Storage.saveSettings(Settings.settings);
                Settings.updateSearchEngineIcon();
                searchEngineDropdown.classList.remove('show');
            });
        });

        // 切换侧边栏
        toggleSidebar?.addEventListener('click', async () => {
            const sidebar = document.getElementById('sidebar');
            const isCollapsed = sidebar.classList.toggle('collapsed');
            Settings.settings.showSidebar = !isCollapsed;
            await Storage.saveSettings(Settings.settings);
            document.getElementById('showSidebar').checked = !isCollapsed;
        });

        // 点击其他地方关闭下拉菜单和右键菜单
        document.addEventListener('click', () => {
            searchEngineDropdown?.classList.remove('show');
            contextMenu?.classList.remove('show');
        });

        // 右键菜单处理
        editItem?.addEventListener('click', () => {
            const target = Categories.contextTarget || Shortcuts.contextTarget;
            if (target) {
                if (target.type === 'category') {
                    Categories.edit(target.id);
                } else if (target.type === 'shortcut') {
                    Shortcuts.edit(target.id);
                }
            }
            contextMenu.classList.remove('show');
        });

        deleteItem?.addEventListener('click', () => {
            const target = Categories.contextTarget || Shortcuts.contextTarget;
            if (target) {
                if (target.type === 'category') {
                    Categories.delete(target.id);
                } else if (target.type === 'shortcut') {
                    Shortcuts.delete(target.id);
                }
            }
            contextMenu.classList.remove('show');
        });

        // ESC 关闭模态框
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal-overlay.show').forEach(modal => {
                    modal.classList.remove('show');
                });
            }
        });
    },

    /**
     * 执行搜索
     */
    doSearch() {
        const searchInput = document.getElementById('searchInput');
        const query = searchInput.value.trim();

        if (query) {
            const engine = Settings.searchEngines[Settings.settings.searchEngine] || Settings.searchEngines.google;
            window.location.href = engine.url + encodeURIComponent(query);
        }
    },

    /**
     * 显示右键菜单
     */
    showContextMenu(x, y) {
        const contextMenu = document.getElementById('contextMenu');

        // 确保菜单不超出视口
        const menuWidth = 160;
        const menuHeight = 80;

        if (x + menuWidth > window.innerWidth) {
            x = window.innerWidth - menuWidth - 10;
        }
        if (y + menuHeight > window.innerHeight) {
            y = window.innerHeight - menuHeight - 10;
        }

        contextMenu.style.left = x + 'px';
        contextMenu.style.top = y + 'px';
        contextMenu.classList.add('show');
    }
};

// 启动应用
document.addEventListener('DOMContentLoaded', async () => {
    await App.init();
    // 移除 preload 类，启用动画
    requestAnimationFrame(() => {
        document.body.classList.remove('preload');
    });
});
