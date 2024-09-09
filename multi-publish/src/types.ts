export interface PublishTask {
  platform: string
  title: string
  content: string
  tags?: string[]
}

export enum Platform {
  Medium = 'medium',
  DevTo = 'devto',
  Hashnode = 'hashnode',
}
