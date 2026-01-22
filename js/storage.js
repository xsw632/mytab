/**
 * Storage Module - 数据存储管理
 * 使用 Chrome Storage API 进行数据持久化
 */

const STORAGE_KEYS = ['settings', 'categories', 'shortcuts', 'widgets', 'currentCategory'];
const LOCAL_FALLBACK_KEYS = {
  settings: 'mytab_settings',
  categories: 'mytab_categories',
  shortcuts: 'mytab_shortcuts',
  widgets: 'mytab_widgets',
  currentCategory: 'mytab_currentCategory'
};

const hasChromeStorage = () => typeof chrome !== 'undefined' && !!chrome?.storage?.local;
const readLocalJson = (key, fallbackValue) => JSON.parse(localStorage.getItem(key)) || fallbackValue;

const saveValue = (key, value) => new Promise((resolve) => {
  if (hasChromeStorage()) {
    chrome.storage.local.set({ [key]: value }, resolve);
    return;
  }

  const localKey = LOCAL_FALLBACK_KEYS[key];
  if (key === 'currentCategory') {
    localStorage.setItem(localKey, value);
  } else {
    localStorage.setItem(localKey, JSON.stringify(value));
  }
  resolve();
});

const Storage = {
  // 默认数据
  defaults: {
    settings: {
      searchEngine: 'google',
      clockFormat: '24',
      showSeconds: false,
      language: 'zh_CN',
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
      { id: '1', name: 'Google', url: 'https://www.google.com', icon: 'builtin:google', categoryId: 'home' },
      { id: '2', name: 'GitHub', url: 'https://github.com', icon: 'builtin:github', categoryId: 'home' },
      { id: '3', name: 'YouTube', url: 'https://www.youtube.com', icon: 'builtin:youtube', categoryId: 'home' },
      { id: '4', name: 'Twitter', url: 'https://twitter.com', icon: 'builtin:x', categoryId: 'home' },
      { id: '5', name: '知乎', url: 'https://www.zhihu.com', icon: 'builtin:zhihu', categoryId: 'home' },
      { id: '6', name: '哔哩哔哩', url: 'https://www.bilibili.com', icon: 'builtin:bilibili', categoryId: 'home' }
    ],
    widgets: [],
    currentCategory: 'home'
  },

  /**
   * 获取所有数据
   */
  async getAll() {
    return new Promise((resolve) => {
      if (hasChromeStorage()) {
        chrome.storage.local.get(STORAGE_KEYS, (result) => {
          resolve({
            settings: result.settings || this.defaults.settings,
            categories: result.categories || this.defaults.categories,
            shortcuts: result.shortcuts || this.defaults.shortcuts,
            widgets: result.widgets || this.defaults.widgets,
            currentCategory: result.currentCategory || this.defaults.currentCategory
          });
        });
      } else {
        // 本地开发模式，使用 localStorage
        const settings = readLocalJson(LOCAL_FALLBACK_KEYS.settings, this.defaults.settings);
        const categories = readLocalJson(LOCAL_FALLBACK_KEYS.categories, this.defaults.categories);
        const shortcuts = readLocalJson(LOCAL_FALLBACK_KEYS.shortcuts, this.defaults.shortcuts);
        const widgets = readLocalJson(LOCAL_FALLBACK_KEYS.widgets, this.defaults.widgets);
        const currentCategory = localStorage.getItem(LOCAL_FALLBACK_KEYS.currentCategory) || this.defaults.currentCategory;
        resolve({ settings, categories, shortcuts, widgets, currentCategory });
      }
    });
  },

  /**
   * 保存设置
   */
  async saveSettings(settings) {
    return saveValue('settings', settings);
  },

  /**
   * 保存分类
   */
  async saveCategories(categories) {
    return saveValue('categories', categories);
  },

  /**
   * 保存快捷方式
   */
  async saveShortcuts(shortcuts) {
    return saveValue('shortcuts', shortcuts);
  },

  /**
   * 保存小组件
   */
  async saveWidgets(widgets) {
    return saveValue('widgets', widgets);
  },

  /**
   * 保存当前分类
   */
  async saveCurrentCategory(categoryId) {
    return saveValue('currentCategory', categoryId);
  },

  /**
   * 生成唯一 ID
   */
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
};
