import { Host } from '../types'

export enum EndpointQuery {
  LIST_BOOKMARKS = 'UyNF_BgJ5d5MbtuVukyl7A',
  CREATE_TWEET = 'BTWYQFqX-WbKZOhykzDpRg',
}

export enum Endpoint {
  LIST_BOOKMARKS = `${Host}/i/api/graphql/${EndpointQuery.LIST_BOOKMARKS}/Bookmarks`,
  CREATE_TWEET = `${Host}/i/api/graphql/${EndpointQuery.CREATE_TWEET}/CreateTweet`,
}
