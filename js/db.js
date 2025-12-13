/**
 * ImageDB - IndexedDB wrapper for caching images
 */
const ImageDB = {
    dbName: 'MyTabAssets',
    storeName: 'images',
    db: null,

    /**
     * Initialize the database
     */
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);

            request.onerror = (event) => {
                console.error('IndexedDB error:', event.target.error);
                reject(event.target.error);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName);
                }
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                console.log('ImageDB initialized');
                resolve();
            };
        });
    },

    /**
     * Save an image blob to the database
     * @param {string} key - Unique key (URL or ID)
     * @param {Blob} blob - Image blob
     */
    async saveImage(key, blob) {
        if (!this.db) await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.put(blob, key);

            request.onsuccess = () => resolve();
            request.onerror = (e) => reject(e.target.error);
        });
    },

    /**
     * Get an image blob from the database
     * @param {string} key - Unique key (URL or ID)
     * @returns {Promise<Blob|null>}
     */
    async getImage(key) {
        if (!this.db) await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get(key);

            request.onsuccess = (event) => {
                resolve(event.target.result || null);
            };
            request.onerror = (e) => reject(e.target.error);
        });
    },

    /**
     * Fetch and cache an image from a URL
     * @param {string} url - Image URL
     * @returns {Promise<string>} - Object URL for the blob
     */
    async getOrFetch(url) {
        if (!url) return '';

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
        try {
            console.log('Fetching from network:', url);
            const response = await fetch(url);
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
    }
};
