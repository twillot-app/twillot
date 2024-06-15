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
    name: 'Default - A twillot welcome post',
    content: 'Proudly posted by Twillot, check out https://twillot.com.',
    createdAt: Math.floor(Date.now() / 1000),
  },
]

export const defaultTail =
  '\n\n----\nStreamlined by Twillot https://twillot.com'

export const defaultSignatureTemplates: Template[] = [
  {
    id: new Date().getTime().toString(16),
    name: 'Default Signature',
    content: defaultTail,
    createdAt: Math.floor(Date.now() / 1000),
  },
]
