/**
 * Popup Module - 扩展弹出窗口逻辑
 */

document.addEventListener('DOMContentLoaded', async () => {
    // 获取存储数据
    const data = await getStorageData();

    // 更新统计
    document.getElementById('shortcutCount').textContent = data.shortcuts?.length || 0;
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
            chrome.storage.local.get(['settings', 'categories', 'shortcuts'], resolve);
        } else {
            resolve({
                settings: JSON.parse(localStorage.getItem('mytab_settings')) || {},
                categories: JSON.parse(localStorage.getItem('mytab_categories')) || [],
                shortcuts: JSON.parse(localStorage.getItem('mytab_shortcuts')) || []
            });
        }
    });
}
