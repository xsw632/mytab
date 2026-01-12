/**
 * Shortcuts Module - 快捷方式管理
 */

const Shortcuts = {
    shortcuts: [],
    widgets: [],
    contextTarget: null,
    isSaving: false,
    iconCandidateRequestId: 0,
    draggingItem: null,
    weatherCache: new Map(),
    activeAddTab: 'shortcut',
    gridDnDBound: false,
    emojis: {
        common: ['⭐', '🔥', '❤️', '📍', '🏠', '💻', '🎮', '💡', '📌', '📎', '📁', '📦', '🚀', '🛠️', '⚙️', '💬'],
        smileys: ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾', '🤖', '🎃', '😺'],
        nature: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', ' eagles', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗', '🕷', '🕸', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🐐', '🦌', '🐕', '🐩', '🦮', '🐕‍🦺', '🐈', '🐈‍⬛', '🐓', '🦃', '🦚', '🦜', '🦢', '🦩', '🕊', '🐇', '🦝', '🦨', '🦡', '🦦', '🦥', '🐁', '🐀', '🐿', '🦔'],
        objects: ['⌚', '📱', '📲', '💻', '⌨️', '鼠标', '🖲', '🕹', '🗜', '💽', '💾', '💿', 'DVD', '📼', '📷', '📸', '📹', '🎥', '📽', '🎞', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙', '🎚', '🎛', '🧭', '⏱', '⏲', '⏰', '🕰', '⌛', '⏳', '📡', '🔋', '🔌', '💡', '🔦', '🕯', '🪔', '🧯', '🛢', '💸', '💵', '💴', '💶', '💷', '💰', '💳', '💎', '⚖️', '🧰', '🔧', '🔨', '⚒️', '🛠️', '⛏️', '🔩', '⚙️', '砖', '链', '🧲', '🔫', '💣', '🧨', '🪓', '刀', '🗡️', '⚔️', '🛡️', '🚬', '⚰️', '⚱️', '🏺', '🔮', '📿', '🧿', '💈', '⚗️', '🔭', '🔬', '🕳️', '🩺', '药', '💉', '🩸', '🧬', '🌡️', '扫帚', '篮子', '🧻', '皂', '海绵', '🪣', '乳液', '钥匙', '🗝️', '门', '椅子', '🛋️', '🛏️', '🛌', '泰迪', '🖼️', '购物袋', '购物车', '礼', '气球', '🎏', '蝴蝶结', '🎊', '🎉', '🎎', '灯笼', '风铃', '红包', '信', '📩', '📨', '📧', '💌', '📥', '📤', '盒', '标签', '文件夹', '📂', '日历', '📆', '🗒️', '🗓️', '名片盒', '趋势', '下降', '图表', '剪贴板', '推针', '钉', '曲别针', '🖇️', '尺子', '三角尺', '剪刀', '🗃️', '🗄️', '垃圾桶', '锁', '🔓', '🔏', '🔐', '钥匙', '🗝️', '锤子', '⛏️', '🛠️', '⚒️', '扳手', '螺栓', '⚙️', '🗜️', '⚖️', '手杖', '链接', '⛓️', '工具箱', '🧲', '梯子', '⚗️', '🧪', '🧫', '🧬', '微观', '望远镜', '卫星', '注射器', '血液', '药丸', '听诊器', '门', '电梯', '镜子', '窗', '床', '沙发', '椅子', '厕所', '柱子', '淋浴', '浴缸', '老鼠夹', '刮胡刀', '乳液', '别针', '扫帚', '篮子', '🧻', '肥皂', '海绵', '灭火器', '购物车', '香烟', '棺材', '墓碑', '骨灰盒']
    },

    /**
     * 初始化快捷方式模块
     */
    async init() {
        const data = await Storage.getAll();
        this.shortcuts = data.shortcuts;
        this.widgets = data.widgets || [];
        const changed = this.ensureItemOrder();
        if (changed) {
            await Promise.all([
                Storage.saveShortcuts(this.shortcuts),
                Storage.saveWidgets(this.widgets)
            ]);
        }
        // Ensure DB is ready before render if possible
        if (window.ImageDB) await ImageDB.init();
        await this.render();
        this.bindEvents();
    },

    ensureItemOrder() {
        let changed = false;

        const ensureOrders = (items) => {
            const byCategory = new Map();
            items.forEach(item => {
                const categoryId = item.categoryId || 'home';
                if (!byCategory.has(categoryId)) byCategory.set(categoryId, []);
                byCategory.get(categoryId).push(item);
            });

            for (const list of byCategory.values()) {
                const ordered = list.filter(i => Number.isFinite(i.order));
                const unordered = list.filter(i => !Number.isFinite(i.order));
                if (!unordered.length) continue;

                if (!ordered.length) {
                    list.forEach((item, index) => {
                        item.order = index;
                        changed = true;
                    });
                    continue;
                }

                let next = Math.max(...ordered.map(i => i.order)) + 1;
                unordered.forEach(item => {
                    item.order = next++;
                    changed = true;
                });
            }
        };

        ensureOrders(this.shortcuts);
        ensureOrders(this.widgets);
        return changed;
    },

    /**
     * Helper: Generate consistent cache key for a shortcut
     * 规范化 hostname，确保缓存 key 一致
     */
    getIconCacheKey(shortcut) {
        if (shortcut.icon === 'auto' || !shortcut.icon) {
            try {
                // Ensure valid URL before parsing
                let urlStr = shortcut.url;
                if (!urlStr.startsWith('http')) urlStr = 'https://' + urlStr;
                const u = new URL(urlStr);
                // 规范化：保留原始 hostname（包括 www.）
                // 用户输入的 URL 是什么就用什么
                return `https://www.google.com/s2/favicons?domain=${u.hostname}&sz=128`;
            } catch (e) {
                console.warn('[Shortcuts] Invalid URL for key generation:', shortcut.url);
                return null;
            }
        }
        return shortcut.icon; // Custom URL or local-ID
    },

    /**
     * 尝试多种 key 格式查找缓存
     */
    async findCachedIcon(shortcut) {
        if (typeof ImageDB === 'undefined') return null;

        // 确保 ImageDB 已初始化
        await ImageDB.init();

        const primaryKey = this.getIconCacheKey(shortcut);
        if (!primaryKey) return null;

        // 跳过非网络图标
        if (!primaryKey.startsWith('http')) {
            // local- 图标直接查找
            if (primaryKey.startsWith('local-')) {
                const blob = await ImageDB.getImage(primaryKey);
                return blob ? { blob, key: primaryKey } : null;
            }
            return null;
        }

        // 尝试主 key
        let blob = await ImageDB.getImage(primaryKey);
        if (blob) return { blob, key: primaryKey };

        // 尝试添加/移除 www. 前缀
        try {
            const url = new URL(primaryKey);
            const domain = url.searchParams.get('domain');
            if (domain) {
                let altDomain;
                if (domain.startsWith('www.')) {
                    altDomain = domain.substring(4); // 移除 www.
                } else {
                    altDomain = 'www.' + domain; // 添加 www.
                }
                const altKey = `https://www.google.com/s2/favicons?domain=${altDomain}&sz=128`;
                blob = await ImageDB.getImage(altKey);
                if (blob) {
                    console.log(`[Shortcuts] Found cache with alt key: ${altKey}`);
                    return { blob, key: altKey };
                }
            }
        } catch (e) {
            console.warn('[Shortcuts] Error trying alt keys:', e);
        }

        return null;
    },

    /**
     * 获取当前分类的快捷方式
     */
    getCurrentShortcuts() {
        return this.shortcuts
            .filter(s => s.categoryId === Categories.currentCategory)
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    },

    getCurrentWidgets() {
        return this.widgets
            .filter(w => w.categoryId === Categories.currentCategory)
            .sort((a, b) => {
                const pinnedA = wIsPinned(a) ? 1 : 0;
                const pinnedB = wIsPinned(b) ? 1 : 0;
                if (pinnedA !== pinnedB) return pinnedB - pinnedA;
                return (a.order ?? 0) - (b.order ?? 0);
            });

        function wIsPinned(widget) {
            return widget?.type === 'note' && widget?.data?.pinned === true;
        }
    },

    getCurrentItems() {
        const shortcuts = this.getCurrentShortcuts().map(s => ({ kind: 'shortcut', item: s }));
        const widgets = this.getCurrentWidgets().map(w => ({ kind: 'widget', item: w }));
        const merged = [...shortcuts, ...widgets];
        merged.sort((a, b) => {
            const isPinnedA = a.kind === 'widget' && a.item?.type === 'note' && a.item?.data?.pinned === true;
            const isPinnedB = b.kind === 'widget' && b.item?.type === 'note' && b.item?.data?.pinned === true;
            if (isPinnedA !== isPinnedB) return isPinnedB - isPinnedA;
            return (a.item.order ?? 0) - (b.item.order ?? 0);
        });
        return merged;
    },

    /**
     * 获取指定分类的快捷方式数量
     */
    getCountByCategory(categoryId) {
        const shortcuts = this.shortcuts.filter(s => s.categoryId === categoryId).length;
        const widgets = this.widgets.filter(w => w.categoryId === categoryId).length;
        return shortcuts + widgets;
    },

    /**
     * 渲染快捷方式网格
     */
    async render() {
        const container = document.getElementById('shortcutsGrid');
        if (!container) return;

        const shortcuts = this.getCurrentShortcuts();
        const widgets = this.getCurrentWidgets();
        const items = this.getCurrentItems();

        // 1. Pre-resolve cached icons - 使用 findCachedIcon 尝试多种 key 格式
        const cachedIcons = {};
        let needsSave = false;

        if (window.ImageDB) {
            // 确保 ImageDB 初始化完成
            await ImageDB.init();
            console.log('[Shortcuts] Checking cached icons...');
            await Promise.all(shortcuts.map(async (s) => {
                const cacheKey = this.getIconCacheKey(s);
                if (!cacheKey) return;

                // Skip emojis
                if (!cacheKey.startsWith('http') && !cacheKey.startsWith('local-')) return;

                try {
                    // 使用 findCachedIcon 尝试多种 key
                    const result = await this.findCachedIcon(s);
                    if (result) {
                        const blob = result.blob || result;
                        cachedIcons[s.id] = ImageDB.getObjectUrl(result.key || cacheKey, blob);
                        if (!s.iconCached) {
                            s.iconCached = true;
                            needsSave = true;
                            console.log(`[Shortcuts] Marked ${s.name} as cached`);
                        }
                    } else if (s.iconCached) {
                        s.iconCached = false;
                        needsSave = true;
                        console.log(`[Shortcuts] Cache missing for ${s.name}, cleared flag`);
                    }
                } catch (e) {
                    console.warn('[Shortcuts] Cache check failed for', s.name, e);
                }
            }));

            if (needsSave) {
                await Storage.saveShortcuts(this.shortcuts);
            }
        }

        // 2. Generate HTML with pre-resolved icons
        const itemsHtml = items.map(({ kind, item }) => {
            if (kind === 'shortcut') {
                const shortcut = item;
                const iconHtml = this.getIconHtml(shortcut, cachedIcons[shortcut.id]);
                return `
        <a class="shortcut-card" href="${this.escapeHtml(shortcut.url)}" 
           data-kind="shortcut"
           data-id="${shortcut.id}" title="${this.escapeHtml(shortcut.name)}"
           draggable="true">
          <div class="shortcut-icon" id="icon-${shortcut.id}" data-rendering-finished="false">
            ${iconHtml}
          </div>
          <span class="shortcut-name">${this.escapeHtml(shortcut.name)}</span>
        </a>
      `;
            }

            const widget = item;
            return this.getWidgetCardHtml(widget);
        }).join('');

        const addBtnHtml = `
      <div class="shortcut-card btn-add-shortcut" id="addShortcutBtn">
        <div class="shortcut-icon" style="border: 2px dashed rgba(255,255,255,0.2); background: transparent;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="opacity: 0.5;">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
        <span class="shortcut-name">添加快捷</span>
      </div>
    `;

        container.innerHTML = itemsHtml + addBtnHtml;

        // 3. Mark as finished rendering to allow secondary cache logic if needed
        container.querySelectorAll('.shortcut-icon').forEach(el => {
            el.dataset.renderingFinished = 'true';
        });

        // Re-bind events for items
        const itemCards = container.querySelectorAll('.shortcut-card:not(.btn-add-shortcut)');
        itemCards.forEach(card => {
            // Drag and Drop
            card.addEventListener('dragstart', (e) => {
                const kind = card.getAttribute('data-kind') || 'shortcut';
                const id = card.getAttribute('data-id');

                this.draggingItem = { kind, id };

                if (kind === 'shortcut') {
                    e.dataTransfer.setData('shortcutId', id);
                }
                e.dataTransfer.setData('mytabItem', JSON.stringify({ kind, id }));

                card.classList.add('dragging');
                setTimeout(() => card.style.opacity = '0.5', 0);
            });

            card.addEventListener('dragend', () => {
                card.classList.remove('dragging');
                card.style.opacity = '1';
                this.draggingItem = null;

                document.querySelectorAll('.category-item').forEach(item => {
                    item.classList.remove('drag-over');
                });
                container.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
            });

            card.addEventListener('dragover', (e) => {
                e.preventDefault();
                card.classList.add('drag-over');
            });

            card.addEventListener('dragleave', () => {
                card.classList.remove('drag-over');
            });

            card.addEventListener('drop', async (e) => {
                e.preventDefault();
                card.classList.remove('drag-over');

                const raw = e.dataTransfer.getData('mytabItem');
                if (!raw) return;
                let dragged;
                try { dragged = JSON.parse(raw); } catch (err) { return; }
                if (!dragged?.id) return;

                const targetKind = card.getAttribute('data-kind') || 'shortcut';
                const targetId = card.getAttribute('data-id');
                if (!targetId) return;

                const rect = card.getBoundingClientRect();
                const midX = rect.left + rect.width / 2;
                const midY = rect.top + rect.height / 2;
                const dx = e.clientX - midX;
                const dy = e.clientY - midY;
                const useX = Math.abs(dx) > Math.abs(dy);
                const isAfter = useX ? (e.clientX > midX) : (e.clientY > midY);

                await this.reorderInCurrentCategory(dragged.kind, dragged.id, targetKind, targetId, isAfter);
            });
        });

        // container-level drag handlers are bound once in bindEvents()

        // Add Button
        const addBtn = document.getElementById('addShortcutBtn');
        addBtn?.addEventListener('click', () => {
            this.showModal();
        });

        // Error event listeners for images
        const shortcutImages = container.querySelectorAll('.shortcut-icon img');
        shortcutImages.forEach(img => {
            img.addEventListener('error', (e) => {
                const target = e.target;
                const src = target.src;

                // If it's a blob URL, it means the local storage failed to load a valid image
                if (src.startsWith('blob:')) {
                    this.showTextFallback(target);
                    return;
                }

                // If offline and NOT a blob URL, wait a tiny bit to see if async cache logic fixes it
                try {
                    const iconUrl = new URL(src);
                    let hostname = '';

                    const getBaseDomain = (host) => {
                        const parts = host.split('.');
                        if (parts.length > 2) return parts.slice(-2).join('.');
                        return host;
                    };

                    if (src.includes('google.com') && src.includes('sz=128')) {
                        hostname = iconUrl.searchParams.get('domain');
                        const baseDomain = getBaseDomain(hostname);
                        if (hostname && baseDomain !== hostname) {
                            const newUrl = `https://www.google.com/s2/favicons?domain=${baseDomain}&sz=128`;
                            target.src = newUrl;
                            return;
                        }
                        const fallbackUrl = `https://icons.duckduckgo.com/ip3/${hostname}.ico`;
                        // Cache the fallback execution
                        if (window.ImageDB && target.dataset.src) {
                            fetch(fallbackUrl).then(r => r.blob()).then(blob => {
                                if (ImageDB.isCacheableUrl(target.dataset.src)) {
                                    ImageDB.saveImage(target.dataset.src, blob);
                                }
                            }).catch(e => console.warn('Failed to cache fallback:', e));
                        }
                        target.src = fallbackUrl;
                        return;
                    }

                    if (src.includes('duckduckgo.com')) {
                        const pathParts = iconUrl.pathname.split('/');
                        hostname = pathParts[pathParts.length - 1].replace('.ico', '');
                        const baseDomain = getBaseDomain(hostname);
                        if (hostname && baseDomain !== hostname) {
                            const newUrl = `https://icons.duckduckgo.com/ip3/${baseDomain}.ico`;
                            target.src = newUrl;
                            // Cache this fallback too if it works? simpler to just let the next error catch it or let it fail 
                            // improving logic: if we are switching to base domain due to failure, it means the specific subdomain failed.
                            // We should probably cache this one too if we are here.
                            if (window.ImageDB && target.dataset.src) {
                                fetch(newUrl).then(r => r.blob()).then(blob => {
                                    if (ImageDB.isCacheableUrl(target.dataset.src)) {
                                        ImageDB.saveImage(target.dataset.src, blob);
                                    }
                                }).catch(e => console.warn('Failed to cache fallback:', e));
                            }
                            return;
                        }
                    }
                } catch (err) { }

                this.showTextFallback(target);
            });
        });

        // 4. 异步加载未缓存的图标（只在联网时）
        if (window.ImageDB && navigator.onLine) {
            for (const shortcut of shortcuts) {
                const iconContainer = document.getElementById(`icon-${shortcut.id}`);
                const img = iconContainer?.querySelector('img');

                // 只处理需要加载的图标
                if (img && img.dataset.needFetch === 'true') {
                    const url = img.getAttribute('data-src');
                    if (!url) continue;

                    if (url.startsWith('local-')) {
                        // 本地图标应该已经从缓存加载，如果到这里说明缓存丢失
                        console.warn(`[Shortcuts] Local icon missing from cache: ${url}`);
                        this.showTextFallback(img);
                        continue;
                    }

                    // 从网络获取并缓存
                    console.log(`[Shortcuts] Fetching icon from network: ${url}`);
                    try {
                        if (!ImageDB.isCacheableUrl(url)) {
                            img.src = url;
                            delete img.dataset.needFetch;
                            continue;
                        }

                        const response = await fetch(url);
                        if (response.ok) {
                            const blob = await response.blob();
                            await ImageDB.saveImage(url, blob);

                            // 更新 shortcut 的缓存标记
                            shortcut.iconCached = true;

                            // 更新图片
                            const blobUrl = ImageDB.getObjectUrl(url, blob);
                            img.src = blobUrl;
                            img.dataset.cached = 'true';
                            delete img.dataset.needFetch;

                            console.log(`[Shortcuts] Icon fetched and cached: ${shortcut.name}`);
                        } else {
                            console.warn(`[Shortcuts] Failed to fetch icon: ${url}, status: ${response.status}`);
                            this.showTextFallback(img);
                        }
                    } catch (e) {
                        console.warn(`[Shortcuts] Network error fetching icon: ${url}`, e);
                        this.showTextFallback(img);
                    }
                }
            }

            // 保存缓存标记更新
            await Storage.saveShortcuts(this.shortcuts);
        } else if (!navigator.onLine) {
            // 离线时，对未缓存的图标显示文字回退
            for (const shortcut of shortcuts) {
                const iconContainer = document.getElementById(`icon-${shortcut.id}`);
                const img = iconContainer?.querySelector('img');
                if (img && img.dataset.needFetch === 'true') {
                    console.log(`[Shortcuts] Offline, showing fallback for: ${shortcut.name}`);
                    this.showTextFallback(img);
                }
            }
        }

        // 5. Widgets post-render (weather refresh)
        if (navigator.onLine) {
            widgets
                .filter(w => w.type === 'weather')
                .forEach(w => this.maybeRefreshWeather(w));
        }

        Categories.render();
    },

    async reorderInCurrentCategory(dragKind, dragId, targetKind, targetId, isAfter = false) {
        const items = this.getCurrentItems();
        const draggedIndex = items.findIndex(x => x.kind === dragKind && x.item.id === dragId);
        if (draggedIndex === -1) return;

        const dragged = items.splice(draggedIndex, 1)[0];

        let insertIndex = items.length;
        if (targetId) {
            const targetIndex = items.findIndex(x => x.kind === targetKind && x.item.id === targetId);
            if (targetIndex !== -1) insertIndex = targetIndex + (isAfter ? 1 : 0);
        }

        items.splice(insertIndex, 0, dragged);

        // Assign new order in current category (keep pinned notes pinned via sort rules)
        items.forEach((entry, index) => {
            entry.item.order = index;
            if (entry.kind === 'shortcut') {
                const s = this.shortcuts.find(x => x.id === entry.item.id);
                if (s) s.order = index;
            } else {
                const w = this.widgets.find(x => x.id === entry.item.id);
                if (w) w.order = index;
            }
        });

        await Promise.all([
            Storage.saveShortcuts(this.shortcuts),
            Storage.saveWidgets(this.widgets)
        ]);

        await this.render();
    },

    /**
     * Show text fallback for a failed image
     */
    showTextFallback(img) {
        const parent = img.parentElement;
        if (!parent) return;
        const shortcutId = parent.id.replace('icon-', '');
        const shortcut = this.shortcuts.find(s => s.id === shortcutId);

        if (shortcut) {
            img.style.display = 'none';
            parent.innerHTML = `<span class="emoji">${shortcut.name.charAt(0).toUpperCase()}</span>`;
        }
    },

    /**
     * 获取图标 HTML
     * @param {Object} shortcut - 快捷方式对象
     * @param {string|null} preResolvedUrl - 预解析的 blob URL (来自缓存)
     */
    getIconHtml(shortcut, preResolvedUrl = null) {
        const isCached = !!preResolvedUrl;

        if (shortcut.icon === 'auto' || !shortcut.icon) {
            // 自动 favicon
            const cacheKey = this.getIconCacheKey(shortcut);
            if (isCached) {
                // 有缓存，直接使用 blob URL
                return `<img src="${preResolvedUrl}" data-src="${cacheKey}" data-cached="true" alt="${this.escapeHtml(shortcut.name)}">`;
            } else {
                // 没有缓存，使用占位符，等待后续异步加载
                // 不直接使用网络 URL，避免离线时报错
                return `<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="${cacheKey}" data-cached="false" data-need-fetch="true" alt="${this.escapeHtml(shortcut.name)}">`;
            }
        } else if (shortcut.icon.startsWith('http')) {
            // 自定义 URL 图标
            if (isCached) {
                return `<img src="${preResolvedUrl}" data-src="${shortcut.icon}" data-cached="true" alt="${this.escapeHtml(shortcut.name)}">`;
            } else {
                // 没有缓存，使用占位符
                return `<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="${shortcut.icon}" data-cached="false" data-need-fetch="true" alt="${this.escapeHtml(shortcut.name)}">`;
            }
        } else if (shortcut.icon.startsWith('local-')) {
            // 本地上传图标
            if (isCached) {
                return `<img src="${preResolvedUrl}" data-src="${shortcut.icon}" data-cached="true" alt="${this.escapeHtml(shortcut.name)}">`;
            } else {
                // 本地图标必须从缓存加载，使用占位符
                return `<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="${shortcut.icon}" data-cached="false" data-need-fetch="true" alt="${this.escapeHtml(shortcut.name)}">`;
            }
        } else {
            // Emoji
            return `<span class="emoji">${shortcut.icon}</span>`;
        }
    },

    getWidgetCardHtml(widget) {
        const display = this.getWidgetDisplayV2(widget);
        const size = (widget?.size === '4' || widget?.size === 4) ? '4' : '8';

        return `
        <div class="shortcut-card widget-card widget-size-${size}"
             data-kind="widget"
             data-type="${this.escapeHtml(widget.type || '')}"
             data-id="${this.escapeHtml(widget.id)}"
             title="${this.escapeHtml(display.title)}"
             draggable="true">
          <div class="widget-header">
            <div class="widget-title">${this.escapeHtml(display.title)}</div>
            <div class="widget-badge" aria-hidden="true">${display.badgeHtml}</div>
          </div>
          <div class="widget-body">
            ${display.bodyHtml}
          </div>
        </div>
      `;
    },

    getWidgetDisplayV2(widget) {
        const type = widget?.type || 'note';
        const title = widget?.title || this.getDefaultWidgetTitle(type);

        if (type === 'todo') {
            const items = Array.isArray(widget?.data?.items) ? widget.data.items : [];
            const today = items.filter(i => i.scope !== 'week');
            const week = items.filter(i => i.scope === 'week');
            const countLine = `今天 ${today.filter(i => i.done).length}/${today.length} · 本周 ${week.filter(i => i.done).length}/${week.length}`;

            const renderTodoItem = (item) => {
                const checked = item.done ? 'checked' : '';
                return `<label class="todo-item"><input type="checkbox" class="widget-todo-toggle" data-widget="${this.escapeHtml(widget.id)}" data-item="${this.escapeHtml(item.id)}" ${checked}><span>${this.escapeHtml(item.text || '')}</span></label>`;
            };

            return {
                title,
                badgeHtml: '✅',
                bodyHtml: `
                    <div class="todo-count">${this.escapeHtml(countLine)}</div>
                    <div class="todo-list">
                      <div class="todo-group">
                        <div class="todo-title">今天</div>
                        ${today.slice(0, 4).map(renderTodoItem).join('') || '<div class="todo-empty">暂无</div>'}
                      </div>
                      <div class="todo-group">
                        <div class="todo-title">本周</div>
                        ${week.slice(0, 4).map(renderTodoItem).join('') || '<div class="todo-empty">暂无</div>'}
                      </div>
                    </div>
                    <div class="todo-actions">
                      <button class="widget-action widget-todo-add" data-id="${this.escapeHtml(widget.id)}" data-scope="today" title="添加今天待办">+今天</button>
                      <button class="widget-action widget-todo-add" data-id="${this.escapeHtml(widget.id)}" data-scope="week" title="添加本周待办">+本周</button>
                    </div>
                `
            };
        }

        if (type === 'calendar') {
            const now = new Date();
            const year = now.getFullYear();
            const monthIndex = now.getMonth();
            const month = monthIndex + 1;
            const today = now.getDate();

            const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
            const firstDay = new Date(year, monthIndex, 1).getDay();
            const weekHeaders = ['日', '一', '二', '三', '四', '五', '六'];

            const cells = [];
            for (let i = 0; i < firstDay; i++) cells.push('');
            for (let d = 1; d <= daysInMonth; d++) cells.push(String(d));
            while (cells.length % 7 !== 0) cells.push('');

            const gridHtml = `
              <div class="cal-grid">
                ${weekHeaders.map(w => `<div class="cal-head">${w}</div>`).join('')}
                ${cells.map(v => {
                    if (!v) return `<div class="cal-cell empty"></div>`;
                    const isToday = Number(v) === today;
                    return `<div class="cal-cell ${isToday ? 'today' : ''}">${v}</div>`;
                }).join('')}
              </div>
            `;

            return {
                title,
                badgeHtml: '📅',
                bodyHtml: `
                  <div class="cal-meta">${year}年${month}月</div>
                  ${gridHtml}
                `
            };
        }

        if (type === 'weather') {
            const city = (widget?.data?.city || '').trim();
            const last = widget?.data?.last;
            const lastFetched = widget?.data?.lastFetched;
            const ageMin = Number.isFinite(lastFetched) ? Math.floor((Date.now() - lastFetched) / 60000) : null;
            const ageStr = ageMin === null ? '' : `${ageMin} 分钟前`;

            if (last && typeof last.temp === 'number') {
                return {
                    title,
                    badgeHtml: '🌦️',
                    bodyHtml: `
                      <div class="wx-row">
                        <div class="wx-city">${this.escapeHtml(city || '天气')}</div>
                        <button class="widget-action widget-weather-refresh" data-id="${this.escapeHtml(widget.id)}" title="刷新">刷新</button>
                      </div>
                      <div class="wx-temp">${last.temp}<span class="wx-unit">°C</span></div>
                      <div class="wx-meta">${this.escapeHtml(ageStr)}</div>
                    `
                };
            }

            return {
                title,
                badgeHtml: '🌦️',
                bodyHtml: `
                  <div class="wx-row">
                    <div class="wx-city">${this.escapeHtml(city || '未设置城市')}</div>
                    <button class="widget-action widget-weather-refresh" data-id="${this.escapeHtml(widget.id)}" title="刷新">获取</button>
                  </div>
                  <div class="wx-meta">请输入城市后点击保存，再点获取</div>
                `
            };
        }

        const pinned = widget?.data?.pinned === true;
        const content = typeof widget?.data?.content === 'string' ? widget.data.content : '';
        return {
            title,
            badgeHtml: pinned ? '📌' : '📝',
            bodyHtml: `<div class="note-content">${content.trim() ? this.renderSimpleMarkdown(content.trim()) : `<span class="note-placeholder">${this.escapeHtml('点击编辑内容...')}</span>`}</div>`
        };
    },

    getWidgetDisplay(widget) {
        const type = widget?.type || 'note';
        const title = widget?.title || this.getDefaultWidgetTitle(type);

        if (type === 'todo') {
            const items = Array.isArray(widget?.data?.items) ? widget.data.items : [];
            const today = items.filter(i => i.scope !== 'week');
            const week = items.filter(i => i.scope === 'week');
            const countLine = `今天 ${today.filter(i => i.done).length}/${today.length} · 本周 ${week.filter(i => i.done).length}/${week.length}`;

            const renderTodoItem = (item) => {
                const checked = item.done ? 'checked' : '';
                return `<label class="todo-item"><input type="checkbox" class="widget-todo-toggle" data-widget="${this.escapeHtml(widget.id)}" data-item="${this.escapeHtml(item.id)}" ${checked}><span>${this.escapeHtml(item.text || '')}</span></label>`;
            };

            const todayHtml = today.slice(0, 2).map(renderTodoItem).join('');
            const weekHtml = week.slice(0, 2).map(renderTodoItem).join('');
            const listHtml = `
                <div class="todo-group">
                  <div class="todo-title">今天</div>
                  ${todayHtml || '<div class="todo-empty">暂无</div>'}
                </div>
                <div class="todo-group">
                  <div class="todo-title">本周</div>
                  ${weekHtml || '<div class="todo-empty">暂无</div>'}
                </div>
            `;
            return {
                icon: '✅',
                title,
                metaHtml: `
                    <div class="todo-count">${this.escapeHtml(countLine)}</div>
                    <div class="todo-list">${listHtml}</div>
                    <div class="todo-actions">
                      <button class="widget-action widget-todo-add" data-id="${this.escapeHtml(widget.id)}" data-scope="today" title="添加今天待办">+今天</button>
                      <button class="widget-action widget-todo-add" data-id="${this.escapeHtml(widget.id)}" data-scope="week" title="添加本周待办">+本周</button>
                    </div>
                `
            };
        }

        if (type === 'calendar') {
            const now = new Date();
            const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
            const d = `${now.getMonth() + 1}月${now.getDate()}日`;
            return {
                icon: '📅',
                title,
                metaHtml: `<span>${this.escapeHtml(ym)} · ${this.escapeHtml(d)}</span>`
            };
        }

        if (type === 'weather') {
            const city = (widget?.data?.city || '').trim();
            const last = widget?.data?.last;
            const lastFetched = widget?.data?.lastFetched;
            const ageMin = Number.isFinite(lastFetched) ? Math.floor((Date.now() - lastFetched) / 60000) : null;

            if (last && typeof last.temp === 'number') {
                const ageStr = ageMin === null ? '' : ` · ${ageMin}m`;
                return {
                    icon: '🌦️',
                    title,
                    metaHtml: `<span>${this.escapeHtml(city || '天气')}: ${last.temp}°C${this.escapeHtml(ageStr)}</span> <button class="widget-action widget-weather-refresh" data-id="${this.escapeHtml(widget.id)}" title="刷新">↻</button>`
                };
            }

            return {
                icon: '🌦️',
                title,
                metaHtml: `<span>${this.escapeHtml(city || '设置城市')} · 未获取</span> <button class="widget-action widget-weather-refresh" data-id="${this.escapeHtml(widget.id)}" title="刷新">↻</button>`
            };
        }

        // note (default)
        const pinned = widget?.data?.pinned === true;
        const content = typeof widget?.data?.content === 'string' ? widget.data.content : '';
        const preview = content.trim().slice(0, 120);
        return {
            icon: pinned ? '📌' : '📝',
            title,
            metaHtml: preview ? this.renderSimpleMarkdown(preview) : `<span>${this.escapeHtml('点击编辑')}</span>`
        };
    },

    getDefaultWidgetTitle(type) {
        if (type === 'todo') return '待办';
        if (type === 'calendar') return '日历';
        if (type === 'weather') return '天气';
        return '便签';
    },

    getNextOrderForCategory(categoryId) {
        const orders = [];
        this.shortcuts.forEach(s => {
            if (s.categoryId === categoryId && Number.isFinite(s.order)) orders.push(s.order);
        });
        this.widgets.forEach(w => {
            if (w.categoryId === categoryId && Number.isFinite(w.order)) orders.push(w.order);
        });
        if (!orders.length) return 0;
        return Math.max(...orders) + 1;
    },

    renderSimpleMarkdown(text) {
        const escaped = this.escapeHtml(text || '');
        return escaped
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            .replace(/\*([^*]+)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    },

    async maybeRefreshWeather(widget, force = false) {
        if (!widget || widget.type !== 'weather') return;
        const city = (widget?.data?.city || '').trim();
        if (!city) return;

        if (!widget.data) widget.data = {};
        const lastFetched = widget.data.lastFetched;
        const isFresh = Number.isFinite(lastFetched) && (Date.now() - lastFetched) < 30 * 60 * 1000;
        if (!force && isFresh) return;

        const cached = this.weatherCache.get(city);
        if (!force && cached && (Date.now() - cached.fetchedAt) < 30 * 60 * 1000) {
            widget.data.last = cached.last;
            widget.data.lastFetched = cached.fetchedAt;
            await Storage.saveWidgets(this.widgets);
            await this.render();
            return;
        }

        try {
            const weather = await this.fetchWeatherByCity(city);
            if (!weather) return;

            widget.data.last = weather.last;
            widget.data.lastFetched = weather.fetchedAt;
            this.weatherCache.set(city, weather);

            await Storage.saveWidgets(this.widgets);
            await this.render();
        } catch (e) {
            console.warn('[Widgets] Weather fetch failed:', e?.message || e);
        }
    },

    async fetchWeatherByCity(city) {
        const timeoutFetchJson = async (url, timeoutMs = 4000) => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
            try {
                const res = await fetch(url, { signal: controller.signal });
                if (!res.ok) return null;
                return await res.json();
            } finally {
                clearTimeout(timeoutId);
            }
        };

        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=zh&format=json`;
        const geo = await timeoutFetchJson(geoUrl, 4000);
        const first = geo?.results?.[0];
        if (!first) return null;

        const lat = first.latitude;
        const lon = first.longitude;
        if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;

        const wxUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`;
        const wx = await timeoutFetchJson(wxUrl, 4000);
        const temp = wx?.current?.temperature_2m;
        const code = wx?.current?.weather_code;
        if (!Number.isFinite(temp)) return null;

        const fetchedAt = Date.now();
        return {
            fetchedAt,
            last: { temp: Math.round(temp), code: Number.isFinite(code) ? code : null }
        };
    },

    /**
     * 绑定事件
     */
    bindEvents() {
        const container = document.getElementById('shortcutsGrid');
        const modal = document.getElementById('shortcutModal');
        const closeBtn = document.getElementById('closeShortcutModal');
        const cancelBtn = document.getElementById('cancelShortcut');
        const saveBtn = document.getElementById('saveShortcut');
        const modalTitle = document.getElementById('shortcutModalTitle');
        const addTabShortcut = document.getElementById('addTabShortcut');
        const addTabWidget = document.getElementById('addTabWidget');
        const widgetType = document.getElementById('widgetType');
        const widgetTitle = document.getElementById('widgetTitle');
        const iconOptions = document.querySelectorAll('.icon-option');
        const iconInput = document.getElementById('shortcutIcon');
        const emojiPicker = document.getElementById('emojiPicker');

        addTabShortcut?.addEventListener('click', () => {
            this.setAddItemTab('shortcut');
            if (modalTitle) modalTitle.textContent = '➕ 添加快捷方式';
            document.getElementById('shortcutName')?.focus();
        });

        addTabWidget?.addEventListener('click', () => {
            this.setAddItemTab('widget');
            if (modalTitle) modalTitle.textContent = '➕ 添加小组件';
            widgetTitle?.focus();
        });

        widgetType?.addEventListener('change', () => {
            this.updateWidgetFieldVisibility(widgetType.value);
            if (this.activeAddTab === 'widget' && widgetTitle && !widgetTitle.value.trim()) {
                widgetTitle.value = this.getDefaultWidgetTitle(widgetType.value);
            }
        });

        // Icon options switching
        iconOptions.forEach(option => {
            option.addEventListener('click', () => {
                iconOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');

                const type = option.getAttribute('data-type');
                iconInput.style.display = (type === 'custom' || type === 'emoji') ? 'block' : 'none';
                emojiPicker.style.display = (type === 'emoji') ? 'block' : 'none';

                const uploadPreview = document.getElementById('uploadPreview');
                if (type === 'upload') {
                    document.getElementById('iconUploadInput').click();
                } else {
                    uploadPreview.style.display = 'none';
                }

                if (type === 'auto') {
                    iconInput.placeholder = '';
                    const url = document.getElementById('shortcutUrl').value.trim();
                    if (url) this.updateIconCandidates(url);
                } else if (type === 'custom') {
                    iconInput.placeholder = '输入图片 URL...';
                    document.getElementById('iconCandidates').style.display = 'none';
                } else if (type === 'emoji') {
                    iconInput.placeholder = '输入或选择表情符号...';
                    this.renderEmojiGrid('common');
                    document.getElementById('iconCandidates').style.display = 'none';
                } else {
                    document.getElementById('iconCandidates').style.display = 'none';
                }
            });
        });

        // URL input change to trigger icon candidates
        document.getElementById('shortcutUrl')?.addEventListener('blur', (e) => {
            const activeOption = document.querySelector('.icon-option.active');
            if (activeOption && activeOption.dataset.type === 'auto') {
                const url = e.target.value.trim();
                if (url) this.updateIconCandidates(url);
            }
        });

        // Icon candidate selection
        document.getElementById('iconCandidates')?.addEventListener('click', (e) => {
            const candidate = e.target.closest('.icon-candidate');
            if (candidate) {
                document.querySelectorAll('.icon-candidate').forEach(c => c.classList.remove('active'));
                candidate.classList.add('active');
                iconInput.value = candidate.dataset.url;
            }
        });

        // File upload handling
        const uploadInput = document.getElementById('iconUploadInput');
        const uploadPreview = document.getElementById('uploadPreview');
        const previewImg = uploadPreview?.querySelector('img');

        const removeUpload = document.getElementById('removeUpload');

        uploadInput?.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (previewImg) previewImg.src = event.target.result;
                    if (uploadPreview) uploadPreview.style.display = 'flex';
                };
                reader.readAsDataURL(file);
            }
        });

        removeUpload?.addEventListener('click', () => {
            if (uploadInput) uploadInput.value = '';
            if (uploadPreview) uploadPreview.style.display = 'none';
            if (previewImg) previewImg.src = '';
        });

        // Emoji category switching
        const emojiCatBtns = document.querySelectorAll('.emoji-cat-btn');
        emojiCatBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                emojiCatBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.renderEmojiGrid(btn.getAttribute('data-cat'));
            });
        });

        // Emoji selection via delegation
        const emojiGrid = document.getElementById('emojiGrid');
        emojiGrid?.addEventListener('click', (e) => {
            const item = e.target.closest('.emoji-item');
            if (item) {
                iconInput.value = item.textContent;
            }
        });

        // Open Add Modal use delegation
        container?.addEventListener('click', (e) => {
            const todoAdd = e.target.closest('.widget-todo-add');
            if (todoAdd) {
                e.preventDefault();
                e.stopPropagation();

                const widget = this.widgets.find(w => w.id === todoAdd.dataset.id);
                if (!widget || widget.type !== 'todo') return;
                if (!widget.data) widget.data = { items: [] };
                if (!Array.isArray(widget.data.items)) widget.data.items = [];

                const scope = todoAdd.dataset.scope === 'week' ? 'week' : 'today';
                const text = prompt(scope === 'week' ? '添加本周待办：' : '添加今天待办：');
                if (!text || !text.trim()) return;

                widget.data.items.push({
                    id: Storage.generateId(),
                    text: text.trim(),
                    done: false,
                    scope
                });

                Storage.saveWidgets(this.widgets).then(() => this.render());
                return;
            }

            const refreshBtn = e.target.closest('.widget-weather-refresh');
            if (refreshBtn) {
                e.preventDefault();
                e.stopPropagation();
                const widget = this.widgets.find(w => w.id === refreshBtn.dataset.id);
                if (widget) this.maybeRefreshWeather(widget, true);
                return;
            }

            if (e.target.closest('.widget-action')) {
                return;
            }

            if (e.target.closest('.widget-todo-toggle')) {
                return;
            }

            const widgetCard = e.target.closest('.widget-card');
            if (widgetCard && !e.target.closest('a')) {
                const id = widgetCard.dataset.id;
                if (id) this.showModal({ kind: 'widget', id });
                return;
            }

            const addBtn = e.target.closest('#addShortcutBtn');
            if (addBtn) {
                this.showModal();
            }
        });

        container?.addEventListener('change', (e) => {
            const checkbox = e.target.closest('.widget-todo-toggle');
            if (!checkbox) return;

            const widgetId = checkbox.dataset.widget;
            const itemId = checkbox.dataset.item;
            const widget = this.widgets.find(w => w.id === widgetId);
            if (!widget || widget.type !== 'todo' || !Array.isArray(widget.data?.items)) return;

            const item = widget.data.items.find(i => i.id === itemId);
            if (!item) return;
            item.done = checkbox.checked;

            Storage.saveWidgets(this.widgets).then(() => this.render());
        });

        // Close Modal
        closeBtn?.addEventListener('click', () => this.hideModal());
        cancelBtn?.addEventListener('click', () => this.hideModal());

        // Save
        saveBtn?.addEventListener('click', () => {
            if (this.activeAddTab === 'widget') {
                this.saveWidget();
            } else {
                this.save();
            }
        });

        // Context Menu
        if (container) {
            container.addEventListener('contextmenu', (e) => {
                const card = e.target.closest('.shortcut-card:not(.btn-add-shortcut)');
                if (card) {
                    e.preventDefault();
                    this.contextTarget = {
                        type: (card.dataset.kind === 'widget') ? 'widget' : 'shortcut',
                        id: card.dataset.id
                    };
                    App.showContextMenu(e.clientX, e.clientY);
                }
            });
        }

        // Grid drop to end (bind once)
        if (container && !this.gridDnDBound) {
            this.gridDnDBound = true;

            container.addEventListener('dragover', (e) => {
                if (this.draggingItem) {
                    e.preventDefault();
                }
            });

            container.addEventListener('drop', async (e) => {
                const raw = e.dataTransfer?.getData('mytabItem');
                if (!raw) return;
                if (e.target.closest('.shortcut-card:not(.btn-add-shortcut)')) return;

                let dragged;
                try { dragged = JSON.parse(raw); } catch (err) { return; }
                if (!dragged?.id) return;
                await this.reorderInCurrentCategory(dragged.kind, dragged.id, null, null);
            });
        }
    },

    /**
     * 渲染表情网格
     */
    renderEmojiGrid(category) {
        const grid = document.getElementById('emojiGrid');
        if (!grid) return;

        const emojis = this.emojis[category] || [];
        grid.innerHTML = emojis.map(emoji => `
            <div class="emoji-item">${emoji}</div>
        `).join('');
    },

    /**
     * 保存快捷方式
     */
    async save() {
        if (this.isSaving) return;

        const idInput = document.getElementById('editShortcutId');
        const nameInput = document.getElementById('shortcutName');
        const urlInput = document.getElementById('shortcutUrl');
        const iconInput = document.getElementById('shortcutIcon');
        const uploadInput = document.getElementById('iconUploadInput');
        const saveBtn = document.getElementById('saveShortcut');

        this.isSaving = true;
        if (saveBtn) saveBtn.disabled = true;

        try {
            const name = nameInput.value.trim();
            let url = urlInput.value.trim();
            const activeOption = document.querySelector('.icon-option.active');
            const type = activeOption ? activeOption.dataset.type : 'auto';

            let icon = iconInput.value.trim();
            if (type === 'auto' && !icon) icon = 'auto';

            if (!name) {
                nameInput.focus();
                return;
            }

            if (!url) {
                urlInput.focus();
                return;
            }

            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
            }

            let iconCached = type === 'upload';

            if (type === 'upload' && uploadInput?.files[0]) {
                const file = uploadInput.files[0];
                console.log(`[Shortcuts] User selected file to upload: ${file.name}, size: ${file.size}, type: ${file.type}`);
                const iconId = `local-${Date.now()}`;
                try {
                    await ImageDB.saveImage(iconId, file);
                    console.log(`[Shortcuts] Saved local icon as ${iconId}`);
                    icon = iconId;
                } catch (e) {
                    console.error('[Shortcuts] Failed to save local icon:', e);
                    alert('保存图片失败，请重试');
                    return;
                }
            } else if (type === 'upload') {
                const id = idInput.value;
                if (id) {
                    const existing = this.shortcuts.find(s => s.id === id);
                    if (existing && existing.icon.startsWith('local-')) {
                        icon = existing.icon;
                    }
                }
            }

            if (type === 'emoji') iconCached = true;

            if (idInput.value) {
                const index = this.shortcuts.findIndex(s => s.id === idInput.value);
                if (index !== -1) {
                    const existing = this.shortcuts[index];
                    const oldIcon = existing.icon;
                    if (oldIcon.startsWith('local-') && oldIcon !== icon) {
                        ImageDB.deleteImage(oldIcon).catch(console.error);
                    }

                    if ((type === 'auto' || type === 'custom') && oldIcon === icon && existing.url === url) {
                        iconCached = existing.iconCached === true;
                    }

                    existing.name = name;
                    existing.url = url;
                    existing.icon = icon;
                    existing.iconCached = iconCached;
                }
            } else {
                const order = this.getNextOrderForCategory(Categories.currentCategory);
                this.shortcuts.push({
                    id: Storage.generateId(),
                    name,
                    url,
                    icon,
                    iconCached,
                    order,
                    categoryId: Categories.currentCategory
                });
            }

            await Storage.saveShortcuts(this.shortcuts);
            this.render();
            this.hideModal();
        } finally {
            this.isSaving = false;
            if (saveBtn) saveBtn.disabled = false;
        }
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

    async deleteWidget(id) {
        const widget = this.widgets.find(w => w.id === id);
        if (confirm(`确定要删除 "${widget?.title || '小组件'}" 吗？`)) {
            this.widgets = this.widgets.filter(w => w.id !== id);
            await Storage.saveWidgets(this.widgets);
            this.render();
        }
    },

    editWidget(id) {
        this.showModal({ kind: 'widget', id });
    },

    async saveWidget() {
        if (this.isSaving) return;

        const idInput = document.getElementById('editWidgetId');
        const typeEl = document.getElementById('widgetType');
        const sizeEl = document.getElementById('widgetSize');
        const titleEl = document.getElementById('widgetTitle');
        const noteEl = document.getElementById('widgetNoteContent');
        const notePinnedEl = document.getElementById('widgetNotePinned');
        const cityEl = document.getElementById('widgetWeatherCity');
        const saveBtn = document.getElementById('saveShortcut');

        this.isSaving = true;
        if (saveBtn) saveBtn.disabled = true;

        try {
            const type = typeEl?.value || 'note';
            const size = (sizeEl?.value === '4') ? '4' : '8';
            const title = (titleEl?.value || '').trim() || this.getDefaultWidgetTitle(type);

            let data = {};
            if (type === 'note') {
                data = {
                    content: noteEl?.value || '',
                    pinned: notePinnedEl?.checked === true
                };
            } else if (type === 'todo') {
                data = { items: [] };
            } else if (type === 'calendar') {
                data = {};
            } else if (type === 'weather') {
                const city = (cityEl?.value || '').trim();
                if (!city) {
                    alert('请先填写城市');
                    cityEl?.focus();
                    return;
                }
                data = {
                    city,
                    last: null,
                    lastFetched: null
                };
            }

            if (idInput?.value) {
                const index = this.widgets.findIndex(w => w.id === idInput.value);
                if (index !== -1) {
                    const existing = this.widgets[index];

                    if (existing.type === type) {
                        if (type === 'todo' || type === 'calendar') {
                            data = existing.data || data;
                        }
                        if (type === 'weather') {
                            const nextCity = data.city || '';
                            const oldCity = existing.data?.city || '';
                            data.last = existing.data?.last || null;
                            data.lastFetched = existing.data?.lastFetched || null;
                            if (nextCity && oldCity && nextCity !== oldCity) {
                                data.last = null;
                                data.lastFetched = null;
                            }
                        }
                    }

                    existing.type = type;
                    existing.size = size;
                    existing.title = title;
                    existing.data = data;
                }
            } else {
                const order = this.getNextOrderForCategory(Categories.currentCategory);
                this.widgets.push({
                    id: Storage.generateId(),
                    type,
                    size,
                    title,
                    data,
                    order,
                    categoryId: Categories.currentCategory
                });
            }

            await Storage.saveWidgets(this.widgets);
            await this.render();
            this.hideModal();

            // Best-effort: auto refresh weather after creation
            if (type === 'weather') {
                const widget = this.widgets.find(w => w.id === (idInput?.value || this.widgets[this.widgets.length - 1]?.id));
                if (widget) this.maybeRefreshWeather(widget, true);
            }
        } finally {
            this.isSaving = false;
            if (saveBtn) saveBtn.disabled = false;
        }
    },

    async moveWidgetToCategory(widgetId, categoryId) {
        const index = this.widgets.findIndex(w => w.id === widgetId);
        if (index === -1) return;
        if (this.widgets[index].categoryId === categoryId) return;

        this.widgets[index].categoryId = categoryId;
        this.widgets[index].order = this.getNextOrderForCategory(categoryId);
        await Storage.saveWidgets(this.widgets);

        this.render();
        Categories.render();
    },

    async moveCategoryItemsToHome(categoryId) {
        let changed = false;
        this.shortcuts.forEach(s => {
            if (s.categoryId === categoryId) {
                s.categoryId = 'home';
                changed = true;
            }
        });
        this.widgets.forEach(w => {
            if (w.categoryId === categoryId) {
                w.categoryId = 'home';
                changed = true;
            }
        });
        if (!changed) return;
        await Promise.all([
            Storage.saveShortcuts(this.shortcuts),
            Storage.saveWidgets(this.widgets)
        ]);
    },

    /**
     * 显示模态框
     */
    showModal(arg = null) {
        const modal = document.getElementById('shortcutModal');
        const title = document.getElementById('shortcutModalTitle');
        const nameInput = document.getElementById('shortcutName');
        const urlInput = document.getElementById('shortcutUrl');
        const iconInput = document.getElementById('shortcutIcon');
        const idInput = document.getElementById('editShortcutId');
        const iconOptions = document.querySelectorAll('.icon-option');
        const emojiPicker = document.getElementById('emojiPicker');

        const uploadInput = document.getElementById('iconUploadInput');
        const uploadPreview = document.getElementById('uploadPreview');
        const previewImg = uploadPreview?.querySelector('img');

        const widgetIdInput = document.getElementById('editWidgetId');
        const widgetType = document.getElementById('widgetType');
        const widgetSize = document.getElementById('widgetSize');
        const widgetTitle = document.getElementById('widgetTitle');
        const widgetNote = document.getElementById('widgetNoteContent');
        const widgetPinned = document.getElementById('widgetNotePinned');
        const widgetCity = document.getElementById('widgetWeatherCity');

        let kind = 'shortcut';
        let id = arg;
        if (arg && typeof arg === 'object') {
            kind = arg.kind || 'shortcut';
            id = arg.id || null;
        }

        this.setAddItemTab(kind === 'widget' ? 'widget' : 'shortcut');

        // reset widget form
        if (widgetIdInput) widgetIdInput.value = '';
        if (widgetType) widgetType.value = 'note';
        if (widgetSize) widgetSize.value = '8';
        if (widgetTitle) widgetTitle.value = '';
        if (widgetNote) widgetNote.value = '';
        if (widgetPinned) widgetPinned.checked = false;
        if (widgetCity) widgetCity.value = '';
        this.updateWidgetFieldVisibility('note');

        nameInput.value = '';
        urlInput.value = '';
        iconInput.value = '';
        idInput.value = '';
        if (uploadInput) uploadInput.value = '';
        if (uploadPreview) uploadPreview.style.display = 'none';
        if (previewImg) previewImg.src = '';

        iconOptions.forEach(opt => opt.classList.remove('active'));
        document.querySelector('.icon-option[data-type="auto"]').classList.add('active');
        iconInput.style.display = 'none';
        emojiPicker.style.display = 'none';

        if (kind === 'widget') {
            if (id) {
                const widget = this.widgets.find(w => w.id === id);
                if (widget) {
                    title.textContent = '?? 编辑小组件';
                    if (widgetIdInput) widgetIdInput.value = widget.id;
                    if (widgetType) widgetType.value = widget.type || 'note';
                    if (widgetSize) widgetSize.value = (widget.size === '4' || widget.size === 4) ? '4' : '8';
                    if (widgetTitle) widgetTitle.value = widget.title || this.getDefaultWidgetTitle(widget.type);

                    this.updateWidgetFieldVisibility(widget.type || 'note');
                    if (widget.type === 'note') {
                        if (widgetNote) widgetNote.value = widget.data?.content || '';
                        if (widgetPinned) widgetPinned.checked = widget.data?.pinned === true;
                    } else if (widget.type === 'weather') {
                        if (widgetCity) widgetCity.value = widget.data?.city || '';
                    }
                }
            } else {
                title.textContent = '? 添加小组件';
                if (widgetTitle && widgetType) widgetTitle.value = this.getDefaultWidgetTitle(widgetType.value || 'note');
            }

            modal.classList.add('show');
            widgetTitle?.focus();
            return;
        }

        if (id) {
            const shortcut = this.shortcuts.find(s => s.id === id);
            if (shortcut) {
                title.textContent = '✏️ 编辑快捷方式';
                nameInput.value = shortcut.name;
                urlInput.value = shortcut.url;
                idInput.value = shortcut.id;

                iconOptions.forEach(opt => opt.classList.remove('active'));
                if (shortcut.icon === 'auto' || !shortcut.icon) {
                    document.querySelector('.icon-option[data-type="auto"]').classList.add('active');
                    iconInput.style.display = 'none';
                    emojiPicker.style.display = 'none';
                } else if (shortcut.icon.startsWith('http')) {
                    document.querySelector('.icon-option[data-type="custom"]').classList.add('active');
                    iconInput.value = shortcut.icon;
                    iconInput.style.display = 'block';
                    emojiPicker.style.display = 'none';
                } else if (shortcut.icon.startsWith('local-')) {
                    document.querySelector('.icon-option[data-type="upload"]').classList.add('active');
                    iconInput.style.display = 'none';
                    emojiPicker.style.display = 'none';
                    if (uploadPreview && previewImg) {
                        uploadPreview.style.display = 'flex';
                        ImageDB.getImage(shortcut.icon).then(blob => {
                            if (blob) previewImg.src = ImageDB.getObjectUrl(shortcut.icon, blob);
                        });
                    }
                } else {
                    document.querySelector('.icon-option[data-type="emoji"]').classList.add('active');
                    iconInput.value = shortcut.icon;
                    iconInput.style.display = 'block';
                    emojiPicker.style.display = 'block';
                    this.renderEmojiGrid('common');
                }
            }
        } else {
            title.textContent = '➕ 添加快捷方式';
            idInput.value = '';
            nameInput.value = '';
            urlInput.value = '';

            iconOptions.forEach(opt => opt.classList.remove('active'));
            document.querySelector('.icon-option[data-type="auto"]').classList.add('active');
            iconInput.style.display = 'none';
            iconInput.value = '';
        }

        modal.classList.add('show');
        nameInput.focus();
    },

    setAddItemTab(tab) {
        const tabShortcut = document.getElementById('addTabShortcut');
        const tabWidget = document.getElementById('addTabWidget');
        const panelShortcut = document.getElementById('addPanelShortcut');
        const panelWidget = document.getElementById('addPanelWidget');
        if (!tabShortcut || !tabWidget || !panelShortcut || !panelWidget) return;

        this.activeAddTab = tab === 'widget' ? 'widget' : 'shortcut';
        tabShortcut.classList.toggle('active', this.activeAddTab === 'shortcut');
        tabWidget.classList.toggle('active', this.activeAddTab === 'widget');
        panelShortcut.style.display = this.activeAddTab === 'shortcut' ? '' : 'none';
        panelWidget.style.display = this.activeAddTab === 'widget' ? '' : 'none';
    },

    updateWidgetFieldVisibility(type) {
        document.querySelectorAll('.widget-field').forEach(el => {
            el.style.display = el.getAttribute('data-widget') === type ? '' : 'none';
        });
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
     * 更新图标候选列表
     * 只使用三个来源：Google API、DuckDuckGo、网站直接获取
     */
    async updateIconCandidates(url) {
        const container = document.getElementById('iconCandidates');
        if (!container) return;

        const requestId = ++this.iconCandidateRequestId;

        let hostname = '';
        let fullUrl = url;
        try {
            if (!url.startsWith('http')) fullUrl = 'https://' + url;
            hostname = new URL(fullUrl).hostname;
        } catch (e) {
            container.style.display = 'none';
            return;
        }

        container.style.display = 'grid';
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 10px; font-size: 12px; color: var(--text-muted);">正在获取图标...</div>';

        const seenIcons = new Set();
        const candidates = [];

        const addCandidate = (iconUrl, priority = 0) => {
            if (seenIcons.has(iconUrl)) return;
            seenIcons.add(iconUrl);
            candidates.push({ url: iconUrl, priority });
        };

        // 来源1: Google Favicon API (高清 128px)
        addCandidate(`https://www.google.com/s2/favicons?domain=${hostname}&sz=128`, 1);

        // 来源2: DuckDuckGo
        addCandidate(`https://icons.duckduckgo.com/ip3/${hostname}.ico`, 2);

        // 来源3: 直接从网站获取 (尝试多种常见路径)
        const baseUrl = `https://${hostname}`;
        addCandidate(`${baseUrl}/apple-touch-icon.png`, 0); // 通常是最高清的
        addCandidate(`${baseUrl}/favicon.ico`, 3);

        // 尝试从网站 HTML 中解析更多图标
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2500);
            const response = await fetch(fullUrl, {
                mode: 'cors',
                headers: { 'Accept': 'text/html' },
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (response.ok) {
                const html = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                // 查找 apple-touch-icon (最高清)
                const appleIcon = doc.querySelector('link[rel="apple-touch-icon"], link[rel="apple-touch-icon-precomposed"]');
                if (appleIcon && appleIcon.href) {
                    const iconUrl = new URL(appleIcon.getAttribute('href'), fullUrl).href;
                    addCandidate(iconUrl, -1); // 最高优先级
                }

                // 查找大尺寸 icon
                const largeIcons = doc.querySelectorAll('link[rel="icon"][sizes], link[rel="shortcut icon"]');
                largeIcons.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href) {
                        const iconUrl = new URL(href, fullUrl).href;
                        const sizes = link.getAttribute('sizes');
                        // 优先大尺寸
                        const priority = sizes ? (parseInt(sizes) >= 128 ? 0 : 2) : 2;
                        addCandidate(iconUrl, priority);
                    }
                });
            }
        } catch (e) {
            console.log('[Shortcuts] Could not fetch HTML for icons:', e.message);
        }

        if (requestId !== this.iconCandidateRequestId) return;

        // 按优先级排序并渲染
        candidates.sort((a, b) => a.priority - b.priority);

        container.innerHTML = '';
        candidates.forEach(({ url: iconUrl }) => {
            const div = document.createElement('div');
            div.className = 'icon-candidate';
            div.dataset.url = iconUrl;

            const img = document.createElement('img');
            img.src = iconUrl;
            img.alt = 'icon';
            img.onerror = () => div.remove();

            div.appendChild(img);
            container.appendChild(div);
        });

        // 添加搜索按钮
        const searchBtn = document.createElement('div');
        searchBtn.className = 'icon-candidate search-icon-btn';
        searchBtn.title = '在网页中搜索图标';
        searchBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="M21 21l-4.35-4.35"></path>
            </svg>
        `;
        searchBtn.onclick = (e) => {
            e.stopPropagation();
            const query = hostname.split('.').filter(p => p !== 'com' && p !== 'google' && p !== 'www').join(' ');
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query + ' logo icon png')}&tbm=isch`, '_blank');
        };
        container.appendChild(searchBtn);
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
