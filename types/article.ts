import type { Sys } from '@/types/sys'
import type { Tag } from '@/types/tag'

export interface Article {
  _id: string
  _sys: Sys
  title: string
  slug: string
  body: string
  tags: Tag[]
  meta: {
    description: string
  }
}
