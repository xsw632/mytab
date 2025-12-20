/**
 * ImageDB - IndexedDB wrapper for caching images
 */
const ImageDB = {
    dbName: 'MyTabAssets',
    storeName: 'images',
    db: null,
    initPromise: null,

    /**
     * Initialize the database
     */
    async init() {
        if (this.initPromise) return this.initPromise;

        this.initPromise = new Promise((resolve, reject) => {
            console.log('[ImageDB] Opening database...');
            const request = indexedDB.open(this.dbName, 1);

            request.onerror = (event) => {
                console.error('[ImageDB] IndexedDB error:', event.target.error);
                reject(event.target.error);
            };

            request.onupgradeneeded = (event) => {
                console.log('[ImageDB] Upgrading database...');
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName);
                }
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                console.log('[ImageDB] Database initialized successfully');
                resolve();
            };
        });
        return this.initPromise;
    },

    /**
     * Save an image blob to the database
     * @param {string} key - Unique key (URL or ID)
     * @param {Blob} blob - Image blob
     */
    async saveImage(key, blob) {
        if (!this.db) await this.init();
        console.log(`[ImageDB] Saving image: ${key}, size: ${blob.size} bytes, type: ${blob.type}`);
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.put(blob, key);

            request.onsuccess = () => {
                console.log(`[ImageDB] Successfully saved: ${key}`);
                resolve(key);
            };
            request.onerror = (e) => {
                console.error(`[ImageDB] Failed to save ${key}:`, e.target.error);
                reject(e.target.error);
            };
        });
    },

    /**
     * Delete an image from the database
     * @param {string} key 
     */
    async deleteImage(key) {
        if (!this.db) await this.init();
        console.log(`[ImageDB] Deleting image: ${key}`);
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.delete(key);
            request.onsuccess = () => {
                console.log(`[ImageDB] Successfully deleted: ${key}`);
                resolve();
            };
            request.onerror = (e) => {
                console.error(`[ImageDB] Failed to delete ${key}:`, e.target.error);
                reject(e.target.error);
            };
        });
    },

    /**
     * Get an image blob from the database
     * @param {string} key - Unique key (URL or ID)
     * @returns {Promise<Blob|null>}
     */
    async getImage(key) {
        if (!this.db) await this.init();
        // console.log(`[ImageDB] Fetching image: ${key}`);
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get(key);

            request.onsuccess = (event) => {
                const result = event.target.result;
                if (result) {
                    console.log(`[ImageDB] Found image: ${key}, size: ${result.size}`);
                    resolve(result);
                } else {
                    console.warn(`[ImageDB] Image not found: ${key}`);
                    resolve(null);
                }
            };
            request.onerror = (e) => {
                console.error(`[ImageDB] Error fetching ${key}:`, e.target.error);
                reject(e.target.error);
            };
        });
    },

    /**
     * Fetch and cache an image from a URL
     * @param {string} url - Image URL
     * @returns {Promise<string>} - Object URL for the blob
     */
    async getOrFetch(url) {
        if (!url) return '';
        if (url.startsWith('blob:')) return url;

        // Try to get from DB first
        try {
            const blob = await this.getImage(url);
            if (blob) {
                console.log('Loaded from cache:', url);
                return URL.createObjectURL(blob);
            }
        } catch (e) {
            console.warn('Cache lookup failed:', e);
        }

        // Fetch from network
        if (url.startsWith('local-')) {
            // If it's a local- key, we've already tried getImage(url) above.
            // If we're here, it means getImage(url) returned null or failed.
            return null;
        }

        try {
            console.log('Fetching from network:', url);
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const blob = await response.blob();

            // Save to DB in background
            this.saveImage(url, blob).catch(e => console.warn('Cache save failed:', e));

            return URL.createObjectURL(blob);
        } catch (e) {
            console.error('Fetch failed:', e);
            return url; // Fallback to original URL
        }
    },

    /**
     * Fetch and save URL in background (fire and forget)
     * @param {string} url
     */
    async saveFromUrl(url) {
        if (!url) return;
        try {
            // Check if exists first to avoid redundant downloads
            const exists = await this.getImage(url);
            if (exists) return;

            console.log('Caching in background:', url);
            const response = await fetch(url);
            const blob = await response.blob();
            await this.saveImage(url, blob);
        } catch (e) {
            console.warn('Background cache failed:', e);
        }
    },

    /**
     * 迁移：缓存所有现有快捷方式的图标
     * 只在联网时运行一次
     */
    async migrateExistingIcons() {
        const MIGRATION_KEY = 'iconMigrationDone_v1';

        // 检查是否已经迁移过
        const migrationStatus = await chrome.storage.local.get(MIGRATION_KEY);
        if (migrationStatus[MIGRATION_KEY]) {
            console.log('[ImageDB] Migration already done, skipping...');
            return;
        }

        // 检查是否联网
        if (!navigator.onLine) {
            console.log('[ImageDB] Offline, skipping migration...');
            return;
        }

        console.log('[ImageDB] Starting icon migration...');

        try {
            const data = await chrome.storage.local.get('shortcuts');
            const shortcuts = data.shortcuts || [];
            let successCount = 0;
            let failCount = 0;

            for (const s of shortcuts) {
                let iconUrl = s.icon;

                // 处理 auto 类型
                if (iconUrl === 'auto' || !iconUrl) {
                    try {
                        let urlStr = s.url;
                        if (!urlStr.startsWith('http')) urlStr = 'https://' + urlStr;
                        const u = new URL(urlStr);
                        iconUrl = `https://www.google.com/s2/favicons?domain=${u.hostname}&sz=128`;
                    } catch (e) {
                        continue;
                    }
                }

                // 跳过非 http 图标 (emoji, local- 等)
                if (!iconUrl.startsWith('http')) {
                    continue;
                }

                // 检查是否已缓存
                const existing = await this.getImage(iconUrl);
                if (existing) {
                    console.log(`[ImageDB] Already cached: ${s.name}`);
                    successCount++;
                    continue;
                }

                // 从网络获取并缓存
                try {
                    console.log(`[ImageDB] Caching icon for ${s.name}: ${iconUrl}`);
                    const response = await fetch(iconUrl);
                    if (response.ok) {
                        const blob = await response.blob();
                        await this.saveImage(iconUrl, blob);
                        console.log(`[ImageDB] Cached: ${s.name}`);
                        successCount++;
                    } else {
                        console.warn(`[ImageDB] Failed to fetch ${s.name}: ${response.status}`);
                        failCount++;
                    }
                } catch (e) {
                    console.warn(`[ImageDB] Error caching ${s.name}:`, e.message);
                    failCount++;
                }
            }

            console.log(`[ImageDB] Migration complete! Success: ${successCount}, Failed: ${failCount}`);

            // 标记迁移完成
            await chrome.storage.local.set({ [MIGRATION_KEY]: true });
        } catch (e) {
            console.error('[ImageDB] Migration failed:', e);
        }
    }
};

// 挂载到 window 以便其他脚本访问
window.ImageDB = ImageDB;
