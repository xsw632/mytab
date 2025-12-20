/**
 * Shortcuts Module - 快捷方式管理
 */

const Shortcuts = {
    shortcuts: [],
    contextTarget: null,
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
        // Ensure DB is ready before render if possible
        if (window.ImageDB) await ImageDB.init();
        await this.render();
        this.bindEvents();
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
                        cachedIcons[s.id] = URL.createObjectURL(blob);
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
        const shortcutsHtml = shortcuts.map(shortcut => {
            const iconHtml = this.getIconHtml(shortcut, cachedIcons[shortcut.id]);
            return `
        <a class="shortcut-card" href="${this.escapeHtml(shortcut.url)}" 
           data-id="${shortcut.id}" title="${this.escapeHtml(shortcut.name)}"
           draggable="true">
          <div class="shortcut-icon" id="icon-${shortcut.id}" data-rendering-finished="false">
            ${iconHtml}
          </div>
          <span class="shortcut-name">${this.escapeHtml(shortcut.name)}</span>
        </a>
      `;
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

        container.innerHTML = shortcutsHtml + addBtnHtml;

        // 3. Mark as finished rendering to allow secondary cache logic if needed
        container.querySelectorAll('.shortcut-icon').forEach(el => {
            el.dataset.renderingFinished = 'true';
        });

        // Re-bind events for shortcuts
        const shortcutCards = container.querySelectorAll('.shortcut-card:not(.btn-add-shortcut)');
        shortcutCards.forEach(card => {
            // Drag and Drop
            card.addEventListener('dragstart', (e) => {
                const id = card.getAttribute('data-id');
                e.dataTransfer.setData('shortcutId', id);
                card.classList.add('dragging');

                // Set ghost image or just visual state
                setTimeout(() => card.style.opacity = '0.5', 0);
            });

            card.addEventListener('dragend', () => {
                card.classList.remove('dragging');
                card.style.opacity = '1';

                // Clear all category highlights
                document.querySelectorAll('.category-item').forEach(item => {
                    item.classList.remove('drag-over');
                });
            });

            // Context Menu
            card.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.contextTarget = card.getAttribute('data-id');
                const menu = document.getElementById('contextMenu');
                if (menu) {
                    menu.style.left = `${e.pageX}px`;
                    menu.style.top = `${e.pageY}px`;
                    menu.classList.add('show');
                }
            });
        });

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
                                ImageDB.saveImage(target.dataset.src, blob);
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
                                    ImageDB.saveImage(target.dataset.src, blob);
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
                        const response = await fetch(url);
                        if (response.ok) {
                            const blob = await response.blob();
                            await ImageDB.saveImage(url, blob);

                            // 更新 shortcut 的缓存标记
                            shortcut.iconCached = true;

                            // 更新图片
                            const blobUrl = URL.createObjectURL(blob);
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

        Categories.render();
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

    /**
     * 绑定事件
     */
    bindEvents() {
        const container = document.getElementById('shortcutsGrid');
        const modal = document.getElementById('shortcutModal');
        const closeBtn = document.getElementById('closeShortcutModal');
        const cancelBtn = document.getElementById('cancelShortcut');
        const saveBtn = document.getElementById('saveShortcut');
        const iconOptions = document.querySelectorAll('.icon-option');
        const iconInput = document.getElementById('shortcutIcon');
        const emojiPicker = document.getElementById('emojiPicker');

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
        const idInput = document.getElementById('editShortcutId');
        const nameInput = document.getElementById('shortcutName');
        const urlInput = document.getElementById('shortcutUrl');
        const iconInput = document.getElementById('shortcutIcon');
        const uploadInput = document.getElementById('iconUploadInput');

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

        // 保存时预缓存图标到 IndexedDB
        let iconCached = false;
        if (window.ImageDB && (type === 'auto' || type === 'custom')) {
            // Reconstruct temp shortcut object to use helper
            const tempShortcut = {
                url: url,
                icon: (type === 'auto' || !icon) ? 'auto' : icon
            };
            const iconUrl = this.getIconCacheKey(tempShortcut);

            if (iconUrl && iconUrl.startsWith('http')) {
                // 强制从网络获取并缓存
                try {
                    console.log(`[Shortcuts] Saving/Caching icon: ${iconUrl}`);
                    const response = await fetch(iconUrl);
                    if (response.ok) {
                        const blob = await response.blob();
                        await ImageDB.saveImage(iconUrl, blob);
                        iconCached = true;
                        console.log(`[Shortcuts] Icon cached successfully: ${iconUrl}`);
                    }
                } catch (e) {
                    console.warn(`[Shortcuts] Failed to cache icon: ${iconUrl}`, e);
                }
            }
        } else if (type === 'upload') {
            // 本地上传的图标已经保存到 IndexedDB
            iconCached = true;
        }

        if (idInput.value) {
            const index = this.shortcuts.findIndex(s => s.id === idInput.value);
            if (index !== -1) {
                const oldIcon = this.shortcuts[index].icon;
                if (oldIcon.startsWith('local-') && oldIcon !== icon) {
                    ImageDB.deleteImage(oldIcon).catch(console.error);
                }

                this.shortcuts[index].name = name;
                this.shortcuts[index].url = url;
                this.shortcuts[index].icon = icon;
                this.shortcuts[index].iconCached = iconCached;
            }
        } else {
            this.shortcuts.push({
                id: Storage.generateId(),
                name,
                url,
                icon,
                iconCached,
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
        const nameInput = document.getElementById('shortcutName');
        const urlInput = document.getElementById('shortcutUrl');
        const iconInput = document.getElementById('shortcutIcon');
        const idInput = document.getElementById('editShortcutId');
        const iconOptions = document.querySelectorAll('.icon-option');
        const emojiPicker = document.getElementById('emojiPicker');

        const uploadInput = document.getElementById('iconUploadInput');
        const uploadPreview = document.getElementById('uploadPreview');
        const previewImg = uploadPreview?.querySelector('img');

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
                            if (blob) previewImg.src = URL.createObjectURL(blob);
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
     */
    async updateIconCandidates(url) {
        const container = document.getElementById('iconCandidates');
        if (!container) return;

        let hostname = '';
        try {
            if (!url.startsWith('http')) url = 'https://' + url;
            hostname = new URL(url).hostname;
        } catch (e) {
            container.style.display = 'none';
            return;
        }

        container.style.display = 'grid';
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 10px; font-size: 12px; color: var(--text-muted);">正在获取图标...</div>';

        const providers = [
            `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`,
            `https://icons.duckduckgo.com/ip3/${hostname}.ico`,
            `https://api.faviconkit.com/${hostname}/128`,
            `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`,
            `https://${hostname}/favicon.ico`
        ];

        container.innerHTML = '';
        const seenIcons = new Set();

        const addCandidate = (iconUrl) => {
            // Deduplication based on URL (simple start)
            if (seenIcons.has(iconUrl)) return;
            seenIcons.add(iconUrl);

            const div = document.createElement('div');
            div.className = 'icon-candidate';
            div.dataset.url = iconUrl;

            const img = document.createElement('img');
            img.src = iconUrl;
            img.alt = 'icon';
            img.onerror = () => div.remove(); // Compliant handler

            div.appendChild(img);
            container.appendChild(div);
        };

        // Add initial providers
        providers.forEach(addCandidate);

        // Add Search Button
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
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query + ' logo favicon overlay:1')}&tbm=isch`, '_blank');
        };
        container.appendChild(searchBtn);

        // Try to get more from favicongrabber
        try {
            const resp = await fetch(`https://favicongrabber.com/api/grab/${hostname}`);
            const data = await resp.json();
            if (data.icons && data.icons.length > 0) {
                data.icons.slice(0, 5).forEach(icon => addCandidate(icon.src));
            }
        } catch (e) { }
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
