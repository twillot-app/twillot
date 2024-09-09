export interface PublishTask {
  url: string
  platform: string
  title: string
  content: string
  tags?: string[]
}

export interface MediumPublishTask extends PublishTask {
  platform: 'medium'
  url: 'https://medium.com/new-story'
  titleSelector: string
  bodySelector: string
  previewButtonSelector: string
  publishButtonSelector: string
  successSelector: string
}

export enum Platform {
  Medium = 'medium',
  DevTo = 'devto',
  Hashnode = 'hashnode',
}
