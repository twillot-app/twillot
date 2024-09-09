export interface PublishTask {
  url: string
  platform: string
  title: string
  content: string
  tags?: string[]
  // Operations are allowed after this element is found
  initSelector?: string
  titleSelector: string
  bodySelector: string
  // medium
  previewButtonSelector?: string
  publishButtonSelector: string
  /**
   * Some platforms have a success message that is displayed after the post is published and some don't, they just redirect to the post page and make us hard to detect if the post is published, in this case we can add a errorSelector to detect if the post is errored
   */
  // medium
  successSelector?: string
  // devto
  errorSelector?: string
}

export enum Platform {
  Medium = 'medium',
  DevTo = 'devto',
  Hashnode = 'hashnode',
}
