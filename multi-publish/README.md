# Twillot Multi Publish

## Flow

1. User -> Web Page: Submit articles
2. Web Page -> Extension Content Script: Notify content
3. Extension Content Script -> Extension Worker: Send message
4. Extension Worker <-> Chrome API: Get cookies and tokens
5. Extension Worker -> Website A, Website B, Websites...: Post articles one by one
6. Website A, Website B, Websites... -> Realtime Database: Post states
7. Web Page -> Realtime Database: Push states

Additional components:

- Chrome API
- Realtime Database

Notes:

- There are two yellow sticky notes in the image with Chinese text:
  1. "网页职责" (Web Page Responsibilities):
     - 保存文章 (Save articles)
     - 粘贴任务 (Paste tasks)
     - 传递任务 (Transfer tasks)
  2. "扩展职责" (Extension Responsibilities):
     - 获取认证 (Obtain authentication)
     - 提交任务 (Submit tasks)
     - 发布任务 (Publish tasks)
