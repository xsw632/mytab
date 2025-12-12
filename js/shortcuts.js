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
    render() {
        const container = document.getElementById('shortcutsGrid');
        if (!container) return;

        const shortcuts = this.getCurrentShortcuts();

        container.innerHTML = shortcuts.map(shortcut => {
            const iconHtml = this.getIconHtml(shortcut);
            return `
        <a class="shortcut-card" href="${this.escapeHtml(shortcut.url)}" 
           data-id="${shortcut.id}" title="${this.escapeHtml(shortcut.name)}">
          <div class="shortcut-icon">
            ${iconHtml}
          </div>
          <span class="shortcut-name">${this.escapeHtml(shortcut.name)}</span>
        </a>
      `;
        }).join('');

        // 更新分类列表中的计数
        Categories.render();
    },

    /**
     * 获取图标 HTML
     */
    getIconHtml(shortcut) {
        if (shortcut.icon === 'auto' || !shortcut.icon) {
            // 自动获取 favicon
            const url = new URL(shortcut.url);
            const faviconUrl = `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=64`;
            return `<img src="${faviconUrl}" alt="${this.escapeHtml(shortcut.name)}" onerror="this.style.display='none'; this.parentElement.innerHTML='<span class=\\'emoji\\'>${shortcut.name.charAt(0).toUpperCase()}</span>'">`;
        } else if (shortcut.icon.startsWith('http')) {
            // 自定义 URL
            return `<img src="${this.escapeHtml(shortcut.icon)}" alt="${this.escapeHtml(shortcut.name)}" onerror="this.style.display='none'; this.parentElement.innerHTML='<span class=\\'emoji\\'>${shortcut.name.charAt(0).toUpperCase()}</span>'">`;
        } else {
            // 表情符号
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

        // 右键快捷方式
        container?.addEventListener('contextmenu', (e) => {
            const card = e.target.closest('.shortcut-card');
            if (card) {
                e.preventDefault();
                this.contextTarget = { type: 'shortcut', id: card.dataset.id };
                App.showContextMenu(e.pageX, e.pageY);
            }
        });

        // 添加快捷方式按钮
        addBtn?.addEventListener('click', () => this.showModal());

        // 关闭模态框
        closeBtn?.addEventListener('click', () => this.hideModal());
        cancelBtn?.addEventListener('click', () => this.hideModal());

        // 保存快捷方式
        saveBtn?.addEventListener('click', () => this.save());

        // 点击遮罩关闭
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) this.hideModal();
        });

        // 图标类型选择
        iconOptions.forEach(option => {
            option.addEventListener('click', () => {
                iconOptions.forEach(o => o.classList.remove('active'));
                option.classList.add('active');

                const type = option.dataset.type;
                if (type === 'auto') {
                    iconInput.style.display = 'none';
                    iconInput.value = 'auto';
                } else if (type === 'custom') {
                    iconInput.style.display = 'block';
                    iconInput.placeholder = '输入图标URL...';
                    iconInput.value = '';
                } else {
                    iconInput.style.display = 'block';
                    iconInput.placeholder = '输入表情符号，如：🌐';
                    iconInput.value = '';
                }
            });
        });
    },

    /**
     * 显示添加/编辑模态框
     */
    showModal(shortcutId = null) {
        const modal = document.getElementById('shortcutModal');
        const title = document.getElementById('shortcutModalTitle');
        const idInput = document.getElementById('editShortcutId');
        const nameInput = document.getElementById('shortcutName');
        const urlInput = document.getElementById('shortcutUrl');
        const iconInput = document.getElementById('shortcutIcon');
        const iconOptions = document.querySelectorAll('.icon-option');

        // 重置图标选项
        iconOptions.forEach(o => o.classList.remove('active'));
        iconOptions[0].classList.add('active');
        iconInput.style.display = 'none';
        iconInput.value = 'auto';

        if (shortcutId) {
            const shortcut = this.shortcuts.find(s => s.id === shortcutId);
            if (shortcut) {
                title.textContent = '✏️ 编辑快捷方式';
                idInput.value = shortcutId;
                nameInput.value = shortcut.name;
                urlInput.value = shortcut.url;

                // 设置图标选项
                if (shortcut.icon === 'auto' || !shortcut.icon) {
                    iconOptions[0].classList.add('active');
                    iconInput.style.display = 'none';
                } else if (shortcut.icon.startsWith('http')) {
                    iconOptions.forEach(o => o.classList.remove('active'));
                    iconOptions[1].classList.add('active');
                    iconInput.style.display = 'block';
                    iconInput.value = shortcut.icon;
                    iconInput.placeholder = '输入图标URL...';
                } else {
                    iconOptions.forEach(o => o.classList.remove('active'));
                    iconOptions[2].classList.add('active');
                    iconInput.style.display = 'block';
                    iconInput.value = shortcut.icon;
                    iconInput.placeholder = '输入表情符号，如：🌐';
                }
            }
        } else {
            title.textContent = '➕ 添加快捷方式';
            idInput.value = '';
            nameInput.value = '';
            urlInput.value = '';
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
     * 保存快捷方式
     */
    async save() {
        const idInput = document.getElementById('editShortcutId');
        const nameInput = document.getElementById('shortcutName');
        const urlInput = document.getElementById('shortcutUrl');
        const iconInput = document.getElementById('shortcutIcon');

        const name = nameInput.value.trim();
        let url = urlInput.value.trim();
        const icon = iconInput.value.trim() || 'auto';

        if (!name) {
            nameInput.focus();
            return;
        }

        if (!url) {
            urlInput.focus();
            return;
        }

        // 自动补全 https://
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
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
