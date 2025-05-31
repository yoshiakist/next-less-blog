import { cache } from 'react'

const API_KEY = process.env.MICROCMS_API_KEY + ''
const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN + ''

const NUMBER_OF_ARTICLE_LIST = 100

const fetcher = async (endpoint: string) => {
  const res = await fetch(`https://${SERVICE_DOMAIN}.microcms.io/api/v1/${endpoint}`, {
    headers: {
      'X-API-KEY': API_KEY,
    },
    next: { revalidate: 60 }, // ISR対応
  })
  if (!res.ok) throw new Error('microCMS fetch error')
  return res.json()
}

const getApp = cache(async () => {
  return {
    uid: 'microcms-app',
    name: `${SERVICE_DOMAIN}`,
    description: `${SERVICE_DOMAIN}のブログ`,
  }
})

const getArticles = cache(async () => {
  const data = await fetcher(`articles?limit=${NUMBER_OF_ARTICLE_LIST}&orders=-publishedAt`)
  return data.contents.map((item: any) => ({
    id: item.id,
    sys: {
      createdAt: item.publishedAt,
      updatedAt: item.updatedAt,
      publishedAt: item.publishedAt,
      revisedAt: item.revisedAt,
    },
    title: item.title,
    slug: item.slug,
    body: item.content,
    bodyMd: item.contentMd || '',
    meta: {
      description: item.description,
      tags: item.tags,
      author: item.author,
    },
  }))
})

const getTags = cache(async () => {
  const data = await fetcher(`tags?limit=${NUMBER_OF_ARTICLE_LIST}`)
  return data.contents.map((item: any) => ({
    id: item.id,
    sys: {
      createdAt: item.publishedAt,
      updatedAt: item.updatedAt,
      publishedAt: item.publishedAt,
      revisedAt: item.revisedAt,
    },
    name: item.name,
    slug: item.slug,
  }))
})

const getArticleBySlug = cache(async (slug: string) => {
  const data = await fetcher(`articles?filters=slug[equals]${slug}&limit=1`)
  const item = data.contents[0]
  if (!item) return null
  return {
    id: item.id,
    sys: {
      createdAt: item.publishedAt,
      updatedAt: item.updatedAt,
      publishedAt: item.publishedAt,
      revisedAt: item.revisedAt,
    },
    title: item.title,
    slug: item.slug,
    body: item.content,
    bodyMd: item.contentMd || '',
    tags: item.tags,
    meta: {
      description: item.description,
      tags: item.tags,
      author: item.author,
    },
  }
})

const getTagBySlug = cache(async (slug: string) => {
  const data = await fetcher(`tags?filters=slug[equals]${slug}&limit=1`)
  const item = data.contents[0]
  if (!item) return null
  return {
    id: item.id,
    sys: {
      createdAt: item.publishedAt,
      updatedAt: item.updatedAt,
      publishedAt: item.publishedAt,
      revisedAt: item.revisedAt,
    },
    name: item.name,
    slug: item.slug,
  }
})

const getArticlesByTagId = cache(async (tagId: string) => {
  const data = await fetcher(`articles?filters=tags[contains]${tagId}&limit=${NUMBER_OF_ARTICLE_LIST}&orders=-publishedAt`)
  return data.contents.map((item: any) => ({
    id: item.id,
    sys: {
      createdAt: item.publishedAt,
      updatedAt: item.updatedAt,
      publishedAt: item.publishedAt,
      revisedAt: item.revisedAt,
    },
    title: item.title,
    slug: item.slug,
    body: item.content,
    bodyMd: item.contentMd || '',
  }))
})

const getPast3Articles = cache(async (article: any) => {
  const data = await fetcher(`articles?filters=publishedAt[less_than]${article.sys.createdAt}&limit=3&orders=-publishedAt`)
  return data.contents.map((item: any) => ({
    id: item.id,
    sys: {
      createdAt: item.publishedAt,
      updatedAt: item.updatedAt,
      publishedAt: item.publishedAt,
      revisedAt: item.revisedAt,
    },
    title: item.title,
    slug: item.slug,
    body: item.content,
    bodyMd: item.contentMd || '',
  }))
})

export default {
  getApp,
  getArticles,
  getArticleBySlug,
  getTagBySlug,
  getArticlesByTagId,
  getPast3Articles,
  getTags,
}
