## 工作流程

使用 TypeScript + SolidJS 开发一个 chrome 扩展，实现如下功能：

- 点击扩展图标后，打开 options 页面
- 在 options 页面判断是否存在 token / url / cookie
- 没有则打开 https://abc.com/i/bookmarks 页面
- 背景脚本调用 chrome.webRequest.onSendHeaders.addListener 监听请求头，并记录请求头中的 token / url / cookie
- 当以上三个数据全部拿到以后，将其存储到本地数据库，并通知 options 页面
- options 页面通过 toke / url / cookie 调用接口获取书签数据
