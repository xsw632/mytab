/**
 * Storage Module - 数据存储管理
 * 使用 Chrome Storage API 进行数据持久化
 */

const Storage = {
  // 默认数据
  defaults: {
    settings: {
      searchEngine: 'google',
      clockFormat: '24',
      showSeconds: false,
      showSidebar: true,
      showClock: true,
      showSearch: true,
      wallpaper: 'none',
      customWallpaper: ''
    },
    categories: [
      { id: 'home', name: '首页', icon: '🏠', isDefault: true }
    ],
    shortcuts: [
      { id: '1', name: 'Google', url: 'https://www.google.com', icon: 'auto', categoryId: 'home' },
      { id: '2', name: 'GitHub', url: 'https://github.com', icon: 'auto', categoryId: 'home' },
      { id: '3', name: 'YouTube', url: 'https://www.youtube.com', icon: 'auto', categoryId: 'home' },
      { id: '4', name: 'Twitter', url: 'https://twitter.com', icon: 'auto', categoryId: 'home' },
      { id: '5', name: '知乎', url: 'https://www.zhihu.com', icon: 'auto', categoryId: 'home' },
      { id: '6', name: '哔哩哔哩', url: 'https://www.bilibili.com', icon: 'auto', categoryId: 'home' }
    ],
    currentCategory: 'home'
  },

  /**
   * 获取所有数据
   */
  async getAll() {
    return new Promise((resolve) => {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.get(['settings', 'categories', 'shortcuts', 'currentCategory'], (result) => {
          resolve({
            settings: result.settings || this.defaults.settings,
            categories: result.categories || this.defaults.categories,
            shortcuts: result.shortcuts || this.defaults.shortcuts,
            currentCategory: result.currentCategory || this.defaults.currentCategory
          });
        });
      } else {
        // 本地开发模式，使用 localStorage
        const settings = JSON.parse(localStorage.getItem('mytab_settings')) || this.defaults.settings;
        const categories = JSON.parse(localStorage.getItem('mytab_categories')) || this.defaults.categories;
        const shortcuts = JSON.parse(localStorage.getItem('mytab_shortcuts')) || this.defaults.shortcuts;
        const currentCategory = localStorage.getItem('mytab_currentCategory') || this.defaults.currentCategory;
        resolve({ settings, categories, shortcuts, currentCategory });
      }
    });
  },

  /**
   * 保存设置
   */
  async saveSettings(settings) {
    return new Promise((resolve) => {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.set({ settings }, resolve);
      } else {
        localStorage.setItem('mytab_settings', JSON.stringify(settings));
        resolve();
      }
    });
  },

  /**
   * 保存分类
   */
  async saveCategories(categories) {
    return new Promise((resolve) => {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.set({ categories }, resolve);
      } else {
        localStorage.setItem('mytab_categories', JSON.stringify(categories));
        resolve();
      }
    });
  },

  /**
   * 保存快捷方式
   */
  async saveShortcuts(shortcuts) {
    return new Promise((resolve) => {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.set({ shortcuts }, resolve);
      } else {
        localStorage.setItem('mytab_shortcuts', JSON.stringify(shortcuts));
        resolve();
      }
    });
  },

  /**
   * 保存当前分类
   */
  async saveCurrentCategory(categoryId) {
    return new Promise((resolve) => {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.set({ currentCategory: categoryId }, resolve);
      } else {
        localStorage.setItem('mytab_currentCategory', categoryId);
        resolve();
      }
    });
  },

  /**
   * 生成唯一 ID
   */
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
};
