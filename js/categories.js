/**
 * Categories Module - 分类管理
 */

const Categories = {
    categories: [],
    currentCategory: 'home',
    contextTarget: null,

    /**
     * 初始化分类模块
     */
    async init() {
        const data = await Storage.getAll();
        this.categories = data.categories;
        this.currentCategory = data.currentCategory;
        await this.applyLanguage();
        this.render();
        this.bindEvents();
    },

    async applyLanguage() {
        if (!window.I18N) return;
        const home = this.categories.find(c => c.id === 'home' && c.isDefault);
        if (!home) return;

        const desiredName = I18N.t('currentCategoryHome');
        if (home.name === desiredName) return;

        home.name = desiredName;
        await Storage.saveCategories(this.categories);
    },

    /**
     * 渲染分类列表
     */
    render() {
        const container = document.getElementById('categoryList');
        if (!container) return;

        container.innerHTML = this.categories.map(cat => {
            const shortcutCount = Shortcuts.getCountByCategory(cat.id);
            return `
        <div class="category-item ${cat.id === this.currentCategory ? 'active' : ''}" 
             data-id="${cat.id}" title="${cat.name}">
          <span class="icon">${cat.icon}</span>
          <span class="name">${cat.name}</span>
          <span class="count">${shortcutCount}</span>
        </div>
      `;
        }).join('');

        // 重新绑定拖放事件
        const categoryItems = container.querySelectorAll('.category-item');
        categoryItems.forEach(item => {
            item.addEventListener('dragover', (e) => {
                e.preventDefault();
                item.classList.add('drag-over');
            });

            item.addEventListener('dragleave', () => {
                item.classList.remove('drag-over');
            });

            item.addEventListener('drop', async (e) => {
                e.preventDefault();
                item.classList.remove('drag-over');

                const targetCategoryId = item.getAttribute('data-id');

                const rawItem = e.dataTransfer.getData('mytabItem');
                if (rawItem && targetCategoryId) {
                    try {
                        const dragged = JSON.parse(rawItem);
                        if (dragged?.kind === 'shortcut' && dragged?.id) {
                            await this.moveShortcutToCategory(dragged.id, targetCategoryId);
                            return;
                        }
                        if (dragged?.kind === 'widget' && dragged?.id) {
                            await Shortcuts.moveWidgetToCategory(dragged.id, targetCategoryId);
                            return;
                        }
                    } catch (err) {
                        // ignore and fall back to old shortcutId path
                    }
                }

                const shortcutId = e.dataTransfer.getData('shortcutId');
                if (shortcutId && targetCategoryId) {
                    await this.moveShortcutToCategory(shortcutId, targetCategoryId);
                }
            });
        });

        // 更新当前分类名称
        const currentCat = this.categories.find(c => c.id === this.currentCategory);
        const nameEl = document.getElementById('currentCategoryName');
        if (nameEl && currentCat) {
            nameEl.textContent = currentCat.name;
        }
    },

    /**
     * 移动快捷方式到指定分类
     */
    async moveShortcutToCategory(shortcutId, categoryId) {
        const index = Shortcuts.shortcuts.findIndex(s => s.id === shortcutId);
        if (index !== -1) {
            // 如果已经在该分类，则忽略
            if (Shortcuts.shortcuts[index].categoryId === categoryId) return;

            Shortcuts.shortcuts[index].categoryId = categoryId;
            await Storage.saveShortcuts(Shortcuts.shortcuts);

            // 重新渲染当前视图
            Shortcuts.render();
            this.render();

            // 提示用户 (可选)
            // console.log(`Moved shortcut ${shortcutId} to ${categoryId}`);
        }
    },

    /**
     * 绑定事件
     */
    bindEvents() {
        const container = document.getElementById('categoryList');
        const addBtn = document.getElementById('addCategoryBtn');
        const modal = document.getElementById('categoryModal');
        const closeBtn = document.getElementById('closeCategoryModal');
        const cancelBtn = document.getElementById('cancelCategory');
        const saveBtn = document.getElementById('saveCategory');

        // 点击分类
        container?.addEventListener('click', (e) => {
            const item = e.target.closest('.category-item');
            if (item) {
                this.selectCategory(item.dataset.id);
            }
        });

        // 右键分类
        container?.addEventListener('contextmenu', (e) => {
            const item = e.target.closest('.category-item');
            if (item && !this.categories.find(c => c.id === item.dataset.id)?.isDefault) {
                e.preventDefault();
                this.contextTarget = { type: 'category', id: item.dataset.id };
                App.showContextMenu(e.pageX, e.pageY);
            }
        });

        // 添加分类按钮
        addBtn?.addEventListener('click', () => this.showModal());

        // 关闭模态框
        closeBtn?.addEventListener('click', () => this.hideModal());
        cancelBtn?.addEventListener('click', () => this.hideModal());

        // 保存分类
        saveBtn?.addEventListener('click', () => this.save());

        // Emoji category switching
        const emojiCatBtns = modal?.querySelectorAll('.emoji-cat-btn');
        emojiCatBtns?.forEach(btn => {
            btn.addEventListener('click', () => {
                emojiCatBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.renderEmojiGrid(btn.getAttribute('data-cat'));
            });
        });

        // Emoji selection via delegation
        const emojiGrid = document.getElementById('categoryEmojiGrid');
        emojiGrid?.addEventListener('click', (e) => {
            const item = e.target.closest('.emoji-item');
            if (item) {
                const iconInput = document.getElementById('categoryIcon');
                if (iconInput) iconInput.value = item.textContent;
            }
        });

        // 点击遮罩关闭
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) this.hideModal();
        });
    },

    /**
     * 选择分类
     */
    async selectCategory(id) {
        this.currentCategory = id;
        await Storage.saveCurrentCategory(id);
        this.render();
        Shortcuts.render();
    },

    /**
     * 显示添加/编辑模态框
     */
    showModal(categoryId = null) {
        const modal = document.getElementById('categoryModal');
        const title = document.getElementById('categoryModalTitle');
        const idInput = document.getElementById('editCategoryId');
        const nameInput = document.getElementById('categoryName');
        const iconInput = document.getElementById('categoryIcon');

        if (categoryId) {
            const cat = this.categories.find(c => c.id === categoryId);
            if (cat) {
                title.textContent = window.I18N ? I18N.t('categoryEditTitle') : '✏️ 编辑分类';
                idInput.value = categoryId;
                nameInput.value = cat.name;
                iconInput.value = cat.icon;
            }
        } else {
            title.textContent = window.I18N ? I18N.t('categoryAddTitle') : '➕ 添加分类';
            idInput.value = '';
            nameInput.value = '';
            iconInput.value = '';
        }

        modal.classList.add('show');
        this.renderEmojiGrid('common');
        nameInput.focus();
    },

    /**
     * 渲染表情网格
     */
    renderEmojiGrid(category) {
        const grid = document.getElementById('categoryEmojiGrid');
        if (!grid) return;

        // Reuse emoji data from Shortcuts to avoid duplication
        const emojis = Shortcuts.emojis[category] || [];
        grid.innerHTML = emojis.map(emoji => `
            <div class="emoji-item">${emoji}</div>
        `).join('');
    },

    /**
     * 隐藏模态框
     */
    hideModal() {
        const modal = document.getElementById('categoryModal');
        modal.classList.remove('show');
    },

    /**
     * 保存分类
     */
    async save() {
        const idInput = document.getElementById('editCategoryId');
        const nameInput = document.getElementById('categoryName');
        const iconInput = document.getElementById('categoryIcon');

        const name = nameInput.value.trim();
        const icon = iconInput.value.trim() || '📁';

        if (!name) {
            nameInput.focus();
            return;
        }

        if (idInput.value) {
            // 编辑
            const index = this.categories.findIndex(c => c.id === idInput.value);
            if (index !== -1) {
                this.categories[index].name = name;
                this.categories[index].icon = icon;
            }
        } else {
            // 新增
            this.categories.push({
                id: Storage.generateId(),
                name,
                icon,
                isDefault: false
            });
        }

        await Storage.saveCategories(this.categories);
        this.render();
        this.hideModal();
    },

    /**
     * 编辑分类
     */
    edit(id) {
        this.showModal(id);
    },

    /**
     * 删除分类
     */
    async delete(id) {
        const cat = this.categories.find(c => c.id === id);
        if (cat?.isDefault) return;

        const homeName = this.categories.find(c => c.id === 'home')?.name || (window.I18N ? I18N.t('currentCategoryHome') : '首页');
        const msg = window.I18N
            ? I18N.format('confirmDeleteCategory', { name: cat?.name || '', home: homeName })
            : `确定要删除分类 "${cat?.name}" 吗？该分类下的快捷方式将移至首页。`;
        if (confirm(msg)) {
            // 将该分类的快捷方式移至首页
            await Shortcuts.moveCategoryItemsToHome(id);

            // 删除分类
            this.categories = this.categories.filter(c => c.id !== id);
            await Storage.saveCategories(this.categories);

            // 如果当前分类被删除，切换到首页
            if (this.currentCategory === id) {
                this.currentCategory = 'home';
                await Storage.saveCurrentCategory('home');
            }

            this.render();
            Shortcuts.render();
        }
    }
};
