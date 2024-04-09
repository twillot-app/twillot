## slogan 提示词

我开发了一个chrome 扩展，它的主要功能如下：

- 同步 Twitter 书签到本地
- 支持搜索 Twitter 书签
- 支持对收藏的推文使用 AI 自动打标签
- 支持导出到Excel以及第三方笔记平台比如 Notion, Roam Research, Evernote等

现在我给这个扩展命名 Twillot，slogan 是：your smart social medial copilot.围绕这个名字和 slogan 生成简短的简介。

---

Sync, search, tag, and export your Twitter bookmarks with AI and ease.

Your AI-fueled sidekick for Twitter bookmarks, bridging the gap between social media and personal organization.

Streamline your Twitter experience with smart syncing, searching, and tagging, and let your social media soar with the power of your smart social media copilot.

## 使用说明提示词

我开发了一个chrome 扩展，它的主要功能如下：

- 同步 Twitter 书签到本地
- 支持搜索 Twitter 书签
- 支持对收藏的推文使用 AI 自动打标签
- 支持导出到Excel以及第三方笔记平台比如 Notion, Roam Research, Evernote等

现在我确定扩展软件的标题为 Twillot，摘要为 Streamline your Twitter experience with smart syncing, searching, and tagging, and let your social media soar with the power of your smart social media copilot。

请使用英文生成一段文本，描述该扩展的用途以及用户为何应该安装它，围绕以下几点介绍：

- 推特书签的上限是 1000 条
- 推特书签不支持按关键字查询
- 推特书签中的推文可能被随时被删除，收藏的内容也会消失
- 推特书签没有收藏时间线
- 推特书签没有收藏推文的相关数据分析

---

Twillot is a Chrome extension that transforms how you manage your Twitter bookmarks. Twitter only allows up to 1000 bookmarks, and finding specific tweets can be a hassle since you can't search them by keywords. Plus, there's always a risk of losing a bookmark if the original tweet gets deleted.

Twillot solves these issues by letting you sync your Twitter bookmarks to your computer. This means your bookmarks are safe, searchable, and always accessible, even if they're removed from Twitter. With Twillot, you can quickly find any saved tweet with a simple keyword search, making your social media experience smoother and more efficient.

The extension also uses AI to automatically tag your bookmarks, organizing them for easy access. And if you use note-taking apps like Notion, Roam Research, or Evernote, Twillot lets you export your bookmarks directly to these platforms, enhancing your productivity.

By installing Twillot, you make sure your favorite tweets are always just a click away, organized, and never lost. It's the perfect tool for anyone looking to save time and keep their digital life organized.

## Permission justification Prompt

使用英文帮我完成 Chrome extension 上架审核需要的一些说明文案，包含以下几点：

- storage permission justification
- webRequest permission justification
- cookies permission justification
- tabs permission justification
- host permission justification

围绕下面几点说明：
我的扩展需要监听 Twitter 的 Bookmark 请求相关的数据，然后会使用 Twitter 的登录态以及本地存储。

---

Here's a draft for the permission justifications for your Chrome extension, tailored to the functionalities you've described:

Permission Justifications for Our Chrome Extension

Our Chrome extension is designed to enhance the user experience on Twitter, particularly focusing on managing and interacting with Bookmarks more effectively. To achieve this, we require certain permissions to ensure the extension operates seamlessly and securely. Below is a detailed explanation of why these permissions are essential for our extension's functionality:

1. Storage Permission Justification:
   The storage permission is necessary for our extension to save user preferences and data related to Twitter Bookmarks locally. This allows for a personalized experience, as users can customize settings according to their needs. The local storage of these settings ensures that users do not need to reconfigure their preferences every time the extension is accessed, providing a seamless and efficient user experience.

2. WebRequest Permission Justification:
   Our extension needs the webRequest permission to listen for and handle requests related to Twitter Bookmarks. This capability is crucial for the extension to intercept, examine, and modify the requests and responses for Bookmark actions, ensuring that the extension can provide additional functionalities such as enhanced management and organization of Twitter Bookmarks. This permission is vital for the core operation of our extension as it directly interacts with Twitter's web requests.

3. Cookies Permission Justification:
   The cookies permission is required for our extension to access Twitter's cookies. Since our extension interacts with Twitter, especially focusing on Bookmarks, accessing cookies allows us to ensure that the user is logged in and maintain their session. This is crucial for a smooth user experience, as it enables the extension to perform actions on behalf of the user, such as saving or organizing Bookmarks, without needing to request login credentials repeatedly.

4. Tabs Permission Justification:
   We request tabs permission to open new tabs for authentication purposes and to direct users to specific pages when necessary, such as help pages or new Bookmark features introduced by our extension. This permission is essential for enhancing user interaction and ensuring users can effortlessly navigate through the additional functionalities our extension offers.

5. Host Permission Justification:
   The host permission for https://twitter.com/* is critical for our extension to function correctly. This permission allows our extension to access Twitter pages, enabling it to listen for and manage Bookmark-related data and interactions. Without this permission, our extension would be unable to interact with Twitter's content, severely limiting its functionality and the features it can offer to users.

In summary, each requested permission plays a vital role in enabling our Chrome extension to enhance the Twitter experience, particularly in managing Bookmarks. We are committed to ensuring the privacy and security of our users' data, and these permissions are requested strictly for the functionality described. Thank you for considering our extension for approval.

This draft aims to clearly justify the necessity of each permission in relation to the core functionalities of your extension, adhering to privacy and security best practices.

## Support us Prompt

我开发的 chrome 扩展，核心功能是同步推特的书签里面收藏的推文到本地。
解决的痛点：推特收藏的1000条上限；按关键字搜索推文；备份推文。
现在你是一个运营专家，设计以下文案引导用户积极参与如下2个运营活动：
1）Social Media Support - 引导用户分享扩展的功能。
2）Financial Support - 引导用户去捐赠开发者。

请使用英文分别为这2个活动生成两句话长度的描述性文案以及一些 bullet points 说明。
文案重点关注用户的参与能够创造很大的价值，也能够为自己创造价值。
文案的语气需要非常诚恳并具有一定的煽动性，尽量口语化且简单。

---

Social Media Support
Short Description:
Spread the word and extend the life of your favorite tweets beyond Twitter's limits. Share the magic, share the memories!

Bullet List:

Empower & Inspire: Let friends discover the joy of unlimited bookmarks.
Build Community: Join a circle that cherishes every tweet.
Share Your Story: Tell how our tool enhanced your Twitter journey.

Financial Support
Short Description:
A small donation makes a big difference. Help us keep your tweets safe, searchable, and always accessible.

Bullet List:

Direct Impact: Your gift directly fuels improvements.
Stay Independent: Support us in offering a user-focused, ad-free experience.
Unlock Features: Early access to new tools and updates for supporters.
