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
    return items.map((item: any) => ({
      id: item._id,
      sys: item._sys,
      title: item.title,
      slug: item.slug,
      body: item.body,
      bodyMd: item.bodyMd || '',
      meta: item.meta,
      tags: item.tags,
    }))
  }
);

const getArticleBySlug = cache(async (slug: string) => {
  const article = await client.getFirstContent<any>({
    appUid: 'blog',
    modelUid: 'article',
    query: {
      slug,
      select: ['_id', '_sys', 'title', 'slug', 'body', 'tags', 'meta'],
    },
  })
  if (!article) return null
  return {
    id: article._id,
    sys: article._sys,
    title: article.title,
    slug: article.slug,
    body: article.body,
    bodyMd: article.bodyMd || '',
    tags: article.tags,
    meta: article.meta,
  }
})

const getTagBySlug = cache(async (slug: string) => {
  const tag = await client.getFirstContent<any>({
    appUid: 'blog',
    modelUid: 'tag',
    query: {
      slug,
      select: ['_id', '_sys', 'name', 'slug'],
    },
  })
  if (!tag) return null
  return {
    id: tag._id,
    sys: tag._sys,
    name: tag.name,
    slug: tag.slug,
  }
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
  return items.map((item: any) => ({
    id: item._id,
    sys: item._sys,
    title: item.title,
    slug: item.slug,
    body: item.body,
    bodyMd: item.bodyMd || '',
    tags: item.tags,
    meta: item.meta,
  }))
})

const getPast3Articles = cache(
  async (article: Article) => {
    const { items } = await client.getContents<Article>({
      appUid: 'blog',
      modelUid: 'article',
      query: {
        select: ['_id', '_sys', 'title', 'slug', 'body'],
        '_sys.createdAt': {
          lt: article.sys.createdAt,
        },
        order: ['-_sys.createdAt'],
      },
    })
    return items.map((item: any) => ({
      id: item._id,
      sys: item._sys,
      title: item.title,
      slug: item.slug,
      body: item.body,
      bodyMd: item.bodyMd || '',
      tags: item.tags,
      meta: item.meta,
    })).slice(0,3)
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
    return items.map((item: any) => ({
      id: item._id,
      sys: item._sys,
      name: item.name,
      slug: item.slug,
    }))
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
