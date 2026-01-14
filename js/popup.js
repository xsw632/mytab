/**
 * Popup Module - 扩展弹出窗口逻辑
 */

document.addEventListener('DOMContentLoaded', async () => {
    // 获取存储数据
    const data = await getStorageData();

    // 更新统计
    const shortcutCount = (data.shortcuts?.length || 0) + (data.widgets?.length || 0);
    document.getElementById('shortcutCount').textContent = shortcutCount;
    document.getElementById('categoryCount').textContent = data.categories?.length || 0;

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
    document.getElementById('currentWallpaper').textContent = wpName;

    // 填充分类选择器
    const categorySelector = document.getElementById('categorySelector');
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
    document.getElementById('addWebsiteBtn').addEventListener('click', async () => {
        await addCurrentWebsite(categorySelector.value);
    });

    // 打开新标签页
    document.getElementById('openNewTab').addEventListener('click', () => {
        chrome.tabs.create({});
        window.close();
    });
});

/**
 * 获取存储数据
 */
function getStorageData() {
    return new Promise((resolve) => {
        if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.local.get(['settings', 'categories', 'shortcuts', 'widgets'], resolve);
        } else {
            resolve({
                settings: JSON.parse(localStorage.getItem('mytab_settings')) || {},
                categories: JSON.parse(localStorage.getItem('mytab_categories')) || [],
                shortcuts: JSON.parse(localStorage.getItem('mytab_shortcuts')) || [],
                widgets: JSON.parse(localStorage.getItem('mytab_widgets')) || []
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
    if (typeof chrome !== 'undefined' && chrome.storage) {
        await chrome.storage.local.set({ shortcuts });
    } else {
        localStorage.setItem('mytab_shortcuts', JSON.stringify(shortcuts));
    }

    // 显示成功消息
    showSuccessMessage();
}
