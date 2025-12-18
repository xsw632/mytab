/**
 * Shortcuts Module - 快捷方式管理
 */

const Shortcuts = {
    shortcuts: [],
    contextTarget: null,

    /**
     * 初始化快捷方式模块
     */
    async init() {
        const data = await Storage.getAll();
        this.shortcuts = data.shortcuts;
        this.render();
        this.bindEvents();
    },

    /**
     * 获取当前分类的快捷方式
     */
    getCurrentShortcuts() {
        return this.shortcuts.filter(s => s.categoryId === Categories.currentCategory);
    },

    /**
     * 获取指定分类的快捷方式数量
     */
    getCountByCategory(categoryId) {
        return this.shortcuts.filter(s => s.categoryId === categoryId).length;
    },

    /**
     * 渲染快捷方式网格
     */
    async render() {
        const container = document.getElementById('shortcutsGrid');
        if (!container) return;

        const shortcuts = this.getCurrentShortcuts();

        // Generate HTML without inline event handlers
        container.innerHTML = shortcuts.map(shortcut => {
            const iconHtml = this.getIconHtml(shortcut);
            return `
        <a class="shortcut-card" href="${this.escapeHtml(shortcut.url)}" 
           data-id="${shortcut.id}" title="${this.escapeHtml(shortcut.name)}">
          <div class="shortcut-icon" id="icon-${shortcut.id}">
            ${iconHtml}
          </div>
          <span class="shortcut-name">${this.escapeHtml(shortcut.name)}</span>
        </a>
      `;
        }).join('') + `
      <div class="btn-add-shortcut" id="addShortcutBtn">
        <div class="add-icon-wrapper">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
        <span>添加快捷</span>
      </div>
    `;

        // Add error event listeners and cache logic
        const shortcutImages = container.querySelectorAll('.shortcut-icon img');
        shortcutImages.forEach(img => {
            img.addEventListener('error', (e) => {
                const target = e.target;
                const src = target.src;

                // If Google fails, try DuckDuckGo as fallback
                if (src.includes('google.com')) {
                    const hostname = new URL(src).searchParams.get('domain');
                    if (hostname) {
                        target.src = `https://icons.duckduckgo.com/ip3/${hostname}.ico`;
                        return;
                    }
                }

                // If all services fail, fallback to initial letter
                const parent = target.parentElement;
                const shortcutId = parent.id.replace('icon-', '');
                const shortcut = this.shortcuts.find(s => s.id === shortcutId);

                if (shortcut) {
                    target.style.display = 'none';
                    parent.innerHTML = `<span class="emoji">${shortcut.name.charAt(0).toUpperCase()}</span>`;
                }
            });
        });

        // Async load cached icons
        if (window.ImageDB) {
            for (const shortcut of shortcuts) {
                const img = document.querySelector(`#icon-${shortcut.id} img[data-cache]`);
                if (img) {
                    const url = img.getAttribute('data-src');
                    try {
                        const blobUrl = await ImageDB.getOrFetch(url);
                        if (blobUrl) img.src = blobUrl;
                    } catch (e) {
                        console.error('Icon cache load failed:', e);
                    }
                }
            }
        }

        // Update counts
        Categories.render();
    },

    /**
     * 获取图标 HTML
     */
    getIconHtml(shortcut) {
        if (shortcut.icon === 'auto' || !shortcut.icon) {
            // Automatic favicon using Google service (Higher quality)
            const url = new URL(shortcut.url);
            const faviconUrl = `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=128`;
            return `<img src="${faviconUrl}" data-src="${faviconUrl}" data-cache="true" alt="${this.escapeHtml(shortcut.name)}">`;
        } else if (shortcut.icon.startsWith('http')) {
            // Custom URL
            return `<img src="${shortcut.icon}" data-src="${shortcut.icon}" data-cache="true" alt="${this.escapeHtml(shortcut.name)}">`;
        } else {
            // Emoji
            return `<span class="emoji">${shortcut.icon}</span>`;
        }
    },

    /**
     * 绑定事件
     */
    bindEvents() {
        const container = document.getElementById('shortcutsGrid');
        const addBtn = document.getElementById('addShortcutBtn');
        const modal = document.getElementById('shortcutModal');
        const closeBtn = document.getElementById('closeShortcutModal');
        const cancelBtn = document.getElementById('cancelShortcut');
        const saveBtn = document.getElementById('saveShortcut');
        const iconOptions = document.querySelectorAll('.icon-option');
        const iconInput = document.getElementById('shortcutIcon');

        // Toggle icon options
        iconOptions.forEach(option => {
            option.addEventListener('click', () => {
                iconOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');

                const type = option.dataset.type;
                if (type === 'auto') {
                    iconInput.style.display = 'none';
                    iconInput.value = '';
                } else {
                    iconInput.style.display = 'block';
                    iconInput.placeholder = type === 'custom' ? '图标URL' : '输入表情符号';
                    if (type === 'custom') {
                        // Keep value if it's already a URL
                        if (!iconInput.value.startsWith('http')) iconInput.value = '';
                    } else {
                        // Keep value if it's already an emoji (simple check)
                        if (iconInput.value.startsWith('http')) iconInput.value = '';
                    }
                    iconInput.focus();
                }
            });
        });

        // Open Add Modal - Use delegation since the button is re-rendered
        container?.addEventListener('click', (e) => {
            const addBtn = e.target.closest('#addShortcutBtn');
            if (addBtn) {
                this.showModal();
            }
        });

        // Close Modal
        closeBtn?.addEventListener('click', () => this.hideModal());
        cancelBtn?.addEventListener('click', () => this.hideModal());

        // Save
        saveBtn?.addEventListener('click', () => this.save());

        // Context Menu
        if (container) {
            container.addEventListener('contextmenu', (e) => {
                const card = e.target.closest('.shortcut-card');
                if (card) {
                    e.preventDefault();
                    this.contextTarget = {
                        type: 'shortcut',
                        id: card.dataset.id
                    };
                    App.showContextMenu(e.clientX, e.clientY);
                }
            });
        }
    },

    /**
     * 保存快捷方式
     */
    async save() {
        const idInput = document.getElementById('editShortcutId');
        const nameInput = document.getElementById('shortcutName');
        const urlInput = document.getElementById('shortcutUrl');
        const iconInput = document.getElementById('shortcutIcon');

        const name = nameInput.value.trim();
        let url = urlInput.value.trim();
        // Check active option for type
        const activeOption = document.querySelector('.icon-option.active');
        const type = activeOption ? activeOption.dataset.type : 'auto';

        let icon = type === 'auto' ? 'auto' : iconInput.value.trim();

        if (!name) {
            nameInput.focus();
            return;
        }

        if (!url) {
            urlInput.focus();
            return;
        }

        // Auto-complete https://
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }

        // Pre-cache icon
        if (window.ImageDB) {
            let iconUrl = icon;
            if (icon === 'auto') {
                try {
                    const u = new URL(url);
                    iconUrl = `https://www.google.com/s2/favicons?domain=${u.hostname}&sz=128`;
                } catch (e) { }
            }

            if (iconUrl.startsWith('http')) {
                ImageDB.getOrFetch(iconUrl).catch(console.error);
            }
        }

        if (idInput.value) {
            // 编辑
            const index = this.shortcuts.findIndex(s => s.id === idInput.value);
            if (index !== -1) {
                this.shortcuts[index].name = name;
                this.shortcuts[index].url = url;
                this.shortcuts[index].icon = icon;
            }
        } else {
            // 新增
            this.shortcuts.push({
                id: Storage.generateId(),
                name,
                url,
                icon,
                categoryId: Categories.currentCategory
            });
        }

        await Storage.saveShortcuts(this.shortcuts);
        this.render();
        this.hideModal();
    },

    /**
     * 编辑快捷方式
     */
    edit(id) {
        this.showModal(id);
    },

    /**
     * 删除快捷方式
     */
    async delete(id) {
        const shortcut = this.shortcuts.find(s => s.id === id);
        if (confirm(`确定要删除 "${shortcut?.name}" 吗？`)) {
            this.shortcuts = this.shortcuts.filter(s => s.id !== id);
            await Storage.saveShortcuts(this.shortcuts);
            this.render();
        }
    },

    /**
     * 显示模态框
     */
    showModal(id = null) {
        const modal = document.getElementById('shortcutModal');
        const title = document.getElementById('shortcutModalTitle');
        const idInput = document.getElementById('editShortcutId');
        const nameInput = document.getElementById('shortcutName');
        const urlInput = document.getElementById('shortcutUrl');
        const iconInput = document.getElementById('shortcutIcon');
        const iconOptions = document.querySelectorAll('.icon-option');

        if (id) {
            // 编辑模式
            const shortcut = this.shortcuts.find(s => s.id === id);
            if (!shortcut) return;

            title.textContent = '✏️ 编辑快捷方式';
            idInput.value = shortcut.id;
            nameInput.value = shortcut.name;
            urlInput.value = shortcut.url;

            // 设置图标状态
            iconOptions.forEach(opt => opt.classList.remove('active'));
            if (shortcut.icon === 'auto' || !shortcut.icon) {
                document.querySelector('.icon-option[data-type="auto"]').classList.add('active');
                iconInput.style.display = 'none';
                iconInput.value = '';
            } else if (shortcut.icon.startsWith('http')) {
                document.querySelector('.icon-option[data-type="custom"]').classList.add('active');
                iconInput.style.display = 'block';
                iconInput.value = shortcut.icon;
                iconInput.placeholder = '图标URL';
            } else {
                document.querySelector('.icon-option[data-type="emoji"]').classList.add('active');
                iconInput.style.display = 'block';
                iconInput.value = shortcut.icon;
                iconInput.placeholder = '输入表情符号';
            }
        } else {
            // 新增模式
            title.textContent = '➕ 添加快捷方式';
            idInput.value = '';
            nameInput.value = '';
            urlInput.value = '';

            // 重置图标选项
            iconOptions.forEach(opt => opt.classList.remove('active'));
            document.querySelector('.icon-option[data-type="auto"]').classList.add('active');
            iconInput.style.display = 'none';
            iconInput.value = '';
        }

        modal.classList.add('show');
        nameInput.focus();
    },

    /**
     * 隐藏模态框
     */
    hideModal() {
        const modal = document.getElementById('shortcutModal');
        modal.classList.remove('show');
    },

    /**
     * 将分类下的快捷方式移至首页
     */
    async moveCategoryShortcutsToHome(categoryId) {
        this.shortcuts.forEach(s => {
            if (s.categoryId === categoryId) {
                s.categoryId = 'home';
            }
        });
        await Storage.saveShortcuts(this.shortcuts);
    },

    /**
     * HTML 转义
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};
