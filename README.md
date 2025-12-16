# MyTab - Customizable New Tab Extension

MyTab 是一个功能丰富的 Chrome 浏览器扩展，它将您的默认新标签页替换为一个美观、可定制的主页，包含壁纸、分类快捷方式和时钟显示等功能。

## ✨ 功能特性

- 🎨 **自定义新标签页** - 替换浏览器默认的新标签页
- 🖼️ **壁纸支持** - 自定义背景图片
- 🔗 **分类快捷方式** - 将书签按类别组织管理
- 🕐 **时钟显示** - 支持12/24小时格式的时间显示
- 🔍 **搜索功能** - 集成搜索栏
- ⚙️ **设置管理** - 可自定义的个人偏好设置
- 📱 **侧边栏导航** - 可折叠的类别侧边栏
- 📐 **响应式设计** - 现代化的UI设计，使用Inter字体系列

## 🚀 安装方法

### 从Chrome网上应用店安装
（待发布）

### 开发者模式安装
1. 下载或克隆本项目到本地
2. 打开Chrome浏览器，输入 `chrome://extensions/`
3. 开启右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择项目文件夹
6. 扩展程序安装完成！

## 📁 项目结构

```
mytab/
├── manifest.json          # Chrome扩展清单文件（V3）
├── newtab.html           # 新标签页主界面
├── popup.html            # 扩展弹出窗口
├── css/
│   └── styles.css        # 主样式文件
├── js/
│   ├── app.js            # 主应用程序逻辑
│   ├── categories.js     # 类别管理
│   ├── shortcuts.js      # 快捷方式管理
│   ├── settings.js       # 设置配置
│   ├── storage.js        # Chrome存储API封装
│   └── popup.js          # 弹出窗口逻辑
└── images/
    ├── icon16.png        # 16x16像素图标
    ├── icon48.png        # 48x48像素图标
    └── icon128.png       # 128x128像素图标
```

## 🛠️ 技术栈

- **Chrome Extension Manifest V3** - 最新的Chrome扩展标准
- **原生JavaScript** - 无需额外框架，轻量高效
- **Chrome Storage API** - 数据持久化存储
- **Inter字体** - 现代化的字体设计
- **CSS3** - 现代化的样式设计

## 🔧 开发指南

### 本地开发
1. 克隆项目到本地
2. 在Chrome扩展程序页面加载已解压的扩展程序
3. 修改代码后，点击扩展程序页面的"刷新"按钮即可看到更改

### 文件说明

#### `manifest.json`
扩展程序的配置文件，定义了：
- 扩展的基本信息（名称、版本、描述）
- 所需的权限（storage）
- 新标签页重定向设置
- 图标配置

#### `newtab.html`
新标签页的主界面，包含：
- 时钟显示区域
- 搜索栏
- 快捷方式网格
- 侧边栏类别导航

#### 核心JavaScript模块
- **app.js** - 应用程序初始化和主逻辑
- **categories.js** - 管理快捷方式类别
- **shortcuts.js** - 管理具体的快捷方式
- **settings.js** - 处理用户设置
- **storage.js** - 封装Chrome存储API调用

## 📋 权限说明

本扩展程序只需要以下权限：
- **storage** - 用于保存用户设置和快捷方式数据

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进这个项目！

### 提交Issue
- 描述清楚遇到的问题或功能建议
- 提供复现步骤（如果是bug）
- 注明浏览器版本和操作系统

### 提交Pull Request
1. Fork本项目
2. 创建您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个Pull Request

## 📝 更新日志

### v1.0.0
- ✨ 初始版本发布
- 🎨 自定义新标签页界面
- 🔗 快捷方式管理功能
- 🖼️ 壁纸设置功能
- ⚙️ 基础设置选项

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- 感谢 [Inter字体](https://rsms.me/inter/) 提供优美的字体
- 感谢所有贡献者和支持者

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 提交 [GitHub Issue](https://github.com/your-username/mytab/issues)
- 发送邮件至：your-email@example.com

---

**⭐ 如果这个项目对您有帮助，请给它一个星标！**