/**
 * Popup Module - 扩展弹出窗口逻辑
 */

const POPUP_STORAGE_KEYS = ['settings', 'categories', 'shortcuts', 'widgets'];
const POPUP_LOCAL_KEYS = {
    settings: 'mytab_settings',
    categories: 'mytab_categories',
    shortcuts: 'mytab_shortcuts',
    widgets: 'mytab_widgets'
};

const popupHasChromeStorage = () => typeof chrome !== 'undefined' && !!chrome?.storage?.local;
const popupReadLocalJson = (key, fallbackValue) => JSON.parse(localStorage.getItem(key)) || fallbackValue;

document.addEventListener('DOMContentLoaded', async () => {
    const getEl = (id) => document.getElementById(id);
    // 获取存储数据
    const data = await getStorageData();

    // 更新统计
    const shortcutCount = (data.shortcuts?.length || 0) + (data.widgets?.length || 0);
    getEl('shortcutCount').textContent = shortcutCount;
    getEl('categoryCount').textContent = data.categories?.length || 0;

    // 壁纸名称
    const wp = data.settings?.customWallpaper || data.settings?.wallpaper || 'none';
    let wpName = '默认';
    if (wp === 'none') {
        wpName = '无背景';
    } else if (wp.startsWith('linear-gradient')) {
        wpName = '渐变背景';
    } else if (wp.startsWith('http')) {
        wpName = '自定义';
    }
    getEl('currentWallpaper').textContent = wpName;

    // 填充分类选择器
    const categorySelector = getEl('categorySelector');
    const categories = data.categories || [];
    categorySelector.innerHTML = '<option value="">选择分类...</option>';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = cat.name;
        categorySelector.appendChild(option);
    });

    // 设置默认选中当前分类
    const currentCategory = data.currentCategory || (categories[0]?.id);
    if (currentCategory) {
        categorySelector.value = currentCategory;
    }

    // 添加当前网站按钮
    getEl('addWebsiteBtn').addEventListener('click', async () => {
        await addCurrentWebsite(categorySelector.value);
    });

    // 打开新标签页
    getEl('openNewTab').addEventListener('click', () => {
        chrome.tabs.create({});
        window.close();
    });
});

/**
 * 获取存储数据
 */
function getStorageData() {
    return new Promise((resolve) => {
        if (popupHasChromeStorage()) {
            chrome.storage.local.get(POPUP_STORAGE_KEYS, resolve);
        } else {
            resolve({
                settings: popupReadLocalJson(POPUP_LOCAL_KEYS.settings, {}),
                categories: popupReadLocalJson(POPUP_LOCAL_KEYS.categories, []),
                shortcuts: popupReadLocalJson(POPUP_LOCAL_KEYS.shortcuts, []),
                widgets: popupReadLocalJson(POPUP_LOCAL_KEYS.widgets, [])
            });
        }
    });
}

/**
 * 获取当前活动标签页
 */
function getCurrentTab() {
    return new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            resolve(tabs[0]);
        });
    });
}

/**
 * 显示成功消息
 */
function showSuccessMessage() {
    const message = document.getElementById('successMessage');
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = 'none';
        window.close();
    }, 1000);
}

/**
 * 生成唯一ID
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * 添加当前网站到选中的分类
 */
async function addCurrentWebsite(categoryId) {
    // 验证分类ID
    if (!categoryId) {
        alert('请先选择一个分类');
        return;
    }

    // 获取当前标签页
    const tab = await getCurrentTab();
    if (!tab) {
        alert('无法获取当前标签页信息');
        return;
    }

    // 验证URL（跳过chrome://、edge://等内部页面）
    const url = tab.url;
    if (!url || url.startsWith('chrome://') || url.startsWith('edge://') || url.startsWith('about:')) {
        alert('无法添加浏览器内部页面');
        return;
    }

    // 获取存储数据
    const data = await getStorageData();
    const shortcuts = data.shortcuts || [];

    // 检查是否已存在
    const existing = shortcuts.find(s => s.url === url);
    if (existing) {
        alert('该网站已存在于书签中');
        return;
    }

    // 创建新快捷方式
    const newShortcut = {
        id: generateId(),
        name: tab.title || 'Untitled',
        url: url,
        icon: 'auto',
        iconCached: false,
        order: shortcuts.filter(s => s.categoryId === categoryId).length,
        categoryId: categoryId
    };

    // 添加到数组
    shortcuts.push(newShortcut);

    // 保存到存储
    if (popupHasChromeStorage()) {
        await chrome.storage.local.set({ shortcuts });
    } else {
        localStorage.setItem(POPUP_LOCAL_KEYS.shortcuts, JSON.stringify(shortcuts));
    }

    // 显示成功消息
    showSuccessMessage();
}
