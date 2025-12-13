/**
 * Settings Module - 设置管理
 */

const Settings = {
    settings: {},

    // 壁纸列表
    wallpapers: [
        { id: 'none', name: '无', url: '' },
        // 渐变背景
        { id: 'gradient1', name: '渐变1', url: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
        { id: 'gradient2', name: '渐变2', url: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
        { id: 'gradient3', name: '渐变3', url: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
        { id: 'gradient4', name: '渐变4', url: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
        { id: 'gradient5', name: '渐变5', url: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
        { id: 'gradient6', name: '渐变6', url: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
        { id: 'gradient7', name: '渐变7', url: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
        // 风景图片 - 使用 &amp; 避免 HTML 解析问题
        { id: 'landscape1', name: '山脉', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80' },
        { id: 'landscape2', name: '海滩', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80' },
        { id: 'landscape3', name: '森林', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80' },
        { id: 'landscape4', name: '湖泊', url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1920&q=80' },
        { id: 'landscape5', name: '星空', url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80' },
        { id: 'landscape6', name: '日落', url: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=1920&q=80' },
        { id: 'landscape7', name: '樱花', url: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1920&q=80' },
        { id: 'landscape8', name: '雪山', url: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=1920&q=80' },
        { id: 'landscape9', name: '大漠', url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1920&q=80' },
        { id: 'landscape10', name: '极光', url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&q=80' },
        { id: 'landscape11', name: '雨林', url: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=1920&q=80' },
        { id: 'landscape12', name: '海岛', url: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1920&q=80' },
        { id: 'landscape13', name: '秋色', url: 'https://images.unsplash.com/photo-1507371341162-fe63244634c5?w=1920&q=80' }
    ],

    // 搜索引擎配置
    searchEngines: {
        google: {
            name: 'Google',
            url: 'https://www.google.com/search?q=',
            icon: 'https://www.google.com/favicon.ico'
        },
        bing: {
            name: 'Bing',
            url: 'https://www.bing.com/search?q=',
            icon: 'https://www.bing.com/favicon.ico'
        },
        baidu: {
            name: '百度',
            url: 'https://www.baidu.com/s?wd=',
            icon: 'https://www.baidu.com/favicon.ico'
        },
        duckduckgo: {
            name: 'DuckDuckGo',
            url: 'https://duckduckgo.com/?q=',
            icon: 'https://duckduckgo.com/favicon.ico'
        }
    },

    /**
     * 初始化设置模块
     */
    async init() {
        console.log('Settings.init() called');
        const data = await Storage.getAll();
        this.settings = data.settings;
        console.log('Loaded settings:', this.settings);
        this.applySettings();
        this.renderWallpaperGrid();
        this.bindEvents();
        console.log('Settings initialized');
    },

    /**
     * 应用设置
     */
    applySettings() {
        // 应用壁纸
        this.applyWallpaper();

        // 应用搜索引擎图标
        this.updateSearchEngineIcon();

        // 应用显示设置
        const sidebar = document.getElementById('sidebar');
        const clockSection = document.querySelector('.clock-section');
        const searchSection = document.querySelector('.search-section');

        if (sidebar) {
            sidebar.classList.toggle('collapsed', !this.settings.showSidebar);
        }
        if (clockSection) {
            clockSection.style.display = this.settings.showClock ? '' : 'none';
        }
        if (searchSection) {
            searchSection.style.display = this.settings.showSearch ? '' : 'none';
        }

        // 更新设置表单
        this.updateSettingsForm();
    },

    /**
     * 应用壁纸
     */
    async applyWallpaper() {
        const wallpaperEl = document.getElementById('wallpaper');
        const overlayEl = document.querySelector('.overlay');

        if (!wallpaperEl) return;

        const wpId = this.settings.wallpaper || 'none';
        const customWp = this.settings.customWallpaper;
        const wp = this.wallpapers.find(w => w.id === wpId);
        const wpUrl = customWp || (wp ? wp.url : '');

        console.log('Applying wallpaper:', wpId);

        // 重置样式
        wallpaperEl.style.cssText = '';

        if (!wpUrl || wpId === 'none') {
            overlayEl.style.background = 'rgba(248, 250, 252, 0.95)';
            return;
        }

        if (wpUrl.startsWith('linear-gradient') || wpUrl.startsWith('radial-gradient')) {
            // 渐变
            wallpaperEl.style.background = wpUrl;
            overlayEl.style.background = 'rgba(255, 255, 255, 0.1)';
        } else {
            // 图片处理逻辑
            overlayEl.style.background = 'rgba(255, 255, 255, 0)';

            let finalUrl = wpUrl;

            // 尝试从缓存获取 Blob
            if (window.ImageDB) {
                try {
                    const blob = await ImageDB.getImage(wpUrl);
                    if (blob) {
                        console.log('Cache hit for wallpaper');
                        finalUrl = URL.createObjectURL(blob);
                    } else if (wpUrl.startsWith('http')) {
                        console.log('Cache miss, downloading in background');
                        // 后台下载缓存 (不阻塞当前显示)
                        ImageDB.saveFromUrl(wpUrl);
                    }
                } catch (e) {
                    console.error('Cache check failed:', e);
                }
            }

            // 使用拆分属性确保渲染正确
            wallpaperEl.style.backgroundImage = `url('${finalUrl}')`;
            wallpaperEl.style.backgroundSize = 'cover';
            wallpaperEl.style.backgroundPosition = 'center center';
            wallpaperEl.style.backgroundRepeat = 'no-repeat';
            wallpaperEl.style.backgroundAttachment = 'fixed';
        }
    },

    /**
     * 更新搜索引擎图标
     */
    updateSearchEngineIcon() {
        const iconEl = document.getElementById('searchEngineIcon');
        const engine = this.searchEngines[this.settings.searchEngine] || this.searchEngines.google;
        if (iconEl) {
            iconEl.src = engine.icon;
            iconEl.alt = engine.name;
        }
    },

    /**
     * 更新设置表单
     */
    updateSettingsForm() {
        const clockFormat = document.getElementById('clockFormat');
        const showSeconds = document.getElementById('showSeconds');
        const defaultEngine = document.getElementById('defaultSearchEngine');
        const showSidebar = document.getElementById('showSidebar');
        const showClock = document.getElementById('showClock');
        const showSearch = document.getElementById('showSearch');

        if (clockFormat) clockFormat.value = this.settings.clockFormat || '24';
        if (showSeconds) showSeconds.checked = this.settings.showSeconds || false;
        if (defaultEngine) defaultEngine.value = this.settings.searchEngine || 'google';
        if (showSidebar) showSidebar.checked = this.settings.showSidebar !== false;
        if (showClock) showClock.checked = this.settings.showClock !== false;
        if (showSearch) showSearch.checked = this.settings.showSearch !== false;
    },

    /**
     * 渲染壁纸网格
     */
    renderWallpaperGrid() {
        const container = document.getElementById('wallpaperGrid');
        if (!container) return;

        const currentWpId = this.settings.wallpaper || 'none';

        container.innerHTML = this.wallpapers.map(wp => {
            const isActive = currentWpId === wp.id && !this.settings.customWallpaper;
            let styleAttr = '';

            if (wp.id === 'none') {
                styleAttr = '';
            } else if (wp.url.startsWith('linear-gradient')) {
                styleAttr = `background: ${wp.url}`;
            } else {
                // 生成缩略图链接 (300px) - 使用正则确保替换任意分辨率
                let thumbUrl = wp.url;
                if (thumbUrl.includes('unsplash.com')) {
                    thumbUrl = thumbUrl.replace(/w=\d+/, 'w=300').replace(/q=\d+/, 'q=80');
                }
                const escapedUrl = thumbUrl.replace(/'/g, "\\'");
                styleAttr = `background: url('${escapedUrl}') center center / cover no-repeat`;
            }

            return `
        <div class="wallpaper-option ${isActive ? 'active' : ''} ${wp.id === 'none' ? 'none' : ''}" 
             data-id="${wp.id}" style="${styleAttr}" title="${wp.name}">
          ${wp.id === 'none' ? '无背景' : ''}
        </div>
      `;
        }).join('');
    },

    /**
     * 绑定事件
     */
    bindEvents() {
        const settingsBtn = document.getElementById('settingsBtn');
        const settingsModal = document.getElementById('settingsModal');
        const closeBtn = document.getElementById('closeSettings');
        const wallpaperGrid = document.getElementById('wallpaperGrid');
        const customWallpaperUrl = document.getElementById('customWallpaperUrl');
        const applyCustomWallpaper = document.getElementById('applyCustomWallpaper');

        // 打开设置
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                console.log('Opening settings modal');
                settingsModal.classList.add('show');
            });
        }

        // 关闭设置
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                settingsModal.classList.remove('show');
            });
        }

        // 点击遮罩关闭
        if (settingsModal) {
            settingsModal.addEventListener('click', (e) => {
                if (e.target === settingsModal) {
                    settingsModal.classList.remove('show');
                }
            });
        }

        // 壁纸选择 - 使用事件委托
        if (wallpaperGrid) {
            wallpaperGrid.addEventListener('click', async (e) => {
                const option = e.target.closest('.wallpaper-option');
                if (option) {
                    const id = option.dataset.id;
                    console.log('Wallpaper clicked:', id);

                    this.settings.wallpaper = id;
                    this.settings.customWallpaper = '';

                    await Storage.saveSettings(this.settings);
                    console.log('Settings saved:', this.settings);

                    this.renderWallpaperGrid();
                    this.applyWallpaper();
                }
            });
        }

        // 自定义壁纸
        if (applyCustomWallpaper) {
            applyCustomWallpaper.addEventListener('click', async () => {
                const url = customWallpaperUrl.value.trim();
                if (url) {
                    console.log('Applying custom wallpaper:', url);
                    this.settings.customWallpaper = url;
                    await Storage.saveSettings(this.settings);
                    this.renderWallpaperGrid();
                    this.applyWallpaper();
                }
            });
        }

        // 时钟格式
        const clockFormatEl = document.getElementById('clockFormat');
        if (clockFormatEl) {
            clockFormatEl.addEventListener('change', async (e) => {
                this.settings.clockFormat = e.target.value;
                await Storage.saveSettings(this.settings);
                App.updateClock();
            });
        }

        // 显示秒数
        const showSecondsEl = document.getElementById('showSeconds');
        if (showSecondsEl) {
            showSecondsEl.addEventListener('change', async (e) => {
                this.settings.showSeconds = e.target.checked;
                await Storage.saveSettings(this.settings);
                App.updateClock();
            });
        }

        // 默认搜索引擎
        const defaultEngineEl = document.getElementById('defaultSearchEngine');
        if (defaultEngineEl) {
            defaultEngineEl.addEventListener('change', async (e) => {
                this.settings.searchEngine = e.target.value;
                await Storage.saveSettings(this.settings);
                this.updateSearchEngineIcon();
            });
        }

        // 显示侧边栏
        const showSidebarEl = document.getElementById('showSidebar');
        if (showSidebarEl) {
            showSidebarEl.addEventListener('change', async (e) => {
                this.settings.showSidebar = e.target.checked;
                await Storage.saveSettings(this.settings);
                const sidebar = document.getElementById('sidebar');
                if (sidebar) {
                    sidebar.classList.toggle('collapsed', !e.target.checked);
                }
            });
        }

        // 显示时钟
        const showClockEl = document.getElementById('showClock');
        if (showClockEl) {
            showClockEl.addEventListener('change', async (e) => {
                this.settings.showClock = e.target.checked;
                await Storage.saveSettings(this.settings);
                const clockSection = document.querySelector('.clock-section');
                if (clockSection) {
                    clockSection.style.display = e.target.checked ? '' : 'none';
                }
            });
        }

        // 显示搜索栏
        const showSearchEl = document.getElementById('showSearch');
        if (showSearchEl) {
            showSearchEl.addEventListener('change', async (e) => {
                this.settings.showSearch = e.target.checked;
                await Storage.saveSettings(this.settings);
                const searchSection = document.querySelector('.search-section');
                if (searchSection) {
                    searchSection.style.display = e.target.checked ? '' : 'none';
                }
            });
        }
    }
};
