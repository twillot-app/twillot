import { type Workflow, type Template } from './types'

export const defaultWorkflows: Workflow[] = [
  {
    id: '0',
    name: 'Auto unroll threads when a bookmark is created',
    editable: false,
    when: 'CreateBookmark',
    thenList: [{ name: 'UnrollThread' }],
  },
  {
    id: '1',
    name: 'Delete from local when a bookmark is deleted',
    editable: false,
    when: 'DeleteBookmark',
    thenList: [{ name: 'DeleteBookmark' }],
  },
]

export const defaultTemplates: Template[] = [
  {
    id: new Date().getTime().toString(16),
    name: 'Default Comment',
    content:
      '🚀 Crafted by Twillot 🚀\n⚡️ Boost your productivity: Organize your bookmarks and streamline your X/Twitter workflow: https://twillot.com ⏱️✨',
    createdAt: Math.floor(Date.now() / 1000),
  },
]

export const defaultTail = '\n🚀 Crafted by Twillot 🚀 https://twillot.com'

export const defaultSignatureTemplates: Template[] = [
  {
    id: new Date().getTime().toString(16),
    name: 'Default Signature',
    content: defaultTail,
    createdAt: Math.floor(Date.now() / 1000),
  },
]

export const defaultReply =
  '🙌 This content is amazing!\n🎉 Big thanks to @SiZapPaaiGwat for the awesome Chrome extension that makes downloading Twitter videos a breeze! \n🚀 Crafted by Twillot 🚀 https://twillot.com'
