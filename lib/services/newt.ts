import 'server-only'
import { createClient } from 'newt-client-js'
import { cache } from 'react'
import type { Article } from '@/types/article'
import type { Tag } from '@/types/tag'

const client = createClient({
  spaceUid: process.env.NEWT_SPACE_UID + '',
  token: process.env.NEWT_CDN_API_TOKEN + '',
  apiType: 'cdn',
})

const getApp = cache(
  async () => {
    const app = await client.getApp({
      appUid: 'blog',
    })
    return app
  }
);

const getArticles = cache(
  async () => {
    const { items } = await client.getContents<Article>({
      appUid: 'blog',
      modelUid: 'article',
      query: {
        select: ['_id', '_sys', 'title', 'slug', 'body', 'meta'],
      },
    })
    return items
  }
);

const getArticleBySlug = cache(async (slug: string) => {
  const article = await client.getFirstContent<Article>({
    appUid: 'blog',
    modelUid: 'article',
    query: {
      slug,
      select: ['_id', '_sys', 'title', 'slug', 'body', 'tags', 'meta'],
    },
  })
  return article
})

const getTagBySlug = cache(async (slug: string) => {
  const tag = await client.getFirstContent<Tag>({
    appUid: 'blog',
    modelUid: 'tag',
    query: {
      slug,
      select: ['_id', '_sys', 'name', 'slug'],
    },
  })
  return tag 
})

const getArticlesByTagId = cache(async (tagId: string) => {
  const { items } = await client.getContents<Article>({
    appUid: 'blog',
    modelUid: 'article',
    query: {
      select: ['_id', '_sys', 'title', 'slug'],
      tags: {
        in: [tagId]
      },
      order: ['-_sys.createdAt'],
    },
  })
  return items
})

const getPast3Articles = cache(
  async (article: Article) => {
    const { items } = await client.getContents<Article>({
      appUid: 'blog',
      modelUid: 'article',
      query: {
        select: ['_id', '_sys', 'title', 'slug', 'body'],
        '_sys.createdAt': {
          lt: article._sys.createdAt,
        },
        order: ['-_sys.createdAt'],
      },
    })
    return items.slice(0,3)
  }
);

const getTags = cache(
  async () => {
    const { items } = await client.getContents<Tag>({
      appUid: 'blog',
      modelUid: 'tag',
      query: {
        select: ['_id', '_sys', 'name', 'slug'],
        order: ['-_sys.customOrder'],
      },
    })
    return items
  }
);

export default {
  getApp,
  getArticles,
  getArticleBySlug,
  getTagBySlug,
  getArticlesByTagId,
  getPast3Articles,
  getTags,
}
